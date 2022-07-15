// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/utils/Strings.sol";

struct Property {
    string name;
    uint256 minimum;
    uint256 maximum;
}


struct Type {
    string typeName;
    uint256 allowedAssignorTypes;
    uint256 typeId;
    uint256 maxSupply;
    uint256 currentSupply;
}

struct AccessContract {
    address tenant;
    uint256 dueDate;
}

contract AttachableERC721 is ERC721, Ownable {
    using Strings for uint256;

    uint256 public latestTokenID = 1;
    Type[] public types;
    uint256[] public primeNumbers = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];
    mapping(uint256 =>  Property[]) public propertiesTypes;
    mapping(uint256 => uint256) public tokenTypeIndices;
    mapping(uint256 => uint256[]) tokenPropertiesValues;
    mapping(uint256 => uint256[]) cumulativeTokenProperties;

    mapping(uint256 => uint256) public assignedNFTs;
    mapping(uint256 => mapping(address => bool)) upgradeAccessor;

    address public ERA;
    uint256 public mintFee;

    event MintTypedNFT(address _to, uint256 indexed tokenId, uint256 typeIndex, uint256[] properties);
    event RemoveAssignor(address indexed owner, uint256 indexed assigneeTokenId, uint256 indexed assignorTokenId);
    event Equip(uint256 indexed assigneeTokenId, uint256 indexed assignorTokenId);

    constructor (string memory name_, string memory symbol_, address _ERA, uint256 _mintFee) ERC721(name_, symbol_) {
        ERA = _ERA;
        mintFee = _mintFee;
    }

    function setAssignor(uint256 assigneeTokenId, uint256 assignorTokenId) public assignAccess(assigneeTokenId) {
        require(types[tokenTypeIndices[assigneeTokenId]].allowedAssignorTypes % types[tokenTypeIndices[assignorTokenId]].typeId == 0, "AssignableERC721: this assignor type is not allowed for this assignee type");
        _transfer(msg.sender, address(this), assigneeTokenId);
        if (assignedNFTs[assigneeTokenId] > 0) {
            _removeAssignor(assigneeTokenId, assignedNFTs[assigneeTokenId]);
        }
        assignedNFTs[assigneeTokenId] = assignorTokenId;

        uint256[] memory assigneeProperties = cumulativeTokenProperties[assigneeTokenId];
        _updateRoot(assignorTokenId, assigneeProperties);


        emit Equip(assignorTokenId, assigneeTokenId, assigneeProperties);
    }


    function removeAssignor(uint256 assigneeTokenId) public assignAccess(assigneeTokenId){
        uint256 assignorTokenId = assignedNFTs[assigneeTokenId];
        require(assignorTokenId > 0,  "AssignableERC721: this assignee is not owned by any assignor");
        _transfer(address(this) , msg.sender, assigneeTokenId);
        _removeAssignor(assigneeTokenId,assignorTokenId);
    }

    function _removeAssignor(uint256 assigneeTokenId,uint256 assignorTokenId) internal {
        assignedNFTs[assigneeTokenId] = 0;
        uint256[] memory assigneeProperties = tokenPropertiesValues[assigneeTokenId];
        bool[] memory signs = new bool[](assigneeProperties.length);

        for (uint256 index = 0; index < assigneeProperties.length; index++) {
            signs[index] = true;
        }

        _updateRoot(assignorTokenId, assigneeProperties, signs);

        emit RemoveAssignor(msg.sender, assigneeTokenId, assignorTokenId);
    }

    function addType(string memory typeName, uint256 allowedAccessorTypes, uint256 maxSupply,  string[] memory names, uint256[] memory mins, uint256[] memory maxs) public onlyOwner {
        require (names.length == mins.length);
        require (names.length == maxs.length);

        types.push(Type (typeName, allowedAccessorTypes, primeNumbers[types.length], maxSupply, 0));

        for (uint256 index = 0; index < names.length; index++) {
            require (maxs[index] > mins[index], "invalid max and min (max should be greater than min)");
            propertiesTypes[types.length - 1].push(Property(names[index], mins[index], maxs[index]));
        }
    }

    function addPropertiesToType(uint256 typeIndex, string[] memory names, uint256[] memory mins, uint256[] memory maxs) public onlyOwner {
        require (names.length == mins.length);
        require (names.length == maxs.length);

        for (uint256 index = 0; index < names.length; index++) {
            require (maxs[index] > mins[index], "invalid max and min (max should be greater than min)");
            propertiesTypes[typeIndex].push(Property(names[index], mins[index], maxs[index]));
        }
    }

    function upgradeTokenProperties(uint256 tokenId, uint256[] memory properties) public {
        require (upgradeAccessor[tokenId][msg.sender] == true, "You don't have access to upgrade!");

        _updateRoot(tokenId, properties);
        uint256[] storage tokenProperties = tokenPropertiesValues[tokenId];

        for (uint256 index = 0; index < properties.length; index++) {
            tokenProperties[index] += properties[index];
        }
    }

    function updateTokenPropertiesLength(uint256 tokenId) public {
        _fillMissingProperties(tokenId);
        _updateRoot(tokenId, new uint[](tokenPropertiesValues[tokenId].length));
    }

    function _updateRoot(uint256 tokenId, uint256[] memory updates) private {
        _updateRoot(tokenId, updates, new bool[](updates.length));
    }


    function _updateRoot(uint256 tokenId, uint256[] memory updates, bool[] memory sign) private {
        uint256 updatingIndex = _fillMissingProperties(tokenId);

        uint256 root = assignedNFTs[tokenId];
        uint256[] storage cumulativeValues = cumulativeTokenProperties[tokenId];
        uint256[] memory tokenProperties = tokenPropertiesValues[tokenId];

        for (uint256 index = 0; index < updates.length; index++) {
            if (sign[index])
                if (cumulativeValues[index] >= updates[index])
                    cumulativeValues[index] -= updates[index];
                else
                    cumulativeValues[index] = 0;
            else
                cumulativeValues[index] += updates[index];
        }
        if (root > 0) {
            for (uint256 index = updatingIndex; index < updates.length && index < tokenProperties.length; index++) {
                if (sign[index]) {
                    if (updates[index] > tokenProperties[index]){
                        updates[index] -= tokenProperties[index];
                    } else {
                        updates[index] = tokenProperties[index] - updates[index];
                        sign[index] = false;
                    }
                }
                else {
                    updates[index] += tokenProperties[index];
                }
            }
            _updateRoot(root, updates, sign);
        }
    }

    function _fillMissingProperties(uint256 tokenId) private returns (uint256 updatingIndex) {
        uint256 typeIndex = tokenTypeIndices[tokenId];
        Property[] memory typeProperties = propertiesTypes[typeIndex];
        uint256[] storage tokenProperties = tokenPropertiesValues[tokenId];
        uint256[] storage cumulativeValues = cumulativeTokenProperties[tokenId];
        if (typeProperties.length > tokenProperties.length) {
            updatingIndex = tokenProperties.length;
            for (uint256 index = tokenProperties.length; index < typeProperties.length; index++) {
                uint256 power = random(
                    typeProperties[index].minimum,
                    typeProperties[index].maximum,
                    typeProperties[index].name
                );
                tokenProperties.push(power);
                cumulativeValues.push(power);
            }
            return updatingIndex;
        }
        return 0;
    }


    function editType(uint256 typeindex, string memory typeName, uint256 allowedAssignorTypes) public onlyOwner {
        types[typeindex].typeName = typeName;
        types[typeindex].allowedAssignorTypes =  allowedAssignorTypes;
    }

    function mint(address to, uint256 typeIndex) public {
        require(types[typeIndex].maxSupply == 0 || types[typeIndex].maxSupply > types[typeIndex].currentSupply, "current supply exceeds max supply!");
        IERC20(ERA).transferFrom(msg.sender, owner(), mintFee);
        types[typeIndex].currentSupply += 1;
        _mint(to, latestTokenID);
        tokenTypeIndices[latestTokenID] = typeIndex;
        uint256[] storage values = tokenPropertiesValues[latestTokenID];
        uint256[] storage cumulativeValues = cumulativeTokenProperties[latestTokenID];
        latestTokenID += 1;
        for (uint256 index = 0; index < propertiesTypes[typeIndex].length; index++) {
            uint256 power = random(
                propertiesTypes[typeIndex][index].minimum,
                propertiesTypes[typeIndex][index].maximum,
                propertiesTypes[typeIndex][index].name
            );
            values.push(power);
            cumulativeValues.push(power);
        }
        emit MintTypedNFT(to, latestTokenID - 1, typeIndex,values);
    }


    function random(uint256 min, uint256 max, string memory name) private view returns (uint) {
        return (uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, block.coinbase, latestTokenID, name))) % (max - min)) + min;
    }


    modifier assignAccess(uint256 assigneeTokenId) {
        require(rootOwner(assigneeTokenId) == msg.sender, "AssignableERC721: assign of token that is not own");
        _;
    }

    function setMintFee(uint256 _fee) public onlyOwner {
        mintFee = _fee;
    }

    function setUpgradeAccessor(uint256 typeIndex, address accessor, bool access) public onlyOwner {
        upgradeAccessor[typeIndex][accessor] = access;
    }

    function rootOwner(uint256 tokenId) public view returns(address) {
        uint256 currentTokenId = tokenId;
        while (assignedNFTs[currentTokenId] > 0) {
            currentTokenId = assignedNFTs[currentTokenId];
        }
        return ownerOf(currentTokenId);
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        uint256 chainId = getChainID();
        string memory baseURI = "https://histopia.io/auth/meta/";
        baseURI = string(abi.encodePacked(baseURI,chainId.toString()));
        baseURI = string(abi.encodePacked(baseURI,"/"));
        return  string(abi.encodePacked(baseURI, tokenId.toString()));
    }

    function getChainID() public view returns (uint256) {
        uint256 id;
        assembly {
            id := chainid()
        }
        return id;
    }

    function getCumulativeTokenProperties (uint256 tokenId) public view returns (uint256[] memory) {
        return CumulativeTokenProperties[tokenId];
    }

    function getTokenProperties (uint256 tokenId) public view returns (uint256[] memory) {
        return tokenPropertiesValues[tokenId];
    }
}
