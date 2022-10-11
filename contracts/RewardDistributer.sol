pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "./ERA.sol";

struct Reward {
    uint256 amount;
    uint256 timeInterval;
    bool isActive;
}

struct RewardData {
    uint256 lastRewardTime;
    uint256 nonce;
}

contract RewardDistributor is Ownable, EIP712 {
    ERA public eraContract;
    address public rewardAttester;
    Reward[] public rewardsTypes;
    mapping(address => mapping(uint256 => RewardData)) public rewardData;

    bytes32 hashDataStructure = keccak256("distributeReward(address user,uint256 rewardId,uint256 nonce,uint256 rewardTime)");

    constructor(address _eraContract, address _rewardAttester) EIP712("RewardDistributor", "1") {
        eraContract = ERA(_eraContract);
        rewardAttester = _rewardAttester;
    }

    function addReward(uint256 _amount, uint256 _timeInterval) public onlyOwner {
        rewardsTypes.push(Reward(_amount, _timeInterval, true));
    }

    function changeRewardAttester(address _rewardAttester) public onlyOwner {
        rewardAttester = _rewardAttester;
    }

    function changeRewardStatus(uint256 _rewardId, bool _isActive) public onlyOwner {
        rewardsTypes[_rewardId].isActive = _isActive;
    }

    function changeRewardAmount(uint256 _rewardId, uint256 _amount) public onlyOwner {
        rewardsTypes[_rewardId].amount = _amount;
    }

    function changeRewardTimeInterval(uint256 _rewardId, uint256 _timeInterval) public onlyOwner {
        rewardsTypes[_rewardId].timeInterval = _timeInterval;
    }

    function getNonce(address user, uint256 rewardId) public view returns (uint256) {
        return rewardData[user][rewardId].nonce;
    }

    function distributeReward(uint256 _rewardId, address _user, uint256 time,uint8 v, bytes32 r, bytes32 s) public {
        require(msg.sender == rewardAttester, "Not a reward attester");
        require(rewardsTypes[_rewardId].isActive, "Reward is not active");
        require(rewardData[_user][_rewardId].lastRewardTime + rewardsTypes[_rewardId].timeInterval <= time, "Reward is not ready yet");
        rewardData[_user][_rewardId].lastRewardTime = time;
        require(verifySign(_rewardId,_user, time, v, r, s), "Invalid signature");

        eraContract.mint(_user, rewardsTypes[_rewardId].amount);
    }

    function verifySign (uint256 _rewardId, address _user, uint256 time,uint8 v, bytes32 r, bytes32 s) public returns (bool) {
        bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
                hashDataStructure,
                _user,
                _rewardId,
                rewardData[_user][_rewardId].nonce,
                time
            )));
        address signer = ECDSA.recover(digest, v, r, s);
        require(signer == rewardAttester, "distributeReward: invalid signature");
        require(signer != address(0), "ECDSA: invalid signature");

        rewardData[_user][_rewardId].nonce++;

        return true;
    }

    function getDomainSeparator() public view returns (bytes32) {
        return _domainSeparatorV4();
    }
}
