import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const [owner] = await ethers.getSigners();

  fs.readFile( "address.json", async (err:any, content:any) => {
    if (err) {
      console.log("Error:", err);
      return
    }
    let json:{[key: string]: any} = {};
    try {
      json = JSON.parse(content);
    }
    catch (e) {
      console.log("Error:", e);
      return
    }
    const chainId = await ethers.provider.getNetwork().then((network) => network.chainId);

    const Bridge = await ethers.getContractFactory("BridgeERA");
    const bridge = await Bridge.deploy(json[chainId].era, owner.address);

    let txn = await bridge.deployed();
    let n =  await txn.deployTransaction.wait(4);

    console.log("bridge deployed to:", bridge.address);
    json[chainId].bridge = bridge.address;
    json[chainId].bridgeDeployBlock = n.blockNumber;
    // console.log(json);
    fs.writeFile("address.json", JSON.stringify(json), (err:any) => {
      if (err) {
        console.log(err);
      }
    })
  })

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
