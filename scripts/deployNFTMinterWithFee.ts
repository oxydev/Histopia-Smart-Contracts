import { ethers } from "hardhat";
import { BigNumber } from "ethers";
const fs = require("fs");
import { readAddresses, writeAddresses } from "./deployUtils";

async function main() {
  const owner = (await ethers.getSigners())[0];
  const chainId = await owner.getChainId();
  let HistopiaAddresses = await readAddresses(String(chainId));
  const signer = owner;

  console.log("Deploying NFTMintLogic contract...", owner.address, await owner.getBalance());

  const NFT = await ethers.getContractFactory("NFTMintLogic", signer);
  const nft = await NFT.deploy(HistopiaAddresses.nft, HistopiaAddresses.era);

  let nft2 = await nft.deployed();
  console.log("nft deployed to:", nft2.address);
  HistopiaAddresses.nftMinter = nft2.address;

  nft.setMintFee(0, ethers.BigNumber.from("100000000000000000000"));

  writeAddresses(String(chainId), HistopiaAddresses);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
