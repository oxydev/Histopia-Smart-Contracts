import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("FOE", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshopt in every test.
    async function deployEraAndNFT() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();
        const ERA = await ethers.getContractFactory("ERA");
        const era = await ERA.deploy();

        const NFT = await ethers.getContractFactory("AttachableERC721");
        const nft = await NFT.deploy("NFT", "NFT", era.address, 0);
        await nft.addType(
            "Histopian",
            30,
            100,
            ["speed", "strength", "intelligence", "charisma", "luck"],
            [10, 10, 10, 10, 10],
            [100, 100, 100, 100, 100],
        )
        for (let index = 0; index < 5; index++) {
            await nft.mint(owner.address, 0);
        }
        for (let index = 0; index < 5; index++) {
            await nft.mint(otherAccount.address, 0);
        }
        return { era, nft, owner, otherAccount };
    }

    async function deployFOE() {

        // Contracts are deployed using the first signer/account by default
        const {era, nft, owner, otherAccount} = await deployEraAndNFT();

        const FOE = await ethers.getContractFactory("FountainOfEra");
        const foe = await FOE.deploy(era.address, nft.address, 1000);

        return { era, nft, foe,  owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should set the right nft contract address", async function () {
            const { era, nft, foe,  owner, otherAccount  } = await loadFixture(deployFOE);

            expect(await nft.balanceOf(owner.address)).to.equal(5);
            expect(await nft.balanceOf(otherAccount.address)).to.equal(5);

            let nftPropertiesArr = [];
            for (let index = 1; index < 6; index++) {
                let nftProperties = await nft.getCumulativeTokenProperties(index)
                // console.log("nft Properties : ", index,  nftProperties)
                let nftPower = 0;
                for (let index = 0; index < nftProperties.length; index++) {
                    const element = nftProperties[index];
                    nftPower += Number(element);
                }
                nftPropertiesArr.push(nftPower);
            }
            // console.log("nftPropertiesArr : ", nftPropertiesArr)

            await nft.setApprovalForAll(foe.address, true);
            // await nft.setApprovalForAll(foe.address, true, {from: otherAccount.address});
            await foe.addHistopianType(0);
            await foe.deposit([1,2,3]);

            expect(await nft.balanceOf(owner.address)).to.equal(2);
            expect(await nft.balanceOf(foe.address)).to.equal(3);

            expect(await foe.era()).to.equal(era.address);
            expect(await foe.eraAllocator()).to.equal(era.address);

        });
    });

    describe("Deposit and withdraw", function () {
        it("Should set the deposit", async function () {
            const { era, nft, foe,  owner, otherAccount  } = await loadFixture(deployFOE);

            expect(await nft.balanceOf(owner.address)).to.equal(5);
            expect(await nft.balanceOf(otherAccount.address)).to.equal(5);

            let nftPropertiesArr = [];
            for (let index = 1; index < 6; index++) {
                let nftProperties = await nft.getCumulativeTokenProperties(index)
                // console.log("nft Properties : ", index,  nftProperties)
                let nftPower = 0;
                for (let index = 0; index < nftProperties.length; index++) {
                    const element = nftProperties[index];
                    nftPower += Number(element);
                }
                nftPropertiesArr.push(nftPower);
            }
            // console.log("nftPropertiesArr : ", nftPropertiesArr)
            let ownerTotalPower = nftPropertiesArr[0] + nftPropertiesArr[1] + nftPropertiesArr[2];
            await nft.setApprovalForAll(foe.address, true);
            await foe.addHistopianType(0);
            await foe.deposit([1,2,3]);

            expect(await nft.balanceOf(owner.address)).to.equal(2);
            expect(await nft.balanceOf(foe.address)).to.equal(3);

            expect(await foe.currentTotalMilitaryPower()).to.equal(ownerTotalPower);
            expect((await foe.userInfo(owner.address)).militaryPower).to.equal(ownerTotalPower);

            await nft.connect(otherAccount).setApprovalForAll(foe.address, true);
            await foe.connect(otherAccount).deposit([6,7,8]);
            let otherAccountTotalPower = 0
            for (let index = 6; index < 9; index++) {
                let nftPower = await await foe.calculateMilitaryPowerOfTokenId(index)
                // console.log("nft Properties : ", index,  nftProperties)

                otherAccountTotalPower += Number(nftPower);
            }

            expect(await foe.currentTotalMilitaryPower()).to.equal(ownerTotalPower + otherAccountTotalPower);
            expect(await (await foe.userInfo(otherAccount.address)).militaryPower).to.equal(otherAccountTotalPower);
        });

        it("Should set the deposit and withdraw correctly", async function () {
            const { era, nft, foe,  owner, otherAccount  } = await loadFixture(deployFOE);

            expect(await nft.balanceOf(owner.address)).to.equal(5);
            expect(await nft.balanceOf(otherAccount.address)).to.equal(5);

            let nftPropertiesArr = [];
            for (let index = 1; index < 6; index++) {
                let nftProperties = await nft.getCumulativeTokenProperties(index)
                // console.log("nft Properties : ", index,  nftProperties)
                let nftPower = 0;
                for (let index = 0; index < nftProperties.length; index++) {
                    const element = nftProperties[index];
                    nftPower += Number(element);
                }
                nftPropertiesArr.push(nftPower);
            }
            // console.log("nftPropertiesArr : ", nftPropertiesArr)
            let ownerTotalPower = nftPropertiesArr[0] + nftPropertiesArr[1] + nftPropertiesArr[2];
            await nft.setApprovalForAll(foe.address, true);
            await foe.addHistopianType(0);
            await foe.deposit([1,2,3]);

            expect(await nft.balanceOf(owner.address)).to.equal(2);
            expect(await nft.balanceOf(foe.address)).to.equal(3);

            expect(await foe.currentTotalMilitaryPower()).to.equal(ownerTotalPower);
            expect((await foe.userInfo(owner.address)).militaryPower).to.equal(ownerTotalPower);

            await nft.connect(otherAccount).setApprovalForAll(foe.address, true);
            await foe.connect(otherAccount).deposit([6,7,8,9,10]);
            let otherAccountTotalPower = 0
            for (let index = 6; index < 11; index++) {
                let nftPower = await await foe.calculateMilitaryPowerOfTokenId(index)
                // console.log("nft Properties : ", index,  nftProperties)

                otherAccountTotalPower += Number(nftPower);
            }

            expect(await foe.currentTotalMilitaryPower()).to.equal(ownerTotalPower + otherAccountTotalPower);
            expect((await foe.userInfo(otherAccount.address)).militaryPower).to.equal(otherAccountTotalPower);


            await foe.withdraw([0,1,2]);

            expect(await foe.currentTotalMilitaryPower()).to.equal(otherAccountTotalPower);
            expect((await foe.userInfo(owner.address)).militaryPower).to.equal(0);


            // console.log("otherAccount deposited NFTs : ", await foe.getTokenIds(otherAccount.address));
            await foe.connect(otherAccount).withdraw([1]);
            // console.log("otherAccount deposited NFTs : ", await foe.getTokenIds(otherAccount.address));
            await foe.connect(otherAccount).withdraw([3]);
            // console.log("otherAccount deposited NFTs : ", await foe.getTokenIds(otherAccount.address));
            await foe.connect(otherAccount).withdraw([0]);
            // console.log("otherAccount deposited NFTs : ", await foe.getTokenIds(otherAccount.address));
            otherAccountTotalPower = 0

            otherAccountTotalPower += Number(await foe.calculateMilitaryPowerOfTokenId(8));
            otherAccountTotalPower += Number(await foe.calculateMilitaryPowerOfTokenId(10));
            expect(await foe.currentTotalMilitaryPower()).to.equal(otherAccountTotalPower);
            expect((await foe.userInfo(otherAccount.address)).militaryPower).to.equal(otherAccountTotalPower);

        });
    });

    describe("Reward", function () {
        it("Should send the reward for one participant", async function () {
            const { era, nft, foe,  owner, otherAccount  } = await loadFixture(deployFOE);

            expect(await nft.balanceOf(owner.address)).to.equal(5);
            expect(await nft.balanceOf(otherAccount.address)).to.equal(5);

            let nftPropertiesArr = [];
            for (let index = 1; index < 6; index++) {
                let nftProperties = await nft.getCumulativeTokenProperties(index)
                // console.log("nft Properties : ", index,  nftProperties)
                let nftPower = 0;
                for (let index = 0; index < nftProperties.length; index++) {
                    const element = nftProperties[index];
                    nftPower += Number(element);
                }
                nftPropertiesArr.push(nftPower);
            }
            // console.log("nftPropertiesArr : ", nftPropertiesArr)
            let ownerTotalPower = nftPropertiesArr[0] + nftPropertiesArr[1] + nftPropertiesArr[2];
            await nft.setApprovalForAll(foe.address, true);
            await foe.addHistopianType(0);
            await foe.deposit([1,2,3]);

            let currentBlock = await time.latestBlock();

            expect(await nft.balanceOf(owner.address)).to.equal(2);
            expect(await nft.balanceOf(foe.address)).to.equal(3);

            expect(await foe.currentTotalMilitaryPower()).to.equal(ownerTotalPower);
            expect((await foe.userInfo(owner.address)).militaryPower).to.equal(ownerTotalPower);

            let currentTime = await time.latest()
            let calculatedReward = await foe.pendingERA(owner.address);
            expect(calculatedReward).to.equal(0);
            for (let index = 0; index < 100; index++) {
                await time.increaseTo(currentTime + 86400);
                currentTime = await time.latest();
            }
            let elapsedBlocks = await time.latestBlock() - currentBlock;
            calculatedReward = await foe.pendingERA(owner.address);
            expect(calculatedReward).to.equal(elapsedBlocks * 1000 - 1);
            await foe.withdraw([0,1,2]);
            expect(await foe.currentTotalMilitaryPower()).to.equal(0);
            elapsedBlocks = await time.latestBlock() - currentBlock;
            expect((await era.balanceOf(owner.address))).to.equal(elapsedBlocks * 1000 - 1);
        });

        it("Should set the deposit and withdraw the reward correctly for two participants", async function () {
            const { era, nft, foe,  owner, otherAccount  } = await loadFixture(deployFOE);

            expect(await nft.balanceOf(owner.address)).to.equal(5);
            expect(await nft.balanceOf(otherAccount.address)).to.equal(5);

            let nftPropertiesArr = [];
            for (let index = 1; index < 6; index++) {
                let nftProperties = await nft.getCumulativeTokenProperties(index)
                // console.log("nft Properties : ", index,  nftProperties)
                let nftPower = 0;
                for (let index = 0; index < nftProperties.length; index++) {
                    const element = nftProperties[index];
                    nftPower += Number(element);
                }
                nftPropertiesArr.push(nftPower);
            }
            // console.log("nftPropertiesArr : ", nftPropertiesArr)
            let ownerTotalPower = nftPropertiesArr[0] + nftPropertiesArr[1] + nftPropertiesArr[2];
            await nft.setApprovalForAll(foe.address, true);
            await foe.addHistopianType(0);
            await foe.deposit([1,2,3]);
            let currentBlock = await time.latestBlock();

            let currentTime = await time.latest()
            for (let index = 0; index < 100; index++) {
                await time.increaseTo(currentTime + 86400);
                currentTime = await time.latest();
            }

            let elapsedBlocks = await time.latestBlock() - currentBlock;
            let calculatedRewardPhase1 = Number(await foe.pendingERA(owner.address));
            expect(calculatedRewardPhase1).to.equal(elapsedBlocks * 1000 - 1);

            await nft.connect(otherAccount).setApprovalForAll(foe.address, true);
            await foe.connect(otherAccount).deposit([6,7,8,9,10]);

            elapsedBlocks = await time.latestBlock() - currentBlock;
            calculatedRewardPhase1 = Number(await foe.pendingERA(owner.address));
            expect(calculatedRewardPhase1).to.equal(elapsedBlocks * 1000 - 1);

            let otherAccountStartBlock = await time.latestBlock();
            let otherAccountTotalPower = Number((await foe.userInfo(otherAccount.address)).militaryPower);


            for (let index = 0; index < 100; index++) {
                await time.increaseTo(currentTime + 86400);
                currentTime = await time.latest();
            }

            console.log("elapsedBlocks : ", elapsedBlocks)
            elapsedBlocks = await time.latestBlock() - otherAccountStartBlock;
            let calculatedRewardPhase2owner = await foe.pendingERA(owner.address);
            let calculatedRewardPhase2other = await foe.pendingERA(otherAccount.address);
            // console.log("calculatedRewardPhase1owner : ", calculatedRewardPhase1);
            // console.log("owner power", (await foe.userInfo(owner.address)).militaryPower);
            // console.log("calculatedRewardPhase2owner : ", calculatedRewardPhase2owner);
            // console.log("other power", (await foe.userInfo(otherAccount.address)).militaryPower);
            // console.log("calculatedRewardPhase2other : ", calculatedRewardPhase2other);
            // console.log("elapsedBlocks : ", elapsedBlocks);
            // console.log("calculatedRewardPhase2other : ", (elapsedBlocks * 1000 * otherAccountTotalPower / (ownerTotalPower + otherAccountTotalPower)),
            // Math.round(elapsedBlocks * 1000 * otherAccountTotalPower / (ownerTotalPower + otherAccountTotalPower))
            // );

            expect(true).to.equal(Math.abs((elapsedBlocks * 1000 * otherAccountTotalPower / (ownerTotalPower + otherAccountTotalPower)) - calculatedRewardPhase2other.toNumber()) < 1);
            expect(calculatedRewardPhase2owner).to.equal(Math.ceil((elapsedBlocks * 1000 * ownerTotalPower / (ownerTotalPower + otherAccountTotalPower)) + calculatedRewardPhase1));
        });
    });


});
