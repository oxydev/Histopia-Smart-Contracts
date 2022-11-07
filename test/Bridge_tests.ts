import {time, loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {anyValue} from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import {expect} from "chai";
import {ethers} from "hardhat";
import {BigNumber} from "ethers";

describe("FOE", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshopt in every test.
    async function deployEraAndNFTAndBridge() {

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

        const Bridge = await ethers.getContractFactory("BridgeERA");
        const bridge = await Bridge.deploy(era.address, owner.address);
        await era.changeMintAccessor(owner.address, true);
        return {era, nft,bridge, owner, otherAccount};
    }

    describe("Deployment", function () {
        it("Should set the right nft contract address", async function () {
            const {era, nft, bridge, owner, otherAccount} = await loadFixture(deployEraAndNFTAndBridge);
            await era.mint(otherAccount.address, BigInt("1000000000000000000000000"));
            await era.connect(otherAccount).approve(bridge.address, BigInt("1000000000000000000000"));
            // let x =  Buffer.from(, "hex");
            // let e = new ArrayBuffer(32);
            //
            // let  decoder = new TextDecoder();
            // let y = decoder.decode(x.valueOf());
            // console.log("dcsdc", y, x);
            let txn = bridge.connect(otherAccount).lock(BigInt("1000000000000000000000"), "skcnsdklkmcjnsdkj", 0)
            await expect(txn).to.emit(
                bridge,
                "Locked"
            ).withArgs(
                BigInt("990000000000000000000"),
                otherAccount.address,
                "skcnsdklkmcjnsdkj",
                0
            );
            (await txn).wait().then((receipt) => {
                console.log(receipt.gasUsed);
            })
        })
    })

})
