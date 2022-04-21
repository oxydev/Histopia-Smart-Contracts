// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";

struct Characterstic {
    string name;
    uint256 minimum;
    uint256 maximum;
}


struct Type {
    string typeName;
    uint256 allowedAssignorTypes;
    address breadingAccessor;
    uint256 typeId;
    uint256 maxSupply;
    uint256 currentSupply;
    bool breadable;
}

struct AccessContract {
    address tenant;
    uint256 dueDate;
}

contract AttachableERC721 is ERC721, Ownable {
    using SafeMath for uint256;

    uint256 public latestTokenID;
    Type[] public types;
    uint256[] public primeNumbers = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];
    mapping(uint256 =>  Characterstic[]) public characteristicsTypes;
    mapping(uint256 => uint256) public tokenTypeIndices;
    mapping(uint256 => uint256[]) public characteristicsValues;
    mapping(uint256 => uint256[]) public comulativeCharacteristicsValues;

    mapping(uint256 => uint256) public assignedNFTs;
    mapping(uint256 => AccessContract) public tokenAccessor;

    address public ERA;
    uint256 public mintFee;



    event SetAssignor(address indexed owner, uint256 indexed assigneeTokenId, uint256 indexed assignorTokenId);
    event RemoveAssignor(address indexed owner, uint256 indexed assigneeTokenId, uint256 indexed assignorTokenId);

    constructor (string memory name_, string memory symbol_, address _ERA, uint256 _mintFee) ERC721(name_, symbol_) {
        ERA = _ERA;
        mintFee = _mintFee;
    }

    function setAssignor(uint256 assigneeTokenId, uint256 assignorTokenId) public assignAccess(assigneeTokenId) {
        require(types[tokenTypeIndices[assigneeTokenId]].allowedAssignorTypes % types[tokenTypeIndices[assignorTokenId]].typeId == 0, "AssignableERC721: this assignor type is not allowed for this assignee type");
        assignedNFTs[assigneeTokenId] = assignorTokenId;

        uint256[] memory assigneeCharactristics = characteristicsValues[assigneeTokenId];
        uint256[] storage assignorCharactristics = comulativeCharacteristicsValues[assigneeTokenId];

        for (uint256 index = 0; index < assigneeCharactristics.length; index++) {
            assignorCharactristics[index] = assignorCharactristics[index].add(assigneeCharactristics[index]);
        }
        emit SetAssignor(msg.sender, assigneeTokenId, assignorTokenId);
    }

    function removeAssignor(uint256 assigneeTokenId) public assignAccess(assigneeTokenId){
        uint256 assignorTokenId = assignedNFTs[assigneeTokenId];
        require(assignorTokenId > 0,  "AssignableERC721: this assignee is not owned by any assignor");
        _removeAssignor(assigneeTokenId,assignorTokenId);
    }

    function _removeAssignor(uint256 assigneeTokenId,uint256 assignorTokenId) internal{
        assignedNFTs[assigneeTokenId]  = 0;
        uint256[] memory assigneeCharactristics = characteristicsValues[assigneeTokenId];
        uint256[] storage assignorComulativeCharactristics = comulativeCharacteristicsValues[assignorTokenId];

        for (uint256 index = 0; index < assigneeCharactristics.length; index++) {
            assignorComulativeCharactristics[index] = assignorComulativeCharactristics[index].sub(assigneeCharactristics[index]);
        }
        emit RemoveAssignor(msg.sender, assigneeTokenId, assignorTokenId);
    }

    function addType(string memory typeName, uint256 allowedAccessorTypes,uint256 maxSupply, bool breadable, Characterstic[] memory a) public onlyOwner{
        types.push(Type (typeName, allowedAccessorTypes,address(0), primeNumbers[types.length], maxSupply, 0, breadable));
        
        for (uint256 index = 0; index < a.length; index++) {
            characteristicsTypes[types.length - 1].push(a[index]);
        }
    }

    function addCharactersticToType(uint256 typeIndex, Characterstic[] memory a) public onlyOwner{
        for (uint256 index = 0; index < a.length; index++) {
            characteristicsTypes[typeIndex].push(a[index]);
        }
    }

    function needsUpdate(uint256 tokenId) public view returns(bool) {
        return characteristicsTypes[tokenTypeIndices[tokenId]].length == characteristicsValues[tokenId].length;
    }

    function updateTokenCharacteristics(uint256 tokenId) public {
        uint256 typeIndex = tokenTypeIndices[tokenId];
        Characterstic[] memory typeCharacterstic = characteristicsTypes[typeIndex];
        uint256[] storage tokenCharacteristicsValues = characteristicsValues[tokenId];
        uint256[] storage comulativeValues = comulativeCharacteristicsValues[tokenId];

        if (typeCharacterstic.length > tokenCharacteristicsValues.length) {
            uint256 assinorTokenId = assignedNFTs[tokenId];
            if (assinorTokenId > 0) {
                updateTokenCharacteristics(assinorTokenId);
            }
            uint256 updatingValuesCount = typeCharacterstic.length - tokenCharacteristicsValues.length;
            for (uint256 index = 0; index < updatingValuesCount; index++) {
                uint256 power = random(
                    characteristicsTypes[typeIndex][index].minimum, 
                    characteristicsTypes[typeIndex][index].maximum, 
                    characteristicsTypes[typeIndex][index].name
                );
                tokenCharacteristicsValues.push(power);
                comulativeValues.push(power);
                if (assinorTokenId > 0 && tokenCharacteristicsValues.length < comulativeCharacteristicsValues[assinorTokenId].length) {
                    comulativeCharacteristicsValues[assinorTokenId][tokenCharacteristicsValues.length - 1] += power;
                }
            }
        }
        
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
        uint256[] storage values = characteristicsValues[latestTokenID];
        uint256[] storage comulativeValues = comulativeCharacteristicsValues[latestTokenID];
        latestTokenID += 1;
        for (uint256 index = 0; index < characteristicsTypes[typeIndex].length; index++) { 
            uint256 power = random(
                characteristicsTypes[typeIndex][index].minimum, 
                characteristicsTypes[typeIndex][index].maximum, 
                characteristicsTypes[typeIndex][index].name
            );
            values.push(power);
            comulativeValues.push(power);
        }
    }


    function random(uint256 min, uint256 max, string memory name) private view returns (uint) {
        return (uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, block.coinbase, latestTokenID, name))) % (max - min)) + min;
    }
    modifier assignAccess(uint256 assigneeTokenId) {
        if(tokenAccessor[assigneeTokenId].tenant == address(0))
            require(ownerOf(assigneeTokenId) == msg.sender, "AssignableERC721: assign of token that is not own");
        else 
            require(tokenAccessor[assigneeTokenId].tenant == msg.sender && tokenAccessor[assigneeTokenId].dueDate > block.timestamp,  "AssignableERC721: assign of token that is not own");
        _;
    }


    function setMintFee(uint256 _fee) public onlyOwner {
        mintFee = _fee;
    }
}