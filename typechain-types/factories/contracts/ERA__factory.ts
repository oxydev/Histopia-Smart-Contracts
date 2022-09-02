/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { ERA, ERAInterface } from "../../contracts/ERA";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_mintAccessor",
        type: "address",
      },
    ],
    name: "changeMintAccessor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEraContractAddress",
    outputs: [
      {
        internalType: "address",
        name: "EraContract",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
  {
    inputs: [
      {
        internalType: "address",
        name: "dest",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawShare",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260078054610100600160a81b03191690553480156200002257600080fd5b50604080518082018252600281526122a960f11b60208083019182528351808501909452600584526422a929292960d91b9084015281519192916200006a916003916200012b565b508051620000809060049060208401906200012b565b5050506200009d62000097620000d560201b60201c565b620000d9565b6007805460ff191660121790819055620000bc9060ff16600a6200021e565b620000cc906305f5e10062000316565b6006556200038b565b3390565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b828054620001399062000338565b90600052602060002090601f0160209004810192826200015d5760008555620001a8565b82601f106200017857805160ff1916838001178555620001a8565b82800160010185558215620001a8579182015b82811115620001a85782518255916020019190600101906200018b565b50620001b6929150620001ba565b5090565b5b80821115620001b65760008155600101620001bb565b80825b6001808611620001e5575062000215565b818704821115620001fa57620001fa62000375565b808616156200020857918102915b9490941c938002620001d4565b94509492505050565b60006200023260001960ff85168462000239565b9392505050565b6000826200024a5750600162000232565b81620002595750600062000232565b81600181146200027257600281146200027d57620002b1565b600191505062000232565b60ff84111562000291576200029162000375565b6001841b915084821115620002aa57620002aa62000375565b5062000232565b5060208310610133831016604e8410600b8410161715620002e9575081810a83811115620002e357620002e362000375565b62000232565b620002f88484846001620001d1565b8086048211156200030d576200030d62000375565b02949350505050565b600081600019048311821515161562000333576200033362000375565b500290565b6002810460018216806200034d57607f821691505b602082108114156200036f57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b610e5d806200039b6000396000f3fe608060405234801561001057600080fd5b50600436106100f15760003560e01c806303c17172146100f657806306fdde031461010b578063095ea7b31461012957806318160ddd1461014957806323b872dd1461015e578063313ce56714610171578063395093511461018657806340c10f191461019957806370a08231146101ac578063715018a6146101bf5780638da5cb5b146101c757806395d89b41146101dc5780639dc29fac146101e4578063a02330a8146101f7578063a457c2d71461020a578063a9059cbb1461021d578063d102de2814610230578063dd62ed3e14610238578063f2fde38b1461024b575b600080fd5b6101096101043660046109d0565b61025e565b005b61011361026c565b6040516101209190610a18565b60405180910390f35b61013c6101373660046109d0565b6102fe565b6040516101209190610a0d565b610151610320565b6040516101209190610d70565b61013c61016c366004610995565b610326565b610179610354565b6040516101209190610d79565b61013c6101943660046109d0565b61035d565b6101096101a73660046109d0565b610389565b6101516101ba366004610942565b610393565b6101096103b2565b6101cf6103c6565b60405161012091906109f9565b6101136103d5565b6101096101f23660046109d0565b6103e4565b610109610205366004610942565b6103ee565b61013c6102183660046109d0565b61041e565b61013c61022b3660046109d0565b61046f565b6101cf610487565b610151610246366004610963565b61048b565b610109610259366004610942565b6104b6565b6102688282610389565b5050565b60606003805461027b90610db6565b80601f01602080910402602001604051908101604052809291908181526020018280546102a790610db6565b80156102f45780601f106102c9576101008083540402835291602001916102f4565b820191906000526020600020905b8154815290600101906020018083116102d757829003601f168201915b5050505050905090565b6000806103096104f0565b90506103168185856104f4565b5060019392505050565b60025490565b6000806103316104f0565b905061033e8582856105a8565b6103498585856105f2565b506001949350505050565b60075460ff1690565b6000806103686104f0565b905061031681858561037a858961048b565b6103849190610d87565b6104f4565b6102688282610704565b6001600160a01b0381166000908152602081905260409020545b919050565b6103ba6107ba565b6103c460006107f9565b565b6005546001600160a01b031690565b60606004805461027b90610db6565b610268828261084b565b6103f66107ba565b600780546001600160a01b0390921661010002610100600160a81b0319909216919091179055565b6000806104296104f0565b90506000610437828661048b565b9050838110156104625760405162461bcd60e51b815260040161045990610cf4565b60405180910390fd5b61034982868684036104f4565b60008061047a6104f0565b90506103168185856105f2565b3090565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6104be6107ba565b6001600160a01b0381166104e45760405162461bcd60e51b815260040161045990610af0565b6104ed816107f9565b50565b3390565b6001600160a01b03831661051a5760405162461bcd60e51b815260040161045990610cb0565b6001600160a01b0382166105405760405162461bcd60e51b815260040161045990610b36565b6001600160a01b0380841660008181526001602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259061059b908590610d70565b60405180910390a3505050565b60006105b4848461048b565b905060001981146105ec57818110156105df5760405162461bcd60e51b815260040161045990610b78565b6105ec84848484036104f4565b50505050565b6001600160a01b0383166106185760405162461bcd60e51b815260040161045990610c6b565b6001600160a01b03821661063e5760405162461bcd60e51b815260040161045990610a6b565b610649838383610926565b6001600160a01b038316600090815260208190526040902054818110156106825760405162461bcd60e51b815260040161045990610baf565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906106b9908490610d87565b92505081905550826001600160a01b0316846001600160a01b0316600080516020610e08833981519152846040516106f19190610d70565b60405180910390a36105ec848484610926565b6001600160a01b03821661072a5760405162461bcd60e51b815260040161045990610d39565b61073660008383610926565b80600260008282546107489190610d87565b90915550506001600160a01b03821660009081526020819052604081208054839290610775908490610d87565b90915550506040516001600160a01b03831690600090600080516020610e08833981519152906107a6908590610d70565b60405180910390a361026860008383610926565b6107c26104f0565b6001600160a01b03166107d36103c6565b6001600160a01b0316146103c45760405162461bcd60e51b815260040161045990610bf5565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0382166108715760405162461bcd60e51b815260040161045990610c2a565b61087d82600083610926565b6001600160a01b038216600090815260208190526040902054818110156108b65760405162461bcd60e51b815260040161045990610aae565b6001600160a01b03831660009081526020819052604081208383039055600280548492906108e5908490610d9f565b90915550506040516000906001600160a01b03851690600080516020610e0883398151915290610916908690610d70565b60405180910390a3610926836000845b505050565b80356001600160a01b03811681146103ad57600080fd5b600060208284031215610953578081fd5b61095c8261092b565b9392505050565b60008060408385031215610975578081fd5b61097e8361092b565b915061098c6020840161092b565b90509250929050565b6000806000606084860312156109a9578081fd5b6109b28461092b565b92506109c06020850161092b565b9150604084013590509250925092565b600080604083850312156109e2578182fd5b6109eb8361092b565b946020939093013593505050565b6001600160a01b0391909116815260200190565b901515815260200190565b6000602080835283518082850152825b81811015610a4457858101830151858201604001528201610a28565b81811115610a555783604083870101525b50601f01601f1916929092016040019392505050565b60208082526023908201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260408201526265737360e81b606082015260800190565b60208082526022908201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604082015261636560f01b606082015260800190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b60208082526022908201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604082015261737360f01b606082015260800190565b6020808252601d908201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604082015260600190565b60208082526026908201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604082015265616c616e636560d01b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526021908201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736040820152607360f81b606082015260800190565b60208082526025908201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604082015264647265737360d81b606082015260800190565b60208082526024908201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646040820152637265737360e01b606082015260800190565b60208082526025908201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604082015264207a65726f60d81b606082015260800190565b6020808252601f908201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604082015260600190565b90815260200190565b60ff91909116815260200190565b60008219821115610d9a57610d9a610df1565b500190565b600082821015610db157610db1610df1565b500390565b600281046001821680610dca57607f821691505b60208210811415610deb57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fdfeddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa2646970667358221220f53d9d2b1c78df328c10870333aeb2ac3b951d4185e1b13a69b1654b85d0d21d64736f6c63430008010033";

type ERAConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERAConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERA__factory extends ContractFactory {
  constructor(...args: ERAConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERA> {
    return super.deploy(overrides || {}) as Promise<ERA>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERA {
    return super.attach(address) as ERA;
  }
  override connect(signer: Signer): ERA__factory {
    return super.connect(signer) as ERA__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERAInterface {
    return new utils.Interface(_abi) as ERAInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERA {
    return new Contract(address, _abi, signerOrProvider) as ERA;
  }
}