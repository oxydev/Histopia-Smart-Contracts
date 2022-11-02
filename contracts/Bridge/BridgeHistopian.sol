pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../ERA.sol";

interface INFT {
    function burn(uint256 tokenId) external;
    function latestTokenID() external returns (uint256);
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
    function mint(address to, uint256 typeIndex) external;

}
contract BridgeHistopian is Ownable{
    uint256 public BRIDGE_FEE = 100 * 10 ** 18; // 100 ERA
    uint256 public NFT_COST = 2500 * 10 ** 18; // 2500 ERA

    address public feeCollector;
    address supplier;
    ERA public ERAContract;
    INFT public nftContract; // Address of NFT token contract.

    mapping(bytes32 => bool) public hashes;

    event LockedNFT(uint256[] tokenIds, address indexed to, uint256 indexed destChain);
    event MintNFT(uint256[] tokenIds, uint indexed startingIndex, address indexed to);

    constructor(ERA _ERA, address _feeCollector, INFT _nftContract, address _supplier) {
        ERAContract = _ERA;
        feeCollector = _feeCollector;
        nftContract = _nftContract;
        supplier = _supplier;
        ERAContract.approve(address(nftContract), 2**256 - 1);


    }

    function lockNFT(uint256[] memory tokenIds, address to, uint256 destChain) public {
        ERAContract.transferFrom(msg.sender, feeCollector, tokenIds.length * BRIDGE_FEE);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            nftContract.burn(tokenIds[i]);
        }
        emit LockedNFT(tokenIds, to, destChain);

    }

    function mintNFTs(uint256[] memory tokenIds, uint typeIndex, address to, bytes32 hashVerifier) public {
        require(!hashes[hashVerifier], "Already minted");
        ERAContract.transferFrom(msg.sender, feeCollector, tokenIds.length * BRIDGE_FEE);
        ERAContract.transferFrom(supplier, address(this), tokenIds.length * NFT_COST);
        uint256 latestTokenId = nftContract.latestTokenID();
        for (uint256 i = 0; i < tokenIds.length; i++) {
            nftContract.mint(address(this), typeIndex);
        }
        for (uint256 i = 0; i < tokenIds.length; i++) {
            nftContract.safeTransferFrom(address(this), to, latestTokenId + i);
        }
        emit MintNFT(tokenIds, latestTokenId, to);

    }

    function setFee(uint256 _fee) public onlyOwner {
        BRIDGE_FEE = _fee;
    }

    function setFeeCollector(address _feeCollector) public onlyOwner {
        feeCollector = _feeCollector;
    }

    function emptyAccountERA(address to) public onlyOwner {
        ERAContract.transfer(to, ERAContract.balanceOf(address(this)));
    }

    function transferAccountNFT(address to, uint256[] memory indices) public onlyOwner {
        for (uint256 i = 0; i < indices.length; i++) {
            nftContract.safeTransferFrom(address(this), to, indices[i]);
        }
    }
}

