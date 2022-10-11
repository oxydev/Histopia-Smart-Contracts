import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv'
dotenv.config()

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
        oasis_testnet: {
            url: "https://testnet.emerald.oasis.dev",
            accounts: [process.env.OWNER_KEY || ""],
        },
        aurora_testnet: {
            url: 'https://testnet.aurora.dev',
            accounts: [process.env.OWNER_KEY || ""],
        },
        polygon_testnet: {
            url: 'https://polygon-mumbai.infura.io/v3/807a831a7f3548d98d670adaa7d4efc7',
            accounts: [process.env.OWNER_KEY || ""],
        },
        goerli: {
            url: 'https://goerli.infura.io/v3/807a831a7f3548d98d670adaa7d4efc7',
            accounts: [process.env.OWNER_KEY || ""],
        },
        boba_testnet: {
            url: 'https://rinkeby.boba.network/',
            accounts: [process.env.OWNER_KEY || ""],
        },
        bnb_testnet: {
            url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            accounts: [process.env.OWNER_KEY || ""],
        },
        sapphire_testnet: {
            url: "https://testnet.sapphire.oasis.dev",
            accounts: [process.env.OWNER_KEY || ""]
        },
    }
};

export default config;
