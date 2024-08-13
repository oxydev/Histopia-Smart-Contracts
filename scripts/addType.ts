import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { readAddresses, writeAddresses } from "./deployUtils";


async function main() {

  const owner = (await ethers.getSigners())[0];
  const chainId = await owner.getChainId();
  let HistopiaAddresses = await readAddresses(String(chainId));

  //
  console.log("HistopiaAddresses", HistopiaAddresses);
  const NFT = await ethers.getContractFactory("HistopiaNFT", owner);
  const nft = await NFT.attach(HistopiaAddresses.nft);

  // await nft.addType(
  //   "Histopian_Basic",
  //   30,
  //   100000,
  //   ["speed", "strength", "intelligence", "charisma", "luck"],
  //   [10, 10, 10, 10, 10],
  //   [100, 100, 100, 100, 100]
  // );


  const FOE = await ethers.getContractFactory("FountainOfEra", owner);
  const foe = await FOE.attach(HistopiaAddresses.foe);
  await foe.addHistopianType(1);

  console.log("added successfully", chainId);
};

// const FOE = await ethers.getContractFactory("FountainOfEra");
// const foe = await FOE.deploy(era.address, nft.address, BigNumber.from("0xDE0B6B3A7640000"));
// // const foe = await FOE.deploy("0xb48dea62c889c6B92992001c2077F17a93eBb00D", "0x20143976Cd2Cf0882e28F35B312a2b62545aE35b",  BigNumber.from("0xDE0B6B3A7640000"));
//
// await foe.deployed();
//
// await foe.addHistopianType(0)
// console.log("NFT deployed to:", nft.address, nft.deployTransaction.blockNumber);
// console.log("FOE deployed to:", foe.address);
//
// const Bridge = await ethers.getContractFactory("BridgeERA");
// const bridge = await Bridge.deploy(era.address);
//
// await bridge.deployed();
//
// console.log("Bridge deployed to:", bridge.address);
// console.log("Lock with 1 ETH deployed to:", lock.address);


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
