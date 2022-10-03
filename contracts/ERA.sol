// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERA is ERC20, Ownable  {
    uint8 _decimals;
    mapping(address => bool) public minters;

    constructor () ERC20("ERA token", "ERA") {
        _decimals = 18;
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function mint(address account, uint256 amount) public onlyMintAccessor {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public {
        _burn(account, amount);
    }

    function changeMintAccessor(address _mintAccessor, bool allow) public onlyOwner {
        minters[_mintAccessor] = allow;
    }

    modifier onlyMintAccessor {
        require(minters[_mintAccessor],"Not a mint accessor");
        _;
    }

    function withdrawShare(address dest, uint256 amount) public onlyMintAccessor {
        mint(dest, amount);
    }

    function getEraContractAddress() public view returns (address EraContract) {
        return address(this);
    }
}
