// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

struct Type {
    string typeName;
    uint256 allowedAssignorTypes;
    uint256 typeId;
}
struct AccessContract {
    address tenant;
    uint256 dueDate;
}
contract RentableERC721 is ERC721 {
    Type[] types;
    mapping(uint256 => uint256) public tokenTypeIndices;

    mapping(uint256 => uint256) public assignedNFTs;


    mapping(uint256 => AccessContract) public tokenAccessor;

    event SetAssignor(address indexed owner, uint256 indexed assigneeTokenId, uint256 indexed assignorTokenId);
    event RemoveAssignor(address indexed owner, uint256 indexed assigneeTokenId, uint256 indexed assignorTokenId);

    constructor (string memory name_, string memory symbol_) ERC721(name_, symbol_) {
    }

    function setAssignor(uint256 assigneeTokenId, uint256 assignorTokenId) public {
        if(tokenAccessor[assigneeTokenId].tenant == address(0))
            require(ownerOf(assigneeTokenId) == msg.sender, "AssignableERC721: assign of token that is not own");
        else 
            require(tokenAccessor[assigneeTokenId].tenant == msg.sender && tokenAccessor[assigneeTokenId].dueDate > block.timestamp,  "AssignableERC721: assign of token that is not own");

        require(types[tokenTypeIndices[assigneeTokenId]].allowedAssignorTypes % types[tokenTypeIndices[assignorTokenId]].typeId == 0, "AssignableERC721: this assignor type is not allowed for this assignee type");
        assignedNFTs[assigneeTokenId] = assignorTokenId;

        emit SetAssignor(msg.sender, assigneeTokenId, assignorTokenId);
    }

    function removeAssignor(uint256 assigneeTokenId) public {
        if(tokenAccessor[assigneeTokenId].tenant == address(0))
            require(ownerOf(assigneeTokenId) == msg.sender, "AssignableERC721: assign of token that is not own");
        else 
            require(tokenAccessor[assigneeTokenId].tenant == msg.sender && tokenAccessor[assigneeTokenId].dueDate > block.timestamp,  "AssignableERC721: assign of token that is not own");
        uint256 assignorTokenId = assignedNFTs[assigneeTokenId];
        require(assignorTokenId > 0,  "AssignableERC721: this assignee is not owned by this assignor");
        _removeAssignor(assigneeTokenId,assignorTokenId);
    }

    function _removeAssignor(uint256 assigneeTokenId,uint256 assignorTokenId) internal{
        assignedNFTs[assigneeTokenId]  = 0;
        emit RemoveAssignor(msg.sender, assigneeTokenId, assignorTokenId);
    }

    function addType(string memory typeName, uint256 allowedAssignorTypes, uint256 typeId) public {
        types.push(Type (typeName, allowedAssignorTypes, typeId));
    }

    function editType(uint256 typeindex, string memory typeName, uint256 allowedAssignorTypes) public {
        types[typeindex].typeName = typeName;
        types[typeindex].allowedAssignorTypes =  allowedAssignorTypes;
    }
    
    function mint() public {
        
    }

}