import { ethers } from "hardhat";
import { BigNumber } from "ethers";
const fs = require("fs");
import { readAddresses, writeAddresses } from "./deployUtils";

async function main() {
  const owner = (await ethers.getSigners())[0];
  const chainId = await owner.getChainId();
  let HistopiaAddresses = await readAddresses(String(chainId));
  const signer = owner;

  console.log("Deploying NFT contract...", owner.address, await owner.getBalance());

  const NFT = await ethers.getContractFactory("HistopiaNFT", signer);
  const nft = await NFT.deploy("Histopian NFT", "Histopian");

  let nft2 = await nft.deployed();
  console.log("nft deployed to:", nft2.address);
  HistopiaAddresses.nft = nft2.address;

  writeAddresses(String(chainId), HistopiaAddresses);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
