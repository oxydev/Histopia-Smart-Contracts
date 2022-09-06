import { ethers } from "hardhat";
import {BigNumber} from "ethers";

async function main() {
    // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

    // const lockedAmount = ethers.utils.parseEther("1");
    const [owner] = await ethers.getSigners();
    console.log("Deploying NFT contract...", owner.address, await owner.getBalance());
    const Era = await ethers.getContractFactory("ERA");
    const era = await Era.deploy();
    //
    await era.deployed();
    console.log("era deployed to:", era.address);

    const NFT = await ethers.getContractFactory("HistopiaNFT");
    const nft = await NFT.deploy("NFT", "NFT", era.address, 0);
    // const nft = await NFT.deploy("NFT", "NFT", "0xb48dea62c889c6B92992001c2077F17a93eBb00D", 0);

    await nft.deployed();


    await nft.addType(
        "Histopian",
        30,
        100,
        ["speed", "strength", "intelligence", "charisma", "luck"],
        [10, 10, 10, 10, 10],
        [100, 100, 100, 100, 100],
    )
    // const FOE = await ethers.getContractFactory("FountainOfEra");
    // const foe = await FOE.deploy(era.address, nft.address, BigNumber.from("0xDE0B6B3A7640000"));
    // // const foe = await FOE.deploy("0xb48dea62c889c6B92992001c2077F17a93eBb00D", "0x20143976Cd2Cf0882e28F35B312a2b62545aE35b",  BigNumber.from("0xDE0B6B3A7640000"));
    //
    // await foe.deployed();
    //
    // await foe.addHistopianType(0)
    // console.log("NFT deployed to:", nft.address, nft.deployTransaction.blockNumber);
    // console.log("FOE deployed to:", foe.address);
    //
    // const Bridge = await ethers.getContractFactory("BridgeERA");
    // const bridge = await Bridge.deploy(era.address);
    //
    // await bridge.deployed();
    //
    // console.log("Bridge deployed to:", bridge.address);
    // console.log("Lock with 1 ETH deployed to:", lock.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
