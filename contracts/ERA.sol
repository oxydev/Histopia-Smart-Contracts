// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERA is ERC20, Ownable  {
    uint256 maxSupply;
    uint8 _decimals;
    address mintAccessor = address(0);

    constructor () ERC20("ERA token", "ERA") {
        _decimals = 18;
        maxSupply = 10 ** 12 * 10 ** _decimals;
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function mint(address account, uint256 amount) public /*onlyMintAccessor*/ {
        require(msg.sender == mintAccessor, "only mintAccessor can mint");
        // require(totalSupply() <= maxSupply + amount);
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public {
        _burn(account, amount);
    }

    function changeMintAccessor(address _mintAccessor) public onlyOwner {
//         require(mintAccessor == address(0));
        mintAccessor = _mintAccessor;
    }

    modifier onlyMintAccessor {
        require(msg.sender == mintAccessor);
        _;
    }

    function withdrawShare(address dest, uint256 amount) public {
        mint(dest, amount);
    }

    function getEraContractAddress() public view returns (address EraContract) {
        return address(this);
    }
}
