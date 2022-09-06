// SPDX-License-Identifier: MIT

pragma solidity 0.8.1;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface INFT {
    function getTokenProperties(uint256) external view returns (uint256[] calldata);

    function transferFrom(address sender, address recipient, uint256 tokenId) external;

    function tokenIdToTypeIndex(uint256 tokenId) external returns (uint256);

}
interface Allocator{
    function withdrawShare(address dest, uint256 amount) external;
    function getEraContractAddress() external returns (address);
}
// Fountain of ERA
//
// Note that it's ownable and the owner wields tremendous power. The ownership
// will be transferred to a governance smart contract once ERA is sufficiently
// distributed and the community can show to govern itself.
//
contract FountainOfEra is Ownable {
    using SafeERC20 for IERC20;
    // Info of each user.
    struct UserInfo {
        uint256 militaryPower; // How many LP tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
        uint256[] tokenIDs;
        //
        // We do some fancy math here. Basically, any point in time, the amount of ERAs
        // entitled to a user but is pending to be distributed is:
        //
        //   pending reward = (user.militaryPower * generalAccEraPerShare) - user.rewardDebt
        //
        // Whenever a user deposits or withdraws LP tokens to a pool. Here's what happens:
        //   1. The `accEraPerShare` (and `lastRewardBlock`) gets updated.
        //   2. User receives the pending reward sent to his/her address.
        //   3. User's `militaryPower` gets updated.
        //   4. User's `rewardDebt` gets updated.
    }
    // Info of each pool.
    INFT public nftContract; // Address of NFT token contract.
    Allocator public eraAllocator;
    IERC20 public era;
    uint256 public eraPerBlock;

    uint256 public lastRewardBlock; // Last block number that ERAs distribution occurs.
    uint256 public generalAccEraPerShare; // Accumulated ERAs per share, times 1e12. See below.
    uint256 public lastBlock;
    uint256 public currentTotalMilitaryPower;
    uint256 public histopianCount;


    // Info of each user that stakes NFT tokens.
    mapping(address => UserInfo) public userInfo;
    mapping(uint256 => bool) public histopianTypes;


    event Deposit(address indexed user, uint256[] tokenIds, uint256 userMilitaryPower, uint256 totalMilitaryPower, uint256 timestamp);
    event Withdraw(address indexed user, uint256[] tokenIds, uint256 userMilitaryPower, uint256 totalMilitaryPower, uint256 timestamp);
    event EmergencyWithdraw(
        address indexed user,
        uint256[] tokenIds
    );
    event Harvest(address indexed user, uint256 amount);
    event ChangeEraPerBlock(uint256 oldAmount, uint256 newAmount);

    constructor(address _eraAllocatorAddress, address _histopiaNFT, uint256 _eraPerBlock) {
        eraAllocator = Allocator(_eraAllocatorAddress);
        eraPerBlock = _eraPerBlock;
        era = IERC20(eraAllocator.getEraContractAddress());
        nftContract = INFT(_histopiaNFT);
        emit ChangeEraPerBlock(0, eraPerBlock);
    }

    function addHistopianType(uint256 typeId) public onlyOwner{
        histopianTypes[typeId] = true;
    }


    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to)
        public
        pure
        returns (uint256)
    {
        return _to - _from;
    }

    // View function to see pending Eras on frontend.
    function pendingERA(address _user)
        external
        view
        returns (uint256)
    {
        UserInfo storage user = userInfo[_user];
        uint256 accEraPerShare = generalAccEraPerShare;
        uint256 militaryRate = currentTotalMilitaryPower;
        if (block.number > lastRewardBlock && militaryRate != 0) {
            uint256 multiplier =
                getMultiplier(lastRewardBlock, block.number);
            uint256 eraReward = multiplier * eraPerBlock;
            accEraPerShare += (eraReward * 1e12) / militaryRate;
        }
        return ((user.militaryPower * accEraPerShare) / 1e12) - user.rewardDebt;
    }

    // Update reward variables o be up-to-date.
    function updatePool() public {
        if (block.number <= lastRewardBlock) {
            return;
        }
        if (currentTotalMilitaryPower == 0) {
            lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = getMultiplier(lastRewardBlock, block.number);
        uint256 eraReward = multiplier * eraPerBlock;
        eraAllocator.withdrawShare(address(this), eraReward);
        generalAccEraPerShare += eraReward * 1e12 / currentTotalMilitaryPower;
        lastRewardBlock = block.number;
    }

    // Deposit NFT tokens to FOE for Era allocation.
    function deposit(uint256[] calldata tokenIds) public {
        UserInfo storage user = userInfo[msg.sender];
        updatePool();
        if (user.militaryPower > 0) {
            uint256 pending = (user.militaryPower * generalAccEraPerShare / 1e12) - user.rewardDebt;
            safeERATransfer(msg.sender, pending);
            emit Harvest(msg.sender, pending);
        }
        histopianCount += tokenIds.length;
        uint256 militaryPowerIncrement = 0;
        for (uint256 index = 0; index < tokenIds.length; index++) {
            require(histopianTypes[nftContract.tokenIdToTypeIndex(tokenIds[index])], "FOE: Your NFT is not Histopian!.");
            nftContract.transferFrom(msg.sender, address(this), tokenIds[index]);

            militaryPowerIncrement += calculateMilitaryPowerOfTokenId(tokenIds[index]);

            user.tokenIDs.push(tokenIds[index]);
        }
        user.militaryPower += militaryPowerIncrement;
        currentTotalMilitaryPower += militaryPowerIncrement;
        user.rewardDebt = user.militaryPower * generalAccEraPerShare / 1e12;
        emit Deposit(msg.sender, tokenIds, user.militaryPower, currentTotalMilitaryPower, block.timestamp);
    }

    function calculateMilitaryPowerOfTokenId(uint256 tokenId) public view returns (uint256 ) {
        return calculateMilitaryPower(nftContract.getTokenProperties(tokenId));
    }

    function calculateMilitaryPower(uint256[] memory properties) public pure returns (uint256 militaryPower) {
        for (uint256 i = 0; i < properties.length; i++) {
            militaryPower += properties[i];
        }
        return militaryPower;
    }

    // Withdraw LP tokens from MasterChef.
    function withdraw(uint256[] calldata tokenIndices) public {
        UserInfo storage user = userInfo[msg.sender];
        updatePool();
        uint256 pending = (user.militaryPower * generalAccEraPerShare / 1e12 ) - user.rewardDebt;
        safeERATransfer(msg.sender, pending);
        emit Harvest(msg.sender, pending);
        histopianCount -= tokenIndices.length;
        uint256 militaryPowerDecrement;
        uint256[] memory tokenIds = new uint256[](tokenIndices.length);
        for (uint256 index = 0; index < tokenIndices.length; index++) {
            require(tokenIndices[index] < user.tokenIDs.length, "FOE: Invalid token index");
            tokenIds[index] = user.tokenIDs[tokenIndices[index]];
            nftContract.transferFrom(address(this), msg.sender, user.tokenIDs[tokenIndices[index]]);
            militaryPowerDecrement += calculateMilitaryPowerOfTokenId(user.tokenIDs[tokenIndices[index]]);
            user.tokenIDs[tokenIndices[index]] = 0;
        }
        user.militaryPower -= militaryPowerDecrement;
        currentTotalMilitaryPower -= militaryPowerDecrement;
        emit Withdraw(msg.sender, tokenIds, user.militaryPower, currentTotalMilitaryPower, block.timestamp);

        for (uint256 index = tokenIndices.length; index > 0; index--) {
            uint256 j = index - 1;

//            console.log("index", tokenIndices[j], user.tokenIDs.length, j);
//
//            for (uint256 p = 0; p < user.tokenIDs.length; p++) {
//                console.log("user.tokenIDs ", user.tokenIDs[p]);
//            }
            if(tokenIndices[j] > user.tokenIDs.length - 1)
                continue;
            uint256 t = 0;
            while (t == 0 && user.tokenIDs.length > 0) {
                t = user.tokenIDs[user.tokenIDs.length - 1];
                if (t == 0) {
                    user.tokenIDs.pop();
                }
            }
            if (user.tokenIDs.length == 0) {
                break;
            }
            if (tokenIndices[j] == user.tokenIDs.length - 1) {
                user.tokenIDs.pop();
            } else if (tokenIndices[j] < user.tokenIDs.length - 1) {
                user.tokenIDs[tokenIndices[j]] = t;
                user.tokenIDs.pop();
            }
        }
        user.rewardDebt = user.militaryPower * generalAccEraPerShare / 1e12;
    }

    // Withdraw LP tokens from MasterChef.
    function harvest() public {
        UserInfo storage user = userInfo[msg.sender];
        updatePool();
        uint256 pending = (user.militaryPower * generalAccEraPerShare / 1e12 ) - user.rewardDebt;
        safeERATransfer(msg.sender, pending);
        emit Harvest(msg.sender, pending);
        user.rewardDebt = user.militaryPower * generalAccEraPerShare / 1e12;
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw() public {
        UserInfo storage user = userInfo[msg.sender];
        for (uint256 index = 0; index < user.tokenIDs.length; index++) {
            nftContract.transferFrom(address(this), msg.sender, user.tokenIDs[index]);
        }
        emit EmergencyWithdraw(msg.sender, user.tokenIDs);
        histopianCount -= user.tokenIDs.length;
        delete user.tokenIDs;
        currentTotalMilitaryPower -= user.militaryPower;
        user.rewardDebt = 0;
        user.militaryPower = 0;
    }

    // Safe ERA transfer function, just in case if rounding error causes pool to not have enough ERAs.
    function safeERATransfer(address _to, uint256 _amount) internal {
        uint256 eraBal = era.balanceOf(address(this));
        if (_amount > eraBal) {
            era.transfer(_to, eraBal);
        } else {
            era.transfer(_to, _amount);
        }
    }

    function getTokenIds(address user) public view returns (uint256[] memory) {
        return userInfo[user].tokenIDs;
    }
}
