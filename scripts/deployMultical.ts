import { ethers } from "hardhat";
import * as sapphire from '@oasisprotocol/sapphire-paratime';

async function main() {
    const signer0 = (await ethers.getSigners())[0];
    const chainId = await signer0.getChainId();

    const signer = chainId in sapphire.NETWORKS ? sapphire.wrap(signer0): signer0;


    const NFT = await ethers.getContractFactory("Multicall", signer);
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
