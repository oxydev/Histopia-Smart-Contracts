pragma solidity ^0.8.0;

import "./AttachableNFT.sol";

contract HistopiaNFT is AttachableERC721 {

    address public ERA;
    uint256 public mintFee;

    event Mint(address indexed to, uint256 indexed typeId, uint256 indexed tokenId, uint256[] properties);

    constructor (string memory name_, string memory symbol_, address _ERA, uint256 _mintFee) AttachableERC721(name_, symbol_) {
        ERA = _ERA;
        mintFee = _mintFee;
    }

    function mint(address to, uint256 typeIndex) public {
        if (balanceOf(owner()) > 3) {
            require(IERC20(ERA).transferFrom(msg.sender, owner(), mintFee), "HistopiaNFT: transfer failed");
        }
        uint256 [] memory powers = _mintAndSetProperties(to, typeIndex);
        emit Mint(to, typeIndex, latestTokenID - 1, powers);
    }


    function setMintFee(uint256 _fee) public onlyOwner {
        mintFee = _fee;
    }
}
