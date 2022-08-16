// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Resources is ERC1155, Ownable {
    uint256 public constant GOLD = 0;
    uint256 public constant WOOD = 1;
    uint256 public constant STONE = 2;
    uint256 public constant IRON = 3;
    uint256 public constant WOOL = 4;

    uint256 public constant FLOUR = 5;
    uint256 public constant BREAD = 6;
    uint256 public constant RICE = 7;
    uint256 public constant GRAPE = 8;
    uint256 public constant DATE = 9;
    uint256 public constant MEAT = 10;
    uint256 public constant MILK = 11;
    uint256 public constant EGG = 12;
    uint256 public constant WHEAT = 13;

    uint256 public constant SHIELD = 14;
    uint256 public constant SWORD = 15;
    uint256 public constant BOW = 16;
    uint256 public constant SPEAR = 17;

    uint256 public constant CATTLE = 18;
    uint256 public constant SHEEP = 19;
    uint256 public constant HEN = 20;
    uint256 public constant PIG = 21;

    constructor() ERC1155("https://histopia.io/api/item/{id}.json") {
        _mint(msg.sender, GOLD, 1, "");
        _mint(msg.sender, WOOD, 1, "");
        _mint(msg.sender, STONE, 1, "");
        _mint(msg.sender, IRON, 1, "");
        _mint(msg.sender, WOOL, 1, "");
        _mint(msg.sender, FLOUR, 1, "");
        _mint(msg.sender, BREAD, 1, "");
        _mint(msg.sender, BREAD, 1, "");
        _mint(msg.sender, RICE, 1, "");
        _mint(msg.sender, GRAPE, 1, "");
        _mint(msg.sender, DATE, 1, "");
        _mint(msg.sender, MEAT, 1, "");
        _mint(msg.sender, MILK, 1, "");
        _mint(msg.sender, EGG, 1, "");
        _mint(msg.sender, WHEAT, 1, "");
        _mint(msg.sender, SHIELD, 1, "");
        _mint(msg.sender, SWORD, 1, "");
        _mint(msg.sender, BOW, 1, "");
        _mint(msg.sender, SPEAR, 1, "");
        _mint(msg.sender, SHIELD, 1, "");
        _mint(msg.sender, CATTLE, 1, "");
        _mint(msg.sender, SHEEP, 1, "");
        _mint(msg.sender, HEN, 1, "");
        _mint(msg.sender, PIG, 1, "");
    }


    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        _mint(account,id, amount, data);
    }
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public onlyOwner {
        _mintBatch(to,ids, amounts, data);
    }

    function setURI(string memory uri_) public onlyOwner {
        _setURI(uri_);
    }
}
