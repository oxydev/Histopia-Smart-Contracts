import { ethers } from "hardhat";

async function main() {

  const [owner] = await ethers.getSigners();
  console.log("Deploying NFT contract...", owner.address, await owner.getBalance());

  // const era = await ethers.getContractFactory("ERA");
  // console.log("Deploying era contract...", era);

  const NFT = await ethers.getContractFactory("BridgeERA");
  const nft = await NFT.deploy("0xBf4Dc84191F713E5613090704aB8918CE88a3ec5");

  await nft.deployed();

  console.log("NFT deployed to:", nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
