/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  Challenger,
  ChallengerInterface,
} from "../../contracts/Challenger";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_ERA",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeRound",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "plainAnswer",
        type: "string",
      },
    ],
    name: "ChallengeWinner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "startingTimestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rewardERA",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeRound",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "answerHash",
        type: "bytes32",
      },
    ],
    name: "NewChallenge",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "ERA",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "activeChallenge",
    outputs: [
      {
        internalType: "uint256",
        name: "startingTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardERA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "answerHash",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "hasWinner",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startingTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardERA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "answerHash",
        type: "bytes32",
      },
    ],
    name: "addChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "challengeRound",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "plainAnswer",
        type: "string",
      },
    ],
    name: "submit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610a20380380610a2083398101604081905261002f916100b8565b61003f61003a610064565b610068565b600780546001600160a01b0319166001600160a01b03929092169190911790556100e6565b3390565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100c9578081fd5b81516001600160a01b03811681146100df578182fd5b9392505050565b61092b806100f56000396000f3fe608060405234801561001057600080fd5b50600436106100785760003560e01c8063023ac6c71461007d57806323af01ce1461009b578063715018a6146100b45780638da5cb5b146100be578063a2d966ea146100d3578063d99a8dc3146100db578063ecf999f9146100ee578063f2fde38b14610101575b600080fd5b610085610114565b604051610092919061081d565b60405180910390f35b6100a361011a565b604051610092959493929190610841565b6100bc61012f565b005b6100c6610143565b6040516100929190610639565b6100c6610152565b6100bc6100e9366004610543565b610161565b6100bc6100fc3660046105ec565b6102f7565b6100bc61010f3660046104f5565b610428565b60065481565b60015460025460035460045460055460ff1685565b610137610462565b61014160006104a1565b565b6000546001600160a01b031690565b6007546001600160a01b031681565b60045460405161017590839060200161061d565b60405160208183030381529060405280519060200120146101b15760405162461bcd60e51b81526004016101a8906107da565b60405180910390fd5b60055460ff16156101d45760405162461bcd60e51b81526004016101a89061078c565b60035460015442916101e591610866565b116102025760405162461bcd60e51b81526004016101a89061072a565b60015442116102235760405162461bcd60e51b81526004016101a8906106f9565b6005805460ff191660011790556007546002546040516323b872dd60e01b81526001600160a01b03909216916323b872dd91610265913091339160040161064d565b602060405180830381600087803b15801561027f57600080fd5b505af1158015610293573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102b79190610523565b506006547f460d83cdda25d4ae446b4e09eca21ed11b7285f969fab1f8d2526fedf79ba48f33836040516102ec929190610671565b60405180910390a250565b6102ff610462565b6007546040516323b872dd60e01b81526001600160a01b03909116906323b872dd906103339033903090889060040161064d565b602060405180830381600087803b15801561034d57600080fd5b505af1158015610361573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103859190610523565b5060068054906000610396836108ae565b90915550506040805160a0810182528581526020810185905280820184905260608101839052600060809091015260018590556002849055600383905560048290556005805460ff1916905560065490517f7bd71f286df35774978e1f5a0fbf28d85ec020a8012ab2b8cfb2e874e002a8969061041a908790879087908790610826565b60405180910390a250505050565b610430610462565b6001600160a01b0381166104565760405162461bcd60e51b81526004016101a8906106b3565b61045f816104a1565b50565b61046a6104f1565b6001600160a01b031661047b610143565b6001600160a01b0316146101415760405162461bcd60e51b81526004016101a890610757565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b3390565b600060208284031215610506578081fd5b81356001600160a01b038116811461051c578182fd5b9392505050565b600060208284031215610534578081fd5b8151801515811461051c578182fd5b600060208284031215610554578081fd5b81356001600160401b038082111561056a578283fd5b818401915084601f83011261057d578283fd5b81358181111561058f5761058f6108df565b604051601f8201601f19908116603f011681019083821181831017156105b7576105b76108df565b816040528281528760208487010111156105cf578586fd5b826020860160208301379182016020019490945295945050505050565b60008060008060808587031215610601578283fd5b5050823594602084013594506040840135936060013592509050565b6000825161062f81846020870161087e565b9190910192915050565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b600060018060a01b038416825260406020830152825180604084015261069e81606085016020870161087e565b601f01601f1916919091016060019392505050565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b602080825260179082015276086d0c2d8d8cadcceca409cdee840a6e8c2e4e8cac8745604b1b604082015260600190565b602080825260139082015272086d0c2d8d8cadcceca408af0e0d2e4cac8745606b1b604082015260600190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6020808252602e908201527f4368616c6c656e676520416c726561647920536f6c76656420627920616e6f7460408201526d0d0cae44090d2e6e8dee0d2c274560931b606082015260800190565b60208082526023908201527f57726f6e6720416e737765722c2054727920416761696e20486973746f7069616040820152620dc74560eb1b606082015260800190565b90815260200190565b93845260208401929092526040830152606082015260800190565b9485526020850193909352604084019190915260608301521515608082015260a00190565b60008219821115610879576108796108c9565b500190565b60005b83811015610899578181015183820152602001610881565b838111156108a8576000848401525b50505050565b60006000198214156108c2576108c26108c9565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220fdc000f9b3b708d2cc9d26bb38c61cc688e51f00f5f4881d93f4c563bb5cf2de64736f6c63430008010033";

type ChallengerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ChallengerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Challenger__factory extends ContractFactory {
  constructor(...args: ChallengerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _ERA: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Challenger> {
    return super.deploy(_ERA, overrides || {}) as Promise<Challenger>;
  }
  override getDeployTransaction(
    _ERA: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_ERA, overrides || {});
  }
  override attach(address: string): Challenger {
    return super.attach(address) as Challenger;
  }
  override connect(signer: Signer): Challenger__factory {
    return super.connect(signer) as Challenger__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ChallengerInterface {
    return new utils.Interface(_abi) as ChallengerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Challenger {
    return new Contract(address, _abi, signerOrProvider) as Challenger;
  }
}
