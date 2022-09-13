import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

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
            accounts: ['4f83e33b48dd6f53062a339d7dd9bb403a768664591d45b798d60a4e4a21cc9b']
        },
        aurora_testnet: {
            url: 'https://testnet.aurora.dev',
            accounts: [`4f83e33b48dd6f53062a339d7dd9bb403a768664591d45b798d60a4e4a21cc9b`],
        },
        polygon_testnet: {
            url: 'https://polygon-mumbai.infura.io/v3/807a831a7f3548d98d670adaa7d4efc7',
            accounts: [`4f83e33b48dd6f53062a339d7dd9bb403a768664591d45b798d60a4e4a21cc9b`],
        },
        goerli: {
            url: 'https://goerli.infura.io/v3/807a831a7f3548d98d670adaa7d4efc7',
            accounts: [`4f83e33b48dd6f53062a339d7dd9bb403a768664591d45b798d60a4e4a21cc9b`],
        },
        boba_testnet: {
            url: 'https://rinkeby.boba.network/',
            accounts: [`4f83e33b48dd6f53062a339d7dd9bb403a768664591d45b798d60a4e4a21cc9b`],
        },
        bnb_testnet: {
            url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            accounts: [`4f83e33b48dd6f53062a339d7dd9bb403a768664591d45b798d60a4e4a21cc9b`],
        }
    }
};

export default config;
