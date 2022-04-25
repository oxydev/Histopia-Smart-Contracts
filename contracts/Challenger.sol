pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";

struct ChallengeInfo {
    uint256 startingTimestamp;
    uint256 rewardERA;
    uint256 duration;
    bytes32 answerHash;
    bool hasWinner;
}
contract Challenger is Ownable{
    ChallengeInfo public activeChallenge;
    uint256 public challengeRound;
    IERC20 public ERA;
    event NewChallenge(uint256 startingTimestamp, uint256 rewardERA, uint256 duration, uint256 indexed challengeRound, bytes32 answerHash);
    event ChallengeWinner(address winner, uint256 indexed challengeRound, string plainAnswer);

    constructor(IERC20 _ERA) {
        ERA = _ERA;
    }

    function addChallenge(uint256 startingTimestamp, uint256 rewardERA, uint256 duration, bytes32 answerHash) public onlyOwner{
        ERA.transferFrom(msg.sender, address(this), rewardERA);
        challengeRound++;
        activeChallenge = ChallengeInfo(startingTimestamp, rewardERA, duration, answerHash, false);
        emit NewChallenge(startingTimestamp, rewardERA, duration, challengeRound, answerHash);
    }

    function submit(string memory plainAnswer) public{
        require(keccak256(abi.encodePacked(plainAnswer)) == activeChallenge.answerHash, "Wrong Answer, Try Again Histopian:(");
        require(!activeChallenge.hasWinner, "Challenge Already Solved by another Histopia:(");
        require(activeChallenge.startingTimestamp + activeChallenge.duration > block.timestamp, "Challenge Expired:(");
        require(activeChallenge.startingTimestamp < block.timestamp, "Challenge Not Started:(");

        activeChallenge.hasWinner = true;
        ERA.transferFrom(address(this), msg.sender, activeChallenge.rewardERA);
        emit ChallengeWinner(msg.sender, challengeRound, plainAnswer);

    }

  
}
