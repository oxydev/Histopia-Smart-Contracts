import { ethers } from "hardhat";
import { readAddresses, writeAddresses } from "./deployUtils";

async function main() {
    const owner = (await ethers.getSigners())[0];
    const chainId = await owner.getChainId();
    let HistopiaAddresses = await readAddresses(String(chainId));
    // ERC-20 token contract address
    const ERA = await ethers.getContractFactory("HistopiaNFT");
    const era = await ERA.attach(HistopiaAddresses.era);;

    // Amount of tokens you want to allow NFTMintLogic to use
    let amount = ethers.BigNumber.from("100000000000000000000");

    // Approve NFTMintLogic to use the specified amount of tokens
    const balance = await era.balanceOf(owner.address);
    console.log(owner.address);
    console.log(balance);
    if (balance.gte(amount)) {
        era.approve(HistopiaAddresses.nftMinter, amount);
        console.log("approved successfully");
    } else {
        console.log("Insufficient balance to approve the transfer.");
    }

    console.log("approved successfully",);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
