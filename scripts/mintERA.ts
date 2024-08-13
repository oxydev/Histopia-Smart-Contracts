import { ethers } from "hardhat";
import { readAddresses } from "./deployUtils";

async function main() {
    const owner = (await ethers.getSigners())[0];
    const chainId = await owner.getChainId();
    let HistopiaAddresses = await readAddresses(String(chainId));

    const ERA = await ethers.getContractFactory("ERA", owner);
    const era = await ERA.attach(HistopiaAddresses.era);

    await era.mint(owner.address, ethers.BigNumber.from("10000000000000000000000"));
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});