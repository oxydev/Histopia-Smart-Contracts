// SPDX-License-Identifier: MIT

pragma solidity 0.8.1;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface INFT {
    function getCumulativeTokenProperties(uint256) external view returns (uint256[] calldata);

    function transferFrom(address sender, address recipient, uint256 tokenId) external returns (bool);

    function tokenIdToTypeIndex(uint256 tokenId) external returns (uint256);

}
interface Allocator{
    function withdrawShare(address dest, uint256 amount) external;
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
        //   1. The pool's `accEraPerShare` (and `lastRewardBlock`) gets updated.
        //   2. User receives the pending reward sent to his/her address.
        //   3. User's `militaryPower` gets updated.
        //   4. User's `rewardDebt` gets updated.
    }
    // Info of each pool.
    INFT public nftContract; // Address of LP token contract.
    Allocator public eraAllocator;
    IERC20 public era;
    uint256 public eraPerBlock;

    uint256 lastRewardBlock; // Last block number that ERAs distribution occurs.
    uint256 generalAccEraPerShare; // Accumulated ERAs per share, times 1e12. See below.
    uint256 lastBlock;
    uint256 currentMilitaryRate;



    // Info of each user that stakes LP tokens.
    mapping(address => UserInfo) public userInfo;
    mapping(uint256 => bool) public histopianTypes;


    event Deposit(address indexed user, uint256[] tokenIds);
    event Withdraw(address indexed user, uint256 tokenId);
    event EmergencyWithdraw(
        address indexed user,
        uint256[] tokenIds
    );

    constructor() {
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
    // function add(
    //     IERC20 _lpToken,
    //     bool _withUpdate,
    //     uint256 startBlock,
    //     uint256 lastBlock
    // ) public onlyOwner {
    //     if (_withUpdate) {
    //         massUpdatePools();
    //     }
    //     poolInfo.push(
    //         PoolInfo({
    //             lastRewardBlock: startBlock,
    //             accEraPerShare: 0,
    //             lastBlock: lastBlock,
    //             currentMilitaryRate: 0
    //         })
    //     );
    // }


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
        uint256 militaryRate = currentMilitaryRate;
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
        uint256 militaryRate = currentMilitaryRate;
        if (militaryRate == 0) {
            lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = getMultiplier(lastRewardBlock, block.number);
        uint256 eraReward = multiplier - eraPerBlock;
        eraAllocator.withdrawShare(address(this), eraReward);
        generalAccEraPerShare += eraReward * 1e12 / militaryRate;
        lastRewardBlock = block.number;
    }

    // Deposit NFT tokens to FOE for Era allocation.
    function deposit(uint256[] calldata tokenIds) public {
        UserInfo storage user = userInfo[msg.sender];
        updatePool();
        if (user.militaryPower > 0) {
            uint256 pending = (user.militaryPower * generalAccEraPerShare / 1e12) - user.rewardDebt;
            safeERATransfer(msg.sender, pending);
        }
        for (uint256 index = 0; index < tokenIds.length; index++) {
            require(histopianTypes[nftContract.tokenIdToTypeIndex(tokenIds[index])], "Your NFT is not Histopian!.");
            nftContract.transferFrom(msg.sender, address(this), tokenIds[index]);
            user.militaryPower += calculateMilitaryPower(nftContract.getCumulativeTokenProperties(tokenIds[index]));
            user.tokenIDs.push(tokenIds[index]);
        }

        user.rewardDebt = user.militaryPower * generalAccEraPerShare / 1e12;
        emit Deposit(msg.sender, tokenIds);
    }

    function calculateMilitaryPower(uint256[] memory properties) internal pure returns (uint256) {
        // TODO: calculate military power based on NFT properties
        return 10;
    }

    // Withdraw LP tokens from MasterChef.
    function withdraw(uint256[] calldata tokenIndices) public {
        UserInfo storage user = userInfo[msg.sender];
        updatePool();
        uint256 pending = (user.militaryPower * generalAccEraPerShare / 1e12 ) - user.rewardDebt;
        safeERATransfer(msg.sender, pending);

        for (uint256 index = 0; index < tokenIndices.length; index++) {
            emit Withdraw(msg.sender, user.tokenIDs[tokenIndices[index]]);
            nftContract.transferFrom(address(this), msg.sender, user.tokenIDs[tokenIndices[index]]);
            user.militaryPower -= calculateMilitaryPower(nftContract.getCumulativeTokenProperties(user.tokenIDs[tokenIndices[index]]));
            user.tokenIDs[tokenIndices[index]] = user.tokenIDs[user.tokenIDs.length - 1];
            delete user.tokenIDs[user.tokenIDs.length - 1];
            user.tokenIDs.pop();
        }
        user.rewardDebt = user.militaryPower * generalAccEraPerShare / 1e12;
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw() public {
        UserInfo storage user = userInfo[msg.sender];
        for (uint256 index = 0; index < user.tokenIDs.length; index++) {
            nftContract.transferFrom(address(this), msg.sender, user.tokenIDs[index]);
        }
        emit EmergencyWithdraw(msg.sender, user.tokenIDs);
        delete user.tokenIDs ;
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
}
