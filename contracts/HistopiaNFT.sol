// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

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

contract AttachableERC721 is ERC721, Ownable, ERC721Burnable {
    using Strings for uint256;

    uint256 public latestTokenID = 1;
    Type[] public types;
    //,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997
    uint256[] public primeNumbers = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79];
    mapping(uint256 =>  Property[]) public propertiesTypes;
    mapping(uint256 => mapping(string => bool)) public propertiesTypesExistence;
    mapping(uint256 => uint256) public tokenIdToTypeIndex;
    mapping(uint256 => mapping(string => uint256)) tokenPropertiesValues;
    mapping(uint256 => mapping(string => uint256)) cumulativeTokenProperties;

    mapping(uint256 => uint256) public assignedNFTs;
    uint256 private randomNonce = 1;
    address public ERA;
    uint256 public mintFee;

    event Mint(address indexed to, uint256 indexed typeId, uint256 indexed tokenId, uint256[] properties);
    event AddType(uint256 typeId, string typeName, uint256 allowedAccessorTypes, uint256 maxSupply, string[]names, uint256[]mins, uint256[]maxs, uint256 primeNumber);
    event Unequip(address indexed owner, uint256 indexed assigneeTokenId, uint256 indexed assignorTokenId);
    event Equip(address indexed owner,uint256 indexed assigneeTokenId, uint256 indexed assignorTokenId);

    constructor (string memory name_, string memory symbol_, address _ERA, uint256 _mintFee) ERC721(name_, symbol_) {
        ERA = _ERA;
        mintFee = _mintFee;
    }


    function equip(uint256 assigneeTokenId, uint256 assignorTokenId) public {
        require (assigneeTokenId != assignorTokenId, "identical assignee and assingor");
        require (ownerOf(assigneeTokenId) == msg.sender, "you are not allowed to equip this nft");
        require (assignedNFTs[assigneeTokenId] == 0, "assignee is already assigned to a nft");
        require (rootOwner(assignorTokenId) == msg.sender, "you don't have access to this assignor");
        uint256 typeId = tokenIdToTypeIndex[assigneeTokenId];
        require (types[typeId].allowedAssignorTypes % types[tokenIdToTypeIndex[assignorTokenId]].typeId == 0, "AssignableERC721: this assignor type is not allowed for this assignee type");

        _transfer(msg.sender, address(this), assigneeTokenId);

        assignedNFTs[assigneeTokenId] = assignorTokenId;

        uint256[] memory updatingValues = getCumulativeTokenProperties(assigneeTokenId);
        Property[] memory updatingProperties = propertiesTypes[typeId];
        _updateRootEquip(assignorTokenId, updatingProperties, updatingValues);

        emit Equip(msg.sender, assigneeTokenId, assignorTokenId);
    }

    function _updateRootEquip(uint256 tokenId, Property[] memory updatingProperties, uint256[] memory updatingValues) internal {
        for(uint8 i = 0; i < updatingProperties.length; i++) {
            if (propertiesTypesExistence[tokenIdToTypeIndex[tokenId]][updatingProperties[i].name]) {
                cumulativeTokenProperties[tokenId][updatingProperties[i].name] += updatingValues[i];
            } else {
                updatingValues[i] = 0;
            }
        }
        if (assignedNFTs[tokenId] > 0){
            _updateRootEquip(assignedNFTs[tokenId], updatingProperties, updatingValues);
        }
    }

    function unequip(uint256 assigneeTokenId) public {
        require (assignedNFTs[assigneeTokenId] > 0, "assignee is not assigned to a nft");
        require (rootOwner(assigneeTokenId) == msg.sender, "you don't have access to this assignee");

        _transfer(address(this), msg.sender, assigneeTokenId);



        uint256[] memory updatingValues = getCumulativeTokenProperties(assigneeTokenId);
        Property[] memory updatingProperties = propertiesTypes[tokenIdToTypeIndex[assigneeTokenId]];

        _updateRootUnequip(assignedNFTs[assigneeTokenId], updatingProperties, updatingValues);
        emit Unequip(msg.sender, assigneeTokenId, assignedNFTs[assigneeTokenId]);

        assignedNFTs[assigneeTokenId] = 0;

    }

    function _updateRootUnequip(uint256 tokenId, Property[] memory updatingProperties, uint256[] memory updatingValues) internal {
        if (assignedNFTs[tokenId] > 0){
            _updateRootUnequip(assignedNFTs[tokenId], updatingProperties, updatingValues);
        }
        for(uint8 i = 0; i < updatingProperties.length; i++) {
            if (propertiesTypesExistence[tokenIdToTypeIndex[tokenId]][updatingProperties[i].name]){
                cumulativeTokenProperties[tokenId][updatingProperties[i].name] -= updatingValues[i];
            }
        }
    }

    function addType(string memory typeName, uint256 allowedAccessorTypes, uint256 maxSupply,  string[] memory names, uint256[] memory mins, uint256[] memory maxs) public onlyOwner {
        require (names.length == mins.length);
        require (names.length == maxs.length);

        types.push(Type (typeName, allowedAccessorTypes, primeNumbers[types.length], maxSupply, 0));

        for (uint256 index = 0; index < names.length; index++) {
            require (maxs[index] > mins[index], "invalid max and min (max should be greater than min)");
            propertiesTypes[types.length - 1].push(Property(names[index], mins[index], maxs[index]));
            propertiesTypesExistence[types.length - 1][names[index]] = true;
        }
        emit AddType(types.length - 1,typeName,  allowedAccessorTypes,maxSupply, names, mins, maxs, primeNumbers[types.length - 1]);
    }

    function editType(uint256 typeindex, string memory typeName, uint256 allowedAssignorTypes) public onlyOwner {
        types[typeindex].typeName = typeName;
        types[typeindex].allowedAssignorTypes =  allowedAssignorTypes;
    }

    function mint(address to, uint256 typeIndex) public {
        require(types[typeIndex].maxSupply == 0 || types[typeIndex].maxSupply > types[typeIndex].currentSupply, "current supply exceeds max supply!");
        IERC20(ERA).transferFrom(msg.sender, owner(), mintFee);
        types[typeIndex].currentSupply += 1;

        tokenIdToTypeIndex[latestTokenID] = typeIndex;
        mapping(string => uint256) storage values = tokenPropertiesValues[latestTokenID];
        mapping(string => uint256) storage cumulativeValues = cumulativeTokenProperties[latestTokenID];
        latestTokenID += 1;
        uint256[] memory propertiesForEvents = new uint256[](propertiesTypes[typeIndex].length);
        for (uint256 index = 0; index < propertiesTypes[typeIndex].length; index++) {
            randomNonce++;
            uint256 power = random(
                propertiesTypes[typeIndex][index].minimum,
                propertiesTypes[typeIndex][index].maximum,
                propertiesTypes[typeIndex][index].name,
                index
            );
            propertiesForEvents[index] = power;
            values[propertiesTypes[typeIndex][index].name] = power;
            cumulativeValues[propertiesTypes[typeIndex][index].name] = power;
        }
        emit Mint(to,  typeIndex,latestTokenID - 1, propertiesForEvents);
        _mint(to, latestTokenID - 1);
    }


    function random(uint256 min, uint256 max, string memory name, uint256 index) private view returns (uint) {
        return (uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, block.coinbase, index, latestTokenID, name, randomNonce))) % (max - min)) + min;
    }


    function setMintFee(uint256 _fee) public onlyOwner {
        mintFee = _fee;
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

    // TODO: check the chainId
    function getChainID() public view returns (uint256) {
        uint256 id;
        assembly {
            id := chainid()
        }
        return id;
    }

    function getCumulativeTokenProperties (uint256 tokenId) public view returns (uint256[] memory) {
        uint256 typeIndex = tokenIdToTypeIndex[tokenId];
        Property[] memory properties = propertiesTypes[typeIndex];
        uint256[] memory propertiesValues = new uint256[](properties.length);
        for(uint8 i = 0; i < properties.length; i++) {
            propertiesValues[i] = cumulativeTokenProperties[tokenId][properties[i].name];
        }
        return propertiesValues;
    }

    function getTokenProperties (uint256 tokenId) public view returns (uint256[] memory) {
        uint256 typeIndex = tokenIdToTypeIndex[tokenId];
        Property[] memory properties = propertiesTypes[typeIndex];
        uint256[] memory propertiesValues = new uint256[](properties.length);
        for(uint8 i = 0; i < properties.length; i++) {
            propertiesValues[i] = tokenPropertiesValues[tokenId][properties[i].name];
        }
        return propertiesValues;
    }

    // // TODO: Implement breed function
    // function breed (uint256 tokenId) public view returns (uint256[] memory) {
    //     return tokenPropertiesValues[tokenId];
    // }

    // // TODO: Implement upgrade function
    // function upgrade (uint256 tokenId) public view returns (uint256[] memory) {
    //     return tokenPropertiesValues[tokenId];
    // }
}
