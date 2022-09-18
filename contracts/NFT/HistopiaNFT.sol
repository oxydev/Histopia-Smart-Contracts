pragma solidity ^0.8.0;

import "./AttachableNFT.sol";

contract HistopiaNFT is AttachableERC721 {

    string public baseTokenURI;

    address public ERA;
    uint256 public mintFee;
    mapping(address => uint256) public usersCounter;
    event Mint(address indexed to, uint256 indexed typeId, uint256 indexed tokenId, uint256[] properties);

    constructor (string memory name_, string memory symbol_, address _ERA, uint256 _mintFee) AttachableERC721(name_, symbol_) {
        ERA = _ERA;
        mintFee = _mintFee;
        baseTokenURI = string(abi.encodePacked("https://api.histopia.io/nft/", Strings.toString(block.chainid), "/"));
    }

    function mint(address to, uint256 typeIndex) public {
        if (usersCounter[to] > 0) {
            require(IERC20(ERA).transferFrom(to, owner(), mintFee), "HistopiaNFT: transfer failed");
        }
        usersCounter[to]++;
        uint256 [] memory powers = _mintAndSetProperties(to, typeIndex);
        emit Mint(to, typeIndex, latestTokenID - 1, powers);
    }

    function setMintFee(uint256 _fee) public onlyOwner {
        mintFee = _fee;
    }

    /**
   * @dev get the base token uri
    * @return baseTokenURI, base token uri
     */
    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, Strings.toString(tokenId))) : "";
    }
}
