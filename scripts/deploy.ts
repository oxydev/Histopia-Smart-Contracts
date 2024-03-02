import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import * as sapphire from "@oasisprotocol/sapphire-paratime";
const fs = require("fs");
const BRIDGE_BACKEND = "0x1cE95c19db0Fa340BF332131D09f97d747CceA89";
async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = ethers.utils.parseEther("1");
  const owner = (await ethers.getSigners())[0];
  const chainId = await owner.getChainId();

  const signer = chainId in sapphire.NETWORKS ? sapphire.wrap(owner) : owner;

  console.log("Deploying NFT contract...", owner.address, await owner.getBalance());
  const Era = await ethers.getContractFactory("ERA", signer);
  const era = await Era.deploy();
  //
  await era.deployed();
  console.log("era deployed to:", era.address);

  const NFT = await ethers.getContractFactory("HistopiaNFT", signer);
  const nft = await NFT.deploy("Histopian NFT", "Histopian", era.address, BigNumber.from("2500000000000000000000"), {
    gasLimit: 10000000,
  });
  // const nft = await NFT.deploy("NFT", "NFT", "0xF07780BD59BD7b554a1DBF0e306f482EcEAF5C56", BigNumber.from("2500000000000000000000"));

  let nft2 = await nft.deployed();

  await nft.addType(
    "Histopian_v1",
    30,
    10000,
    ["speed", "strength", "intelligence", "charisma", "luck"],
    [10, 10, 10, 10, 10],
    [100, 100, 100, 100, 100]
    // [100, 100, 100, 100, 100],
  );

  await nft.addType(
    "Histopian_v2",
    30,
    10000,
    ["speed", "strength", "intelligence", "charisma", "luck"],
    [10, 10, 10, 10, 10],
    [80, 80, 80, 80, 80]
    // [100, 100, 100, 100, 100],
  );
  const FOE = await ethers.getContractFactory("FountainOfEra", signer);
  const foe = await FOE.deploy(era.address, nft.address, BigNumber.from("1000000000000000000"));
  // const foe = await FOE.deploy("0xF07780BD59BD7b554a1DBF0e306f482EcEAF5C56", nft.address, BigNumber.from("10000000000000000000"));
  // const foe = await FOE.deploy("0xb48dea62c889c6B92992001c2077F17a93eBb00D", "0x20143976Cd2Cf0882e28F35B312a2b62545aE35b",  BigNumber.from("0xDE0B6B3A7640000"));

  let foe2 = await foe.deployed();

  await foe.addHistopianType(0);
  await foe.addHistopianType(1);
  let n = await nft2.deployTransaction.wait(1);
  console.log("NFT deployed to:", nft.address, n.blockNumber);
  console.log("FOE deployed to:", foe.address);
  await era.changeMintAccessor(foe.address, true);
  await era.changeMintAccessor(BRIDGE_BACKEND, true);
  const Bridge = await ethers.getContractFactory("BridgeERA", signer);
  const bridge = await Bridge.deploy(era.address, owner.address);

  await bridge.deployed();

  console.log("Bridge deployed to:", bridge.address);

  fs.readFile("deploymentScripts/address.json", (err: any, content: any) => {
    if (err) {
      console.log("Error:", err);
    }
    let json: { [key: string]: any } = {};
    if (content) {
      json = JSON.parse(content.toString());
    }
    // console.log(json);
    json[chainId] = {
      era: era.address,
      nft: nft.address,
      foe: foe.address,
      bridge: bridge.address,
      startBlock: n.blockNumber,
      bridgeDeployBlock: n.blockNumber,
    };
    // console.log(json);
    fs.writeFile("deploymentScripts/address.json", JSON.stringify(json), (err: any) => {
      if (err) {
        console.log(err);
      }
    });
  });

  // console.log("Lock with 1 ETH deployed to:", lock.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
