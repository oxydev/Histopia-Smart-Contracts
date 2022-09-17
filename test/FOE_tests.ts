import {time, loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {anyValue} from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import {expect} from "chai";
import {ethers} from "hardhat";

describe("FOE", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshopt in every test.
    async function deployEraAndNFT() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();
        const ERA = await ethers.getContractFactory("ERA");
        const era = await ERA.deploy();

        const NFT = await ethers.getContractFactory("HistopiaNFT");
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

        return {era, nft, owner, otherAccount};
    }

    async function deployFOE() {

        // Contracts are deployed using the first signer/account by default
        const {era, nft, owner, otherAccount} = await deployEraAndNFT();

        const FOE = await ethers.getContractFactory("FountainOfEra");
        const foe = await FOE.deploy(era.address, nft.address, 1000);
        await foe.addHistopianType(0);

        return {era, nft, foe, owner, otherAccount};
    }

    describe("Deployment", function () {
        it("Should set the right nft contract address", async function () {
            const {era, nft, foe, owner, otherAccount} = await loadFixture(deployFOE);
            for (let index = 0; index < 5; index++) {
                await nft.mint(otherAccount.address, 0);
            }
            expect(await nft.balanceOf(owner.address)).to.equal(5);
            expect(await nft.balanceOf(otherAccount.address)).to.equal(5);

            let nftPropertiesArr = [];
            for (let index = 1; index < 6; index++) {
                let nftProperties = await nft.getTokenProperties(index)
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
            await foe.deposit([1, 2, 3]);

            expect(await nft.balanceOf(owner.address)).to.equal(2);
            expect(await nft.balanceOf(foe.address)).to.equal(3);

            expect(await foe.era()).to.equal(era.address);
            expect(await foe.eraAllocator()).to.equal(era.address);

        });
    });

    describe("Deposit and withdraw", function () {
        it("Should set the deposit", async function () {
            const {era, nft, foe, owner, otherAccount} = await loadFixture(deployFOE);
            for (let index = 0; index < 5; index++) {
                await nft.mint(otherAccount.address, 0);
            }
            expect(await nft.balanceOf(owner.address)).to.equal(5);
            expect(await nft.balanceOf(otherAccount.address)).to.equal(5);

            let nftPropertiesArr = [];
            for (let index = 1; index < 6; index++) {
                let nftProperties = await nft.getTokenProperties(index)
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
            await foe.deposit([1, 2, 3]);

            expect(await nft.balanceOf(owner.address)).to.equal(2);
            expect(await nft.balanceOf(foe.address)).to.equal(3);

            expect(await foe.currentTotalMilitaryPower()).to.equal(ownerTotalPower);
            expect((await foe.userInfo(owner.address)).militaryPower).to.equal(ownerTotalPower);

            await nft.connect(otherAccount).setApprovalForAll(foe.address, true);
            await foe.connect(otherAccount).deposit([6, 7, 8]);
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
            const {era, nft, foe, owner, otherAccount} = await loadFixture(deployFOE);
            for (let index = 0; index < 5; index++) {
                await nft.mint(otherAccount.address, 0);
            }
            expect(await nft.balanceOf(owner.address)).to.equal(5);
            expect(await nft.balanceOf(otherAccount.address)).to.equal(5);

            let nftPropertiesArr = [];
            for (let index = 1; index < 6; index++) {
                let nftProperties = await nft.getTokenProperties(index)
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
            await foe.deposit([1, 2, 3]);

            expect(await nft.balanceOf(owner.address)).to.equal(2);
            expect(await nft.balanceOf(foe.address)).to.equal(3);

            expect(await foe.currentTotalMilitaryPower()).to.equal(ownerTotalPower);
            expect((await foe.userInfo(owner.address)).militaryPower).to.equal(ownerTotalPower);

            await nft.connect(otherAccount).setApprovalForAll(foe.address, true);
            await foe.connect(otherAccount).deposit([6, 7, 8, 9, 10]);
            let otherAccountTotalPower = 0
            for (let index = 6; index < 11; index++) {
                let nftPower = await await foe.calculateMilitaryPowerOfTokenId(index)
                // console.log("nft Properties : ", index,  nftProperties)

                otherAccountTotalPower += Number(nftPower);
            }

            expect(await foe.currentTotalMilitaryPower()).to.equal(ownerTotalPower + otherAccountTotalPower);
            expect((await foe.userInfo(otherAccount.address)).militaryPower).to.equal(otherAccountTotalPower);


            await foe.withdraw([0, 1, 2]);

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

        it("Should set the deposit and withdraw correctly", async function () {
            const {era, nft, foe, owner, otherAccount} = await loadFixture(deployFOE);
            for (let index = 0; index < 5; index++) {
                await nft.mint(otherAccount.address, 0);
            }
            expect(await nft.balanceOf(owner.address)).to.equal(5);
            expect(await nft.balanceOf(otherAccount.address)).to.equal(5);

            let nftPropertiesArr = [];
            for (let index = 1; index < 6; index++) {
                let nftProperties = await nft.getTokenProperties(index)
                // console.log("nft Properties : ", index,  nftProperties)
                let nftPower = 0;
                for (let index = 0; index < nftProperties.length; index++) {
                    const element = nftProperties[index];
                    nftPower += Number(element);
                }
                nftPropertiesArr.push(nftPower);
            }
            // console.log("nftPropertiesArr : ", nftPropertiesArr)
            let ownerTotalPower = nftPropertiesArr[0] + nftPropertiesArr[1] + nftPropertiesArr[2] + nftPropertiesArr[3];
            await nft.setApprovalForAll(foe.address, true);
            await foe.addHistopianType(0);
            await foe.deposit([3, 4, 1, 2]);

            expect(await nft.balanceOf(owner.address)).to.equal(1);
            expect(await nft.balanceOf(foe.address)).to.equal(4);

            expect(await foe.currentTotalMilitaryPower()).to.equal(ownerTotalPower);
            expect((await foe.userInfo(owner.address)).militaryPower).to.equal(ownerTotalPower);


            await foe.withdraw([3, 2, 0, 1]);
            await foe.deposit([3, 4, 1, 2]);
            await foe.withdraw([3, 2, 0]);
            await foe.withdraw([0]);
            await foe.deposit([3, 4, 1, 2]);
            await foe.withdraw([3, 2]);
            await foe.withdraw([0, 1]);
            await foe.deposit([3, 4, 5, 1, 2]);
            await foe.withdraw([0, 2, 4]);
            await foe.withdraw([0, 1]);
            await foe.deposit([3, 4, 5, 1, 2]);
            await foe.withdraw([2, 3, 4]);
            await foe.withdraw([0, 1]);
        });
    });

    describe("Reward", function () {
        it("Should send the reward for one participant", async function () {
            const {era, nft, foe, owner, otherAccount} = await loadFixture(deployFOE);
            for (let index = 0; index < 5; index++) {
                await nft.mint(otherAccount.address, 0);
            }
            expect(await nft.balanceOf(owner.address)).to.equal(5);
            expect(await nft.balanceOf(otherAccount.address)).to.equal(5);

            let nftPropertiesArr = [];
            for (let index = 1; index < 6; index++) {
                let nftProperties = await nft.getTokenProperties(index)
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
            await foe.deposit([1, 2, 3]);

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
            let elapsedBlocks = 86400;
            calculatedReward = await foe.pendingERA(owner.address);
            expect(calculatedReward).to.equal(elapsedBlocks * 100000 - 1);
            await foe.withdraw([0, 1, 2]);
            expect(await foe.currentTotalMilitaryPower()).to.equal(0);
            elapsedBlocks = 86400.001;
            expect((await era.balanceOf(owner.address))).to.equal(elapsedBlocks * 100000 - 1);
        });

        it("Should set the deposit and withdraw the reward correctly for two participants", async function () {
            const {era, nft, foe, owner, otherAccount} = await loadFixture(deployFOE);
            for (let index = 0; index < 5; index++) {
                await nft.mint(otherAccount.address, 0);
            }
            expect(await nft.balanceOf(owner.address)).to.equal(5);
            expect(await nft.balanceOf(otherAccount.address)).to.equal(5);

            let nftPropertiesArr = [];
            for (let index = 1; index < 6; index++) {
                let nftProperties = await nft.getTokenProperties(index)
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
            await foe.deposit([1, 2, 3]);
            let currentBlock = await time.latestBlock();

            let currentTime = await time.latest()
            for (let index = 0; index < 100; index++) {
                await time.increaseTo(currentTime + 86400);
                currentTime = await time.latest();
            }

            let elapsedBlocks = 86400;
            let calculatedRewardPhase1 = Number(await foe.pendingERA(owner.address));
            expect(calculatedRewardPhase1).to.equal(elapsedBlocks * 100000 - 1);

            await nft.connect(otherAccount).setApprovalForAll(foe.address, true);
            await foe.connect(otherAccount).deposit([6, 7, 8, 9, 10]);

            elapsedBlocks = 86400.02;
            calculatedRewardPhase1 = Number(await foe.pendingERA(owner.address));
            expect(calculatedRewardPhase1).to.equal(elapsedBlocks * 100000 - 1);

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

        });

        it("Should set the deposit and withdraw the reward correctly for two participants", async function () {
            const {era, nft, foe, owner, otherAccount} = await loadFixture(deployFOE);
            for (let index = 0; index < 50; index++) {
                await nft.mint(owner.address, 0);
            }

            expect(await nft.balanceOf(owner.address)).to.equal(55);
            // expect(await nft.balanceOf(otherAccount.address)).to.equal(5);


            await nft.setApprovalForAll(foe.address, true);
            await foe.deposit([5, 11]);
            expect(await nft.balanceOf(owner.address)).to.equal(53);
            expect((await foe.getTokenIds(owner.address)).map(Number)).to.eql([5, 11]);
            await foe.withdraw([1, 0]);
            expect(await nft.balanceOf(owner.address)).to.equal(55);
            expect((await foe.getTokenIds(owner.address)).map(Number)).to.eql([]);
            await foe.deposit([3, 4, 5, 11, 12, 13]);
            expect(await nft.balanceOf(owner.address)).to.equal(49);
            expect((await foe.getTokenIds(owner.address)).map(Number)).to.eql([3, 4, 5, 11, 12, 13]);
            await foe.withdraw([3, 2, 1]);
            expect(await nft.balanceOf(owner.address)).to.equal(52);
            expect((await foe.getTokenIds(owner.address)).map(Number)).to.eql([3, 13, 12]);
            await foe.deposit([5, 11, 14, 15, 16, 17, 18]);
            expect(await nft.balanceOf(owner.address)).to.equal(45);
            expect((await foe.getTokenIds(owner.address)).map(Number)).to.eql([3, 13, 12, 5, 11, 14, 15, 16, 17, 18]);
            await foe.deposit([22, 23, 31]);
            expect(await nft.balanceOf(owner.address)).to.equal(42);
            expect((await foe.getTokenIds(owner.address)).map(Number)).to.eql([3, 13, 12, 5, 11, 14, 15, 16, 17, 18, 22, 23, 31]);
            await foe.deposit([4, 19, 33]);
            expect(await nft.balanceOf(owner.address)).to.equal(39);
            expect((await foe.getTokenIds(owner.address)).map(Number)).to.eql([3, 13, 12, 5, 11, 14, 15, 16, 17, 18, 22, 23, 31, 4, 19, 33]);
            await foe.withdraw([7, 8, 9, 14]);
            expect(await nft.balanceOf(owner.address)).to.equal(43);
            expect((await foe.getTokenIds(owner.address)).map(Number)).to.eql([3, 13, 12, 5, 11, 14, 15, 31, 4, 33, 22, 23]);
            await foe.deposit([16, 17, 18, 19, 20, 21]);
            expect(await nft.balanceOf(owner.address)).to.equal(37);
            expect((await foe.getTokenIds(owner.address)).map(Number)).to.eql([3, 13, 12, 5, 11, 14, 15, 31, 4, 33, 22, 23, 16, 17, 18, 19, 20, 21]);
            await foe.withdraw([3, 8]);
            expect(await nft.balanceOf(owner.address)).to.equal(39);
            expect((await foe.getTokenIds(owner.address)).map(Number)).to.eql([3, 13, 12, 20, 11, 14, 15, 31, 21, 33, 22, 23, 16, 17, 18, 19]);
            await foe.withdraw([4]);
            expect(await nft.balanceOf(owner.address)).to.equal(40);
            expect((await foe.getTokenIds(owner.address)).map(Number)).to.eql([3, 13, 12, 20, 19, 14, 15, 31, 21, 33, 22, 23, 16, 17, 18]);
            await foe.deposit([11, 34, 5, 4]);
            expect(await nft.balanceOf(owner.address)).to.equal(36);
            expect((await foe.getTokenIds(owner.address)).map(Number)).to.eql([3, 13, 12, 20, 19, 14, 15, 31, 21, 33, 22, 23, 16, 17, 18, 11, 34, 5, 4]);
            await foe.withdraw([0, 18, 17]);
            expect(await nft.balanceOf(owner.address)).to.equal(39);
            expect((await foe.getTokenIds(owner.address)).map(Number)).to.eql([34, 13, 12, 20, 19, 14, 15, 31, 21, 33, 22, 23, 16, 17, 18, 11]);
            await foe.withdraw([15, 2, 5, 1]);
            expect(await nft.balanceOf(owner.address)).to.equal(43);
            expect((await foe.getTokenIds(owner.address)).map(Number)).to.eql([34, 18, 16, 20, 19, 17, 15, 31, 21, 33, 22, 23]);

            await foe.withdraw([6, 2, 5, 1, 4, 3, 8, 10, 11, 9, 0]);
            expect(await nft.balanceOf(owner.address)).to.equal(54);
            expect((await foe.getTokenIds(owner.address)).map(Number)).to.eql([31]);
        });
    });
});

describe("NFT", function () {
    async function deployEraAndNFT() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();
        const ERA = await ethers.getContractFactory("ERA");
        const era = await ERA.deploy();

        const NFT = await ethers.getContractFactory("HistopiaNFT");
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

        return {era, nft, owner, otherAccount};
    }

    describe("Deployment", function () {
        it("Should set the right nft contract address", async function () {
            const {era, nft, owner, otherAccount} = await loadFixture(deployEraAndNFT);
            expect(await nft.balanceOf(owner.address)).to.equal(5);
            expect(await nft.usersCounter(owner.address)).to.equal(5);
        })

        it("Should set the right nft contract address", async function () {
            const {era, nft, owner, otherAccount} = await loadFixture(deployEraAndNFT);
            expect(await nft.balanceOf(owner.address)).to.equal(5);
            expect(await nft.usersCounter(owner.address)).to.equal(5);
        })
    })

})
