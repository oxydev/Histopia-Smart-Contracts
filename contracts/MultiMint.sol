// SPDX-License-Identifier: MIT
pragma solidity 0.8.1;

interface INFT {
    function mint(address to, uint256 typeIndex) public;

}

contract MultiMint {
    INFT public nft;

    constructor(INFT _nft) {
        nft = _nft;
    }

    function mint(uint256 count, address to, uint256 typeIndex) public {
        for (uint256 i = 0; i < count; i++) {
            nft.mint(to, typeIndex);
        }
    }
}
