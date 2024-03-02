pragma solidity ^0.8.0;

import "./NFT/HistopiaNFT.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract NFTMintLogic is Ownable {
    using SafeERC20 for IERC20;

    HistopiaNFT public histopiaNFT;
    address public era;

    mapping(uint256 => uint256) public typeToPrice;

    constructor(HistopiaNFT _histopiaNFT, address _era) {
        histopiaNFT = _histopiaNFT;
        era = _era;
    }

    function mintNFTWithFee(address to, uint256 typeIndex) public {
        uint256 price = typeToPrice[typeIndex];
        IERC20(era).safeTransferFrom(msg.sender, address(owner()), price);

        histopiaNFT.mint(to, typeIndex);
    }

    function mintNFTWithFeeBatch(address to, uint256[] memory typeIndices) public {
        uint256 totalFee = 0;
        for (uint256 i = 0; i < typeIndices.length; i++) {
            totalFee += typeToPrice[typeIndices[i]];
        }
        IERC20(era).safeTransferFrom(msg.sender, address(owner()), totalFee);

        for (uint256 i = 0; i < typeIndices.length; i++) {
            histopiaNFT.mint(to, typeIndices[i]);
        }
    }

    function setMintFee(uint256 typeIndex, uint256 price) public onlyOwner {
        typeToPrice[typeIndex] = price;
    }
}
