pragma solidity ^0.8.0;

import "../ERA.sol";

contract BridgeERA {
    uint256 public MINIMUM_THRESHOLD = 10 ** 18; // 1 ERA
    address public feeCollector;
    ERA public ERAContract;
    event Locked(uint256 amount, address from,  string to, uint256 indexed destChain);

    constructor(ERA _ERA, address _feeCollector) {
        ERAContract = _ERA;
        feeCollector = _feeCollector;
    }

    // Locks ERA tokens in the contract and backend mints ERA token on the other chain
    function lock(uint256 amount, string calldata to, uint256 destChain) public {
        require(amount > MINIMUM_THRESHOLD, "Amount must be greater than Minimum Threshold");
        ERAContract.burn(msg.sender, amount * 99 / 100);
        ERAContract.transferFrom(msg.sender,feeCollector, amount / 100);
        emit Locked(amount * 99 / 100,msg.sender, to, destChain);
    }
}
