pragma solidity ^0.8.0;

import "../ERA.sol";

contract BridgeERA {
    uint256 public MINIMUM_THRESHOLD = 10 ** 18; // 1 ERA
    IERC20 public ERA;
    event Locked(uint256 amount, address indexed to, uint256 indexed destChain);

    constructor(IERC20 _ERA) {
        ERA = _ERA;
    }

    // Locks ERA tokens in the contract and backend mints ERA token on the other chain
    function lock(uint256 amount, address to, uint256 destChain) public {
        require(amount > MINIMUM_THRESHOLD, "Amount must be greater than Minimum Threshold");
        ERA.burn(msg.sender, amount);
        emit Locked(amount, to, destChain);
    }
}
