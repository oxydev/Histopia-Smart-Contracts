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

    function owner() external returns (address);
    function mintFee() external returns (uint256);
}

contract BridgeHistopian is Ownable {
    uint256 public BRIDGE_FEE = 100 * 10 ** 18; // 100 ERA
    uint256 public NFT_COST = 2500 * 10 ** 18; // 2500 ERA

    address public feeCollector;
    ERA public ERAContract;
    INFT public nftContract; // Address of NFT token contract.
    address public bridgeAttestor;

    mapping(bytes32 => bool) public hashes;

    event LockedNFT(uint256[] tokenIds, address indexed to, uint256 indexed destChain);
    event MintNFT(uint256[] tokenIds, uint indexed startingIndex, address indexed to, bytes32 hashVerifier);

    constructor(ERA _ERA, address _feeCollector, INFT _nftContract, address _bridgeAttestor) {
        ERAContract = _ERA;
        feeCollector = _feeCollector;
        nftContract = _nftContract;
        ERAContract.approve(address(nftContract), 2 ** 256 - 1);
        uint256 latestTokenId = nftContract.latestTokenID();
        nftContract.mint(address(this), 1);
        nftContract.safeTransferFrom(address(this), msg.sender, latestTokenId);
        NFT_COST = nftContract.mintFee();
        bridgeAttestor = _bridgeAttestor;
    }

    function lockNFT(uint256[] memory tokenIds, address to, uint256 destChain) public {
        ERAContract.transferFrom(msg.sender, feeCollector, tokenIds.length * BRIDGE_FEE);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            nftContract.burn(tokenIds[i]);
        }
        emit LockedNFT(tokenIds, to, destChain);
    }

    function mintNFTs(uint256[] memory tokenIds, uint256 typeIndex, address to, bytes32 hashVerifier) public {
        require(!hashes[hashVerifier], "Already minted");
        require(msg.sender == bridgeAttestor, "Not authorized");
        address owner = nftContract.owner();
        ERAContract.transferFrom(owner, address(this), tokenIds.length * NFT_COST);
        uint256 latestTokenId = nftContract.latestTokenID();
        for (uint256 i = 0; i < tokenIds.length; i++) {
            nftContract.mint(address(this), typeIndex);
        }
        for (uint256 i = 0; i < tokenIds.length; i++) {
            nftContract.safeTransferFrom(address(this), to, latestTokenId + i);
        }
        emit MintNFT(tokenIds, latestTokenId, to, hashVerifier);

    }

    function setFee(uint256 _fee) public onlyOwner {
        BRIDGE_FEE = _fee;
    }

    function setFeeCollector(address _feeCollector) public onlyOwner {
        feeCollector = _feeCollector;
    }

    function setBridgeAttestor(address _bridgeAttestor) public onlyOwner {
        bridgeAttestor = _bridgeAttestor;
    }

    function updateNFTCost() public  {
        NFT_COST = nftContract.mintFee();
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

