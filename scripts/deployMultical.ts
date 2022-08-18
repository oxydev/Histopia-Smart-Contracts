import { ethers } from "hardhat";

async function main() {

    const [owner] = await ethers.getSigners();
    console.log("Deploying NFT contract...", owner.address, await owner.getBalance());


    const NFT = await ethers.getContractFactory("Multicall");
    const nft = await NFT.deploy();

    await nft.deployed();

    console.log("NFT deployed to:", nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
