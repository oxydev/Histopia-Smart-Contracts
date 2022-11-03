import {ethers} from "hardhat";
import {BigNumber} from "ethers";
import fs from "fs";
import * as sapphire from "@oasisprotocol/sapphire-paratime";

async function main() {
    // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

    // const lockedAmount = ethers.utils.parseEther("1");
    const chainId = await ethers.provider.getNetwork().then((network) => network.chainId);

    const [owner, otherAccount] = await ethers.getSigners();
    const ownerSigner = chainId in sapphire.NETWORKS ? sapphire.wrap(owner) : owner;
    const otherAccountSigner = chainId in sapphire.NETWORKS ? sapphire.wrap(otherAccount) : otherAccount;
    let otherAccountBalance = await otherAccountSigner.getBalance();
    console.log("otherAccount balance", otherAccountBalance);
    console.log("owner balance", await owner.getBalance());

    await otherAccountSigner.sendTransaction({
        to: owner.address,
        value: otherAccountBalance.div( 2),
    })
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
