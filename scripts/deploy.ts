import { ethers } from "hardhat";

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = ethers.utils.parseEther("1");

  const Era = await ethers.getContractFactory("ERA");
  const era = await Era.deploy();

  await era.deployed();

  const NFT = await ethers.getContractFactory("AttachableERC721");
  const nft = await NFT.deploy("NFT", "NFT", era.address, 0);

  await nft.deployed();

  console.log("era deployed to:", era.address);

  console.log("NFT deployed to:", nft.address);
  await nft.addType(
      "Histopian",
      30,
      100,
      ["speed", "strength", "intelligence", "charisma", "luck"],
      [10, 10, 10, 10, 10],
      [100, 100, 100, 100, 100],
  )
  const FOE = await ethers.getContractFactory("FountainOfEra");
  const foe = await FOE.deploy(era.address, nft.address, 1000);

  await foe.deployed();
  console.log("FOE deployed to:", foe.address);

  // console.log("Lock with 1 ETH deployed to:", lock.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
