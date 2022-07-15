// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface INFT {
    /**
     * @dev Returns the amount of tokens in existence.
     */

    function getCumulativeTokenProperties(uint256) external view returns (uint256[]);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 tokenId) external returns (bool);

}
interface Allocator{
    function withdrawShare(address dest, uint256 amount) external;

}
// MasterChef is the master of Sushi. He can make Sushi and he is a fair guy.
//
// Note that it's ownable and the owner wields tremendous power. The ownership
// will be transferred to a governance smart contract once SUSHI is sufficiently
// distributed and the community can show to govern itself.
//
// Have fun reading it. Hopefully it's bug-free. God bless.
contract MasterChef is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    // Info of each user.
    struct UserInfo {
        uint256 amount; // How many LP tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
        uint256[] tokenIDs;
        //
        // We do some fancy math here. Basically, any point in time, the amount of SUSHIs
        // entitled to a user but is pending to be distributed is:
        //
        //   pending reward = (user.amount * pool.accSushiPerShare) - user.rewardDebt
        //
        // Whenever a user deposits or withdraws LP tokens to a pool. Here's what happens:
        //   1. The pool's `accSushiPerShare` (and `lastRewardBlock`) gets updated.
        //   2. User receives the pending reward sent to his/her address.
        //   3. User's `amount` gets updated.
        //   4. User's `rewardDebt` gets updated.
    }
    // Info of each pool.
    INFT public nftContract; // Address of LP token contract.
    Allocator public eraAllocator;
    IERC20 public era;

    struct PoolInfo {
        uint256 lastRewardBlock; // Last block number that SUSHIs distribution occurs.
        uint256 accSushiPerShare; // Accumulated SUSHIs per share, times 1e12. See below.
        uint256 lastBlock;
        uint256 currentMilitaryRate;
    }


    // Info of each pool.
    PoolInfo[] public poolInfo;


    // Info of each user that stakes LP tokens.
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;
    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event EmergencyWithdraw(
        address indexed user,
        uint256 indexed pid,
        uint256 amount
    );

    constructor() public {
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }
    function setNFTContract(INFT _nft) public onlyOwner{
        nftContract = _nft;
    }

    function setEraAllocator(Allocator _alloc) public onlyOwner{
        eraAllocator = _alloc;
    }
    function setERA(IERC20 _era) public onlyOwner{
        era = _era;
    }
    // Add a new lp to the pool. Can only be called by the owner.
    // XXX DO NOT add the same LP token more than once. Rewards will be messed up if you do.
    function add(
        IERC20 _lpToken,
        bool _withUpdate,
        uint256 startBlock,
        uint256 lastBlock
    ) public onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        poolInfo.push(
            PoolInfo({
                lastRewardBlock: startBlock,
                accSushiPerShare: 0,
                lastBlock: lastBlock,
                currentMilitaryRate: 0
            })
        );
    }


    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to)
        public
        view
        returns (uint256)
    {
        return _to.sub(_from);
    }

    // View function to see pending SUSHIs on frontend.
    function pendingERA(uint256 _pid, address _user)
        external
        view
        returns (uint256)
    {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 accSushiPerShare = pool.accSushiPerShare;
        uint256 lpSupply = pool.currentMilitaryRate;
        if (block.number > pool.lastRewardBlock && lpSupply != 0) {
            uint256 multiplier =
                getMultiplier(pool.lastRewardBlock, block.number);
            uint256 sushiReward = multiplier.mul(sushiPerBlock);
            accSushiPerShare = accSushiPerShare.add(
                sushiReward.mul(1e12).div(lpSupply)
            );
        }
        return user.amount.mul(accSushiPerShare).div(1e12).sub(user.rewardDebt);
    }

    // Update reward vairables for all pools. Be careful of gas spending!
    function massUpdatePools() public {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        if (block.number <= pool.lastRewardBlock) {
            return;
        }
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        uint256 sushiReward = multiplier.mul(sushiPerBlock);
        eraAllocator.withdrawShare(address(this), sushiReward);
        pool.accSushiPerShare = pool.accSushiPerShare.add(
            sushiReward.mul(1e12).div(lpSupply)
        );
        pool.lastRewardBlock = block.number;
    }

    // Deposit LP tokens to MasterChef for SUSHI allocation.
    function deposit(uint256 _pid, uint256[] tokenIds) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);
        if (user.amount > 0) {
            uint256 pending =
                user.amount.mul(pool.accSushiPerShare).div(1e12).sub(
                    user.rewardDebt
                );
            safeERATransfer(msg.sender, pending);
        }
        _recalculateCharactrestsicsValues(_pid);
        for (uint256 index = 0; index < tokenIds.length; index++) {
            nftContract.transferFrom(msg.sender, address(this), tokenIds[index]);
            user.amount.add(nftContract.getCumulativeTokenProperties(tokenIds[index]));
            user.tokenIDs.push(tokenIds[index]);
        }

        user.rewardDebt = user.amount.mul(pool.accSushiPerShare).div(1e12);
        emit Deposit(msg.sender, _pid, tokenIds);
    }

    // Withdraw LP tokens from MasterChef.
    function withdraw(uint256 _pid, uint256[] tokenIds) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);
        uint256 pending =
            user.amount.mul(pool.accSushiPerShare).div(1e12).sub(
                user.rewardDebt
            );
        safeERATransfer(msg.sender, pending);
        _recalculateCharactrestsicsValues(_pid);

        for (uint256 index = 0; index < tokenIds.length; index++) {
            nftContract.transferFrom(address(this), msg.sender, tokenIds[index]);
            user.amount.sub(nftContract.getCumulativeTokenProperties(tokenIds[index]));
            uint256 indexOf = _findIndex(user.tokenIDs, tokenIds[index]);
            user.tokenIDs[indexOf] = user.tokenIDs[user.tokenIDs.length - 1];
            delete user.tokenIDs[user.tokenIDs.length - 1];
            user.tokenIDs.length--;
        }
        user.rewardDebt = user.amount.mul(pool.accSushiPerShare).div(1e12);
        emit Withdraw(msg.sender, _pid, tokenIds);
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(uint256 _pid, uint256[] tokenIds) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        for (uint256 index = 0; index < tokenIds.length; index++) {
            nftContract.transferFrom(address(this), msg.sender, tokenIds[index]);
        }
        emit EmergencyWithdraw(msg.sender, _pid, user.amount);
        user.amount = 0;
        user.rewardDebt = 0;
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

    function _recalculateCharactrestsicsValues(uint256 _pid) internal {
        UserInfo storage user = userInfo[_pid][msg.sender];
        uint256 amount;
        for (uint256 index = 0; index < user.tokenIDs.length; index++) {
            amount.add(nftContract.getCumulativeTokenProperties(user.tokenIDs[index]));
        }
        user.amount = amount;
    }

    function _findIndex(uint256[] memory tokenIDs, uint256 tokenID) private returns (uint256)  {
        for (uint256 index = 0; index < tokenIDs.length; index++) {
            if (tokenIDs[index] == tokenID) {
                return index;
            }
        }
        revert("Token not found");
    }
}
