import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {expect} from "chai";
import {ethers} from "hardhat";

describe("FOE", function () {

    async function deployEraAndRewardDistributor() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount, otherOtherAccount] = await ethers.getSigners();
        const ERA = await ethers.getContractFactory("ERA");
        const era = await ERA.deploy();

        await era.deployed();

        const RewardDistributor = await ethers.getContractFactory("RewardDistributor");
        const rewardDistributor = await RewardDistributor.deploy(era.address, otherAccount.address);

        await rewardDistributor.deployed();
        await era.changeMintAccessor(rewardDistributor.address, true);
        return {era, rewardDistributor, owner, otherAccount, otherOtherAccount};
    }
    describe("Deployment", function () {

        it("Should distribute rewards", async function () {
            const {era, rewardDistributor, owner, otherAccount, otherOtherAccount} = await loadFixture(deployEraAndRewardDistributor);
            await rewardDistributor.addReward(100, 100000)

            let chainId = await owner.getChainId();
            console.log("chainId", chainId);
            let domaain = {
                name: 'RewardDistributor',
                version: '1',
                chainId: chainId,
                verifyingContract: rewardDistributor.address,
            }
            let nonce = await rewardDistributor.getNonce(otherOtherAccount.address, 0);

            let types = {
                distributeReward: [
                    {name: 'user', type: 'address'},
                    {name: 'rewardId', type: 'uint256'},
                    {name: 'nonce', type: 'uint256'},
                    {name: 'rewardTime', type: 'uint256'},
                ]
            }

            let values = {
                user: otherOtherAccount.address,
                rewardId: 0,
                nonce: nonce.toNumber(),
                rewardTime: 100000,
            }

            console.log("values", values);

            const sig = await otherAccount._signTypedData(
                domaain,
                types,
                values
            );

            const r = '0x' + sig.substring(2).substring(0, 64);
            const s = '0x' + sig.substring(2).substring(64, 128);
            const v = '0x' + sig.substring(2).substring(128, 130);

            console.log("sign", r, s, v, otherAccount.address);

            await rewardDistributor.connect(otherAccount).distributeReward(0, otherOtherAccount.address, 100000, v, r, s);
            let balance = await era.balanceOf(otherOtherAccount.address)
            expect(balance).to.equal(100);

            // await rewardDistributor.connect(otherAccount).distributeReward(0, owner.address, 100000, v, r, s);
            // balance = await era.balanceOf(otherOtherAccount.address)
            // expect(balance).to.equal(100);
        })
    })
})
