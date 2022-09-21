// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./TypedNFT.sol";

contract AttachableERC721 is ERC721Burnable, TypedNFT {

    mapping(uint256 => uint256) public assignedNFTs;



    event Unequip(address indexed owner, uint256 indexed assigneeTokenId, uint256 indexed assignorTokenId);
    event Equip(address indexed owner, uint256 indexed assigneeTokenId, uint256 indexed assignorTokenId);

    constructor (string memory name_, string memory symbol_) TypedNFT(name_, symbol_) {
    }


    function equip(uint256 assigneeTokenId, uint256 assignorTokenId) public {
        require(assigneeTokenId != assignorTokenId, "identical assignee and assingor");
        require(ownerOf(assigneeTokenId) == msg.sender, "you are not allowed to equip this nft");
        require(assignedNFTs[assigneeTokenId] == 0, "assignee is already assigned to a nft");
        require(rootOwner(assignorTokenId) == msg.sender, "you don't have access to this assignor");
        uint256 typeId = tokenIdToTypeIndex[assigneeTokenId];
        require(types[typeId].allowedAssignorTypes % types[tokenIdToTypeIndex[assignorTokenId]].typeId == 0, "AssignableERC721: this assignor type is not allowed for this assignee type");

        _transfer(msg.sender, address(this), assigneeTokenId);

        assignedNFTs[assigneeTokenId] = assignorTokenId;

        uint256[] memory updatingValues = getTokenProperties(assigneeTokenId);
        Property[] memory updatingProperties = propertiesTypes[typeId];
        _updateRootEquip(assignorTokenId, updatingProperties, updatingValues);

        emit Equip(msg.sender, assigneeTokenId, assignorTokenId);
    }

    function _updateRootEquip(uint256 tokenId, Property[] memory updatingProperties, uint256[] memory updatingValues) internal {
        for (uint8 i = 0; i < updatingProperties.length; i++) {
            if (propertiesTypesExistence[tokenIdToTypeIndex[tokenId]][updatingProperties[i].name]) {
                tokenPropertiesValues[tokenId][updatingProperties[i].name] += updatingValues[i];
            } else {
                updatingValues[i] = 0;
            }
        }
        if (assignedNFTs[tokenId] > 0) {
            _updateRootEquip(assignedNFTs[tokenId], updatingProperties, updatingValues);
        }
    }

    function unequip(uint256 assigneeTokenId) public {
        require(assignedNFTs[assigneeTokenId] > 0, "assignee is not assigned to a nft");
        require(rootOwner(assigneeTokenId) == msg.sender, "you don't have access to this assignee");

        _transfer(address(this), msg.sender, assigneeTokenId);


        uint256[] memory updatingValues = getTokenProperties(assigneeTokenId);
        Property[] memory updatingProperties = propertiesTypes[tokenIdToTypeIndex[assigneeTokenId]];

        _updateRootUnequip(assignedNFTs[assigneeTokenId], updatingProperties, updatingValues);
        emit Unequip(msg.sender, assigneeTokenId, assignedNFTs[assigneeTokenId]);

        assignedNFTs[assigneeTokenId] = 0;

    }

    function _updateRootUnequip(uint256 tokenId, Property[] memory updatingProperties, uint256[] memory updatingValues) internal {
        if (assignedNFTs[tokenId] > 0) {
            _updateRootUnequip(assignedNFTs[tokenId], updatingProperties, updatingValues);
        }
        for (uint8 i = 0; i < updatingProperties.length; i++) {
            if (propertiesTypesExistence[tokenIdToTypeIndex[tokenId]][updatingProperties[i].name]) {
                tokenPropertiesValues[tokenId][updatingProperties[i].name] -= updatingValues[i];
            }
        }
    }

    function rootOwner(uint256 tokenId) public view returns (address) {
        uint256 currentTokenId = tokenId;
        while (assignedNFTs[currentTokenId] > 0) {
            currentTokenId = assignedNFTs[currentTokenId];
        }
        return ownerOf(currentTokenId);
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
