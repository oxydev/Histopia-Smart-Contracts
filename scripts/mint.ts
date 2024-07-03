import { ethers } from "hardhat";
import { readAddresses } from "./deployUtils";

async function main() {
    const owner = (await ethers.getSigners())[0];
    const chainId = await owner.getChainId();
    let HistopiaAddresses = await readAddresses(String(chainId));

    const NFT = await ethers.getContractFactory("HistopiaNFT", owner);
    const nft = await NFT.attach(HistopiaAddresses.nft);

    await nft.mint(owner.address, 0);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});