import { ethers } from "hardhat";
import {BigNumber} from "ethers";
import fs from "fs";

async function main() {
    // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

    // const lockedAmount = ethers.utils.parseEther("1");
    fs.readFile( "deploymentScripts/address.json", async (err:any, content:any) => {
        if (err) {
            console.log("Error:", err);
            return
        }
        let json:{[key: string]: any} = {};
        try {
            json = JSON.parse(content);
        }
        catch (e) {
            console.log("Error:", e);
            return
        }
        const chainId = await ethers.provider.getNetwork().then((network) => network.chainId);

        const NFT = await ethers.getContractFactory("HistopiaNFT");
        const nft = await NFT.attach(json[chainId].nft);
        // const nft = await NFT.deploy("NFT", "NFT", "0xb48dea62c889c6B92992001c2077F17a93eBb00D", 0);
        try {
            console.log("nft mint fee on chain", chainId, await nft.types(4));
        } catch (e) {
            console.log("Error getting mint fee", chainId);
        }
    })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
