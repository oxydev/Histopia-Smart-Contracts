pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

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

contract TypedNFT is ERC721, Ownable {
    Type[] public types;
    //,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997

    uint256[] public primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
    mapping(uint256 => Property[]) public propertiesTypes;
    mapping(uint256 => mapping(string => bool)) public propertiesTypesExistence;
    mapping(uint256 => uint256) public tokenIdToTypeIndex;
    mapping(uint256 => mapping(string => uint256)) tokenPropertiesValues;
    uint256 private randomNonce = 1;
    uint256 public latestTokenID = 1;

    event AddType(
        uint256 typeId,
        string typeName,
        uint256 allowedAccessorTypes,
        uint256 maxSupply,
        string[] names,
        uint256[] mins,
        uint256[] maxs,
        uint256 primeNumber
    );

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) { }

    function addType(
        string memory typeName,
        uint256 allowedAccessorTypes,
        uint256 maxSupply,
        string[] memory names,
        uint256[] memory minValues,
        uint256[] memory maxValues
    ) public onlyOwner {
        require(names.length == minValues.length);
        require(names.length == maxValues.length);

        types.push(Type(typeName, allowedAccessorTypes, primeNumbers[types.length], maxSupply, 0));

        for (uint256 index = 0; index < names.length; index++) {
            require(maxValues[index] > minValues[index], "invalid max and min (max should be greater than min)");
            propertiesTypes[types.length - 1].push(Property(names[index], minValues[index], maxValues[index]));
            propertiesTypesExistence[types.length - 1][names[index]] = true;
        }
        emit AddType(
            types.length - 1,
            typeName,
            allowedAccessorTypes,
            maxSupply,
            names,
            minValues,
            maxValues,
            primeNumbers[types.length - 1]
        );
    }

    function editType(uint256 typeIndex, string memory typeName, uint256 allowedAssignorTypes) public onlyOwner {
        types[typeIndex].typeName = typeName;
        types[typeIndex].allowedAssignorTypes = allowedAssignorTypes;
    }

    function _mintAndSetProperties(address to, uint256 typeIndex) internal returns (uint256[] memory) {
        require(
            types[typeIndex].maxSupply == 0 || types[typeIndex].maxSupply > types[typeIndex].currentSupply,
            "current supply exceeds max supply!"
        );
        types[typeIndex].currentSupply += 1;
        tokenIdToTypeIndex[latestTokenID] = typeIndex;
        mapping(string => uint256) storage values = tokenPropertiesValues[latestTokenID];
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
        }
        _mint(to, latestTokenID - 1);
        return propertiesForEvents;
    }

    function getTokenProperties(uint256 tokenId) public view returns (uint256[] memory) {
        uint256 typeIndex = tokenIdToTypeIndex[tokenId];
        Property[] memory properties = propertiesTypes[typeIndex];
        uint256[] memory propertiesValues = new uint256[](properties.length);
        for (uint8 i = 0; i < properties.length; i++) {
            propertiesValues[i] = tokenPropertiesValues[tokenId][properties[i].name];
        }
        return propertiesValues;
    }

    function random(uint256 min, uint256 max, string memory name, uint256 index) private view returns (uint256) {
        return (
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty, block.timestamp, block.coinbase, index, latestTokenID, name, randomNonce
                    )
                )
            ) % (max - min)
        ) + min;
    }
}
