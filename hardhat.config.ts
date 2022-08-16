import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.1",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    oasis_test: {
      url: "https://testnet.emerald.oasis.dev",
      accounts: ['4f83e33b48dd6f53062a339d7dd9bb403a768664591d45b798d60a4e4a21cc9b']
    }
  }
};

export default config;
