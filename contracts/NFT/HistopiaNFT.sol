pragma solidity ^0.8.0;

import "./AttachableNFT.sol";

contract HistopiaNFT is AttachableERC721 {
    string public baseTokenURI;

    event Mint(address indexed to, uint256 indexed typeId, uint256 indexed tokenId, uint256[] properties);

    mapping(address => bool) public minters;

    constructor(string memory name_, string memory symbol_) AttachableERC721(name_, symbol_) {
        baseTokenURI =
            string(abi.encodePacked("https://api.histopia.io/nft/meta/", Strings.toString(block.chainid), "/"));
    }

    function mint(address to, uint256 typeIndex) public {
        require(minters[msg.sender], "Not a mint accessor");
        uint256[] memory powers = _mintAndSetProperties(to, typeIndex);
        emit Mint(to, typeIndex, latestTokenID - 1, powers);
    }

    function setMinter(address _minter, bool _allow) public onlyOwner {
        minters[_minter] = _allow;
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
