// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "openzeppelin-solidity/contracts/token/ERC1155/ERC1155.sol";


contract Resources is ERC1155 {
    constructor (string memory uri_) ERC1155(uri_) {
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data) public {
        _mint(account,id, amount, data);
    }   
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public {
        _mintBatch(to,ids, amounts, data);
    }  
}