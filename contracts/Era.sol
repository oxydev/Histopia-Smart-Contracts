// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";

contract ERA is ERC20, Ownable  {
    uint256 maxSupply;
    uint8 _decimals;
    address mintAccessor = address(0);

    constructor () ERC20("ER", "ERRRR") {
        _decimals = 6;
        maxSupply = 10 ** 8 * 10 ** _decimals;
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function mint(address account, uint256 amount) public onlyMintAccessor {
        require(totalSupply() <= maxSupply + amount);
        _mint(account, amount);
    }   

    function changeMintAccessor(address _mintAccessor) public onlyOwner {
        // require(mintAccessor == address(0));
        mintAccessor = _mintAccessor;
    }

    modifier onlyMintAccessor {
        require(msg.sender == mintAccessor);
        _;
    }
}