import { ethers } from "hardhat";
import { readAddresses, writeAddresses } from "./deployUtils";

async function main() {
  const owner = (await ethers.getSigners())[0];
  const chainId = await owner.getChainId();
  let HistopiaAddresses = await readAddresses(String(chainId));
  const signer = owner;

  console.log("Deploying NFT contract...", owner.address, await owner.getBalance());

  const FOE = await ethers.getContractFactory("FountainOfEra", signer);
  const foe = await FOE.deploy(HistopiaAddresses.era, HistopiaAddresses.nft, HistopiaAddresses.era, ethers.BigNumber.from("1000000000000000000"));
  let foe2 = await foe.deployed();
  console.log("nft deployed to:", foe2.address);
  HistopiaAddresses.foe = foe2.address;

  const Era = await ethers.getContractFactory("ERA", signer);
  const era = await Era.attach(HistopiaAddresses.era);
  await era.changeMintAccessor(foe2.address, true);

  writeAddresses(String(chainId), HistopiaAddresses);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
