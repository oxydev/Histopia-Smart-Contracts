import { ethers } from "hardhat";
import { BigNumber } from "ethers";
const fs = require("fs");
import { readAddresses, writeAddresses } from "./deployUtils";

async function main() {
  const owner = (await ethers.getSigners())[0];
  const chainId = await owner.getChainId();
  let HistopiaAddresses = await readAddresses(String(chainId));
  const signer = owner;

  console.log("Deploying ERA contract...", owner.address, await owner.getBalance());
  const Era = await ethers.getContractFactory("ERA", signer);
  const era = await Era.deploy();
  //
  await era.deployed();
  console.log("era deployed to:", era.address);
  await era.changeMintAccessor(owner.getAddress(), true);
  HistopiaAddresses.era = era.address;

  writeAddresses(String(chainId), HistopiaAddresses);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
