pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../ERA.sol";

interface INFT {
    function burn(uint256 tokenId) external;
}
contract BridgeHistopian is Ownable{
    uint256 public BRIDGE_FEE = 100 * 10 ** 18; // 1 ERA

    address public feeCollector;
    ERA public ERAContract;
    INFT public nftContract; // Address of NFT token contract.

    event LockedNFT(uint256[] tokenId, address indexed to, uint256 indexed destChain);

    constructor(ERA _ERA, address _feeCollector, INFT _nftContract) {
        ERAContract = _ERA;
        feeCollector = _feeCollector;
        nftContract = _nftContract;
    }

    function lockNFT(uint256[] memory tokenIds, address to, uint256 destChain) public {
        ERAContract.transferFrom(msg.sender, feeCollector, tokenIds.length * BRIDGE_FEE);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            nftContract.burn(tokenIds[i]);
        }
        emit LockedNFT(tokenIds, to, destChain);

    }

    function setFee(uint256 _fee) public onlyOwner {
        BRIDGE_FEE = _fee;
    }

    function setFeeCollector(address _feeCollector) public onlyOwner {
        feeCollector = _feeCollector;
    }
}

