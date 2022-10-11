// SPDX-License-Identifier: MIT
pragma solidity 0.8.1;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface INFT {
    function mint(address to, uint256 typeIndex) external;

}

contract MultiMintSapphire {
    using SafeERC20 for IERC20;

    IERC20 public era;
    INFT public nft;
    uint256 MAX_INT = 2**256 - 1;


    constructor(INFT _nft, IERC20 _era) {
        nft = _nft;
        era = _era;
        era.approve(address(nft), MAX_INT);
    }

    function mint(uint256 count, address to, uint256 typeIndex) public {
        era.safeTransferFrom(msg.sender, address(this), count * 2500 * 10 ** 18);
        for (uint256 i = 0; i < count; i++) {
            nft.mint(to, typeIndex);
        }
    }
}
