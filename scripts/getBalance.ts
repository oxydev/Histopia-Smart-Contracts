import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import fs from "fs";
import { readAddresses, writeAddresses } from "./deployUtils";

async function main() {
  const owner = (await ethers.getSigners())[0];
  const chainId = await owner.getChainId();
  let HistopiaAddresses = await readAddresses(String(chainId));

  const Era = await ethers.getContractFactory("ERA", owner);
  const era = await Era.attach(HistopiaAddresses.era);
  //   await era.mint(owner.getAddress(), 1);
  let b = await era.balanceOf(owner.getAddress());
  console.log("era balance of owner", b.toString());
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
