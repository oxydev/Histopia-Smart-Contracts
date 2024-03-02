import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.1",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10,
      },
    },
  },
  networks: {
    lisk_testnet: {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: [process.env.OWNER_KEY as string],
    },
  },
};

export default config;
