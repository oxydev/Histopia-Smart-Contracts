import { ethers } from "hardhat";
import {BigNumber} from "ethers";
import * as sapphire from '@oasisprotocol/sapphire-paratime';
const fs = require("fs");
const BRIDGE_BACKEND = "0x1cE95c19db0Fa340BF332131D09f97d747CceA89";
async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = ethers.utils.parseEther("1");
  const owner = (await ethers.getSigners())[0];
  const chainId = await owner.getChainId();

  const signer = chainId in sapphire.NETWORKS ? sapphire.wrap(owner): owner;


  console.log("Deploying NFT contract...", owner.address, await owner.getBalance());
  const Era = await ethers.getContractFactory("ERA", signer);
  const era = await Era.deploy();
  //
  await era.deployed();
  console.log("era deployed to:", era.address);
  await era.changeMintAccessor(BRIDGE_BACKEND, true);
  // console.log("Lock with 1 ETH deployed to:", lock.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
