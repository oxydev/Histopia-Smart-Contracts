// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERA is ERC20, Ownable {
    mapping(address => bool) public minters;

    constructor() ERC20("ERA token", "ERA") { }

    function mint(address account, uint256 amount) public onlyMintAccessor {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public {
        _burn(account, amount);
    }

    function changeMintAccessor(address _mintAccessor, bool allow) public onlyOwner {
        minters[_mintAccessor] = allow;
    }

    modifier onlyMintAccessor() {
        require(minters[msg.sender], "Not a mint accessor");
        _;
    }
}
