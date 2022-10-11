import { ethers } from "hardhat";
import fs from "fs";
import * as sapphire from '@oasisprotocol/sapphire-paratime';

async function main() {
  console.log("Deploying MultiMint contract...");
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
    let MultiMint, multi
    if(chainId in sapphire.NETWORKS) {
      MultiMint = await ethers.getContractFactory("MultiMintSapphire", signer);
      multi = await MultiMint.deploy(json[chainId].nft, json[chainId].era);
    } else {
      MultiMint = await ethers.getContractFactory("MultiMint");
      multi = await MultiMint.deploy(json[chainId].nft);
    }

    let txn = await multi.deployed();
    await txn.deployTransaction.wait(1);

    console.log("bridge deployed to:", multi.address);
    json[chainId].multi = multi.address;
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
