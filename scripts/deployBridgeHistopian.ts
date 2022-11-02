import { ethers } from "hardhat";
import fs from "fs";
import * as sapphire from '@oasisprotocol/sapphire-paratime';

async function main() {
  const owner = (await ethers.getSigners())[0];
  const chainId = await owner.getChainId();

  const signer = chainId in sapphire.NETWORKS ? sapphire.wrap(owner): owner;

  fs.readFile( "deploymentScripts/address.json", async (err:any, content:any) => {
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
    let Bridge

    if(chainId in sapphire.NETWORKS) {
      Bridge = await ethers.getContractFactory("BridgeHistopianSapphire", signer);
    }else{
      Bridge = await ethers.getContractFactory("BridgeHistopian", signer);
    }

    const bridge = await Bridge.deploy(json[chainId].era, owner.address, json[chainId].nft);

    let txn = await bridge.deployed();
    let n =  await txn.deployTransaction.wait(4);

    console.log("bridge deployed to:", bridge.address);
    json[chainId].bridgeHistopian = bridge.address;
    json[chainId].bridgeHistopianDeployBlock = n.blockNumber;
    // console.log(json);
    fs.writeFile("deploymentScripts/address.json", JSON.stringify(json), (err:any) => {
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
