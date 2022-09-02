/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Resources, ResourcesInterface } from "../../contracts/Resources";

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
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
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
        name: "operator",
        type: "address",
      },
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
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
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [],
    name: "BOW",
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
    name: "BREAD",
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
    name: "CATTLE",
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
    name: "DATE",
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
    name: "EGG",
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
    name: "FLOUR",
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
    name: "GOLD",
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
    name: "GRAPE",
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
    name: "HEN",
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
    name: "IRON",
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
    name: "MEAT",
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
    name: "MILK",
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
    name: "PIG",
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
    name: "RICE",
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
    name: "SHEEP",
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
    name: "SHIELD",
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
    name: "SPEAR",
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
    name: "STONE",
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
    name: "SWORD",
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
    name: "WHEAT",
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
    name: "WOOD",
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
    name: "WOOL",
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
        name: "id",
        type: "uint256",
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
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
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
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mintBatch",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
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
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "uri_",
        type: "string",
      },
    ],
    name: "setURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405180606001604052806026815260200162002910602691396200003781620003c9565b506200004c62000046620003e2565b620003e7565b620000713360006001604051806020016040528060008152506200043960201b60201c565b6200009533600180604051806020016040528060008152506200043960201b60201c565b620000ba3360026001604051806020016040528060008152506200043960201b60201c565b620000df3360036001604051806020016040528060008152506200043960201b60201c565b620001043360046001604051806020016040528060008152506200043960201b60201c565b620001293360056001604051806020016040528060008152506200043960201b60201c565b6200014e3360066001604051806020016040528060008152506200043960201b60201c565b620001733360066001604051806020016040528060008152506200043960201b60201c565b620001983360076001604051806020016040528060008152506200043960201b60201c565b620001bd3360086001604051806020016040528060008152506200043960201b60201c565b620001e23360096001604051806020016040528060008152506200043960201b60201c565b6200020733600a6001604051806020016040528060008152506200043960201b60201c565b6200022c33600b6001604051806020016040528060008152506200043960201b60201c565b6200025133600c6001604051806020016040528060008152506200043960201b60201c565b6200027633600d6001604051806020016040528060008152506200043960201b60201c565b6200029b33600e6001604051806020016040528060008152506200043960201b60201c565b620002c033600f6001604051806020016040528060008152506200043960201b60201c565b620002e53360106001604051806020016040528060008152506200043960201b60201c565b6200030a3360116001604051806020016040528060008152506200043960201b60201c565b6200032f33600e6001604051806020016040528060008152506200043960201b60201c565b620003543360126001604051806020016040528060008152506200043960201b60201c565b620003793360136001604051806020016040528060008152506200043960201b60201c565b6200039e3360146001604051806020016040528060008152506200043960201b60201c565b620003c33360156001604051806020016040528060008152506200043960201b60201c565b62000ae4565b8051620003de9060029060208401906200071f565b5050565b335b90565b600380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0384166200046b5760405162461bcd60e51b8152600401620004629062000945565b60405180910390fd5b600062000477620003e2565b90506000620004868562000566565b90506000620004958562000566565b9050620004a883600089858589620005c0565b6000868152602081815260408083206001600160a01b038b16845290915281208054879290620004da90849062000994565b92505081905550866001600160a01b031660006001600160a01b0316846001600160a01b03167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6289896040516200053392919062000986565b60405180910390a46200054c83600089858589620005c0565b6200055d83600089898989620005c8565b50505050505050565b60408051600180825281830190925260609160009190602080830190803683370190505090508281600081518110620005af57634e487b7160e01b600052603260045260246000fd5b602090810291909101015292915050565b505050505050565b620005e7846001600160a01b03166200071060201b620007f61760201c565b15620005c05760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e619062000623908990899088908890889060040162000844565b602060405180830381600087803b1580156200063e57600080fd5b505af192505050801562000671575060408051601f3d908101601f191682019092526200066e91810190620007c5565b60015b620006dd576200068062000a31565b806308c379a01415620006c157506200069862000a49565b80620006a55750620006c3565b8060405162461bcd60e51b81526004016200046291906200088b565b505b60405162461bcd60e51b81526004016200046290620008a0565b6001600160e01b0319811663f23a6e6160e01b146200055d5760405162461bcd60e51b81526004016200046290620008fd565b6001600160a01b03163b151590565b8280546200072d90620009b9565b90600052602060002090601f0160209004810192826200075157600085556200079c565b82601f106200076c57805160ff19168380011785556200079c565b828001600101855582156200079c579182015b828111156200079c5782518255916020019190600101906200077f565b50620007aa929150620007ae565b5090565b5b80821115620007aa5760008155600101620007af565b600060208284031215620007d7578081fd5b81516001600160e01b031981168114620007ef578182fd5b9392505050565b60008151808452815b818110156200081d57602081850181015186830182015201620007ff565b818111156200082f5782602083870101525b50601f01601f19169290920160200192915050565b6001600160a01b03868116825285166020820152604081018490526060810183905260a0608082018190526000906200088090830184620007f6565b979650505050505050565b600060208252620007ef6020830184620007f6565b60208082526034908201527f455243313135353a207472616e7366657220746f206e6f6e204552433131353560408201527f526563656976657220696d706c656d656e746572000000000000000000000000606082015260800190565b60208082526028908201527f455243313135353a204552433131353552656365697665722072656a656374656040820152676420746f6b656e7360c01b606082015260800190565b60208082526021908201527f455243313135353a206d696e7420746f20746865207a65726f206164647265736040820152607360f81b606082015260800190565b918252602082015260400190565b60008219821115620009b457634e487b7160e01b81526011600452602481fd5b500190565b600281046001821680620009ce57607f821691505b60208210811415620009f057634e487b7160e01b600052602260045260246000fd5b50919050565b601f8201601f191681016001600160401b038111828210171562000a2a57634e487b7160e01b600052604160045260246000fd5b6040525050565b600060033d1115620003e457600481823e5160e01c90565b600060443d101562000a5b57620003e4565b6040516003193d81016004833e81513d6001600160401b03808311602484018310171562000a8e575050505050620003e4565b828501915081518181111562000aaa57505050505050620003e4565b843d870101602082850101111562000ac857505050505050620003e4565b62000ad960208286010187620009f6565b509094505050505090565b611e1c8062000af46000396000f3fe608060405234801561001057600080fd5b50600436106101ab5760003560e01c8062fdd58e146101b057806301ffc9a7146101d957806302fe5305146101f95780630e89341c1461020e5780631028ef581461022e57806313dc989f14610236578063153ee9e01461023e5780631f7fdffa146102465780631fd81bcd14610259578063256f801e146102615780632eb2c2d6146102695780633e4bee381461027c5780634679c834146102845780634e1273f41461028c5780635653e3ac146102ac5780635b2725ed146102b457806368c19671146102bc57806369f9901e146102c45780636a27d1cc146102cc578063715018a6146102d4578063731133e9146102dc5780638da5cb5b146102ef578063a22cb46514610304578063a80c0e2914610317578063b267158d1461031f578063c7c3c48b14610327578063d7340c571461032f578063e26e9a5f14610337578063e4861bdd1461033f578063e53a8a5f14610347578063e985e9c51461034f578063ec04327a14610362578063f242432a1461036a578063f2fde38b1461037d578063f5a9224a14610390578063ff2dff2d14610398575b600080fd5b6101c36101be366004611513565b6103a0565b6040516101d09190611be8565b60405180910390f35b6101ec6101e7366004611656565b6103f7565b6040516101d09190611870565b61020c61020736600461168e565b61043f565b005b61022161021c3660046116db565b610453565b6040516101d0919061187b565b6101c36104e7565b6101c36104ec565b6101c36104f1565b61020c610254366004611445565b6104f6565b6101c3610510565b6101c3610515565b61020c61027736600461133e565b61051a565b6101c3610578565b6101c361057d565b61029f61029a36600461158e565b610582565b6040516101d0919061182f565b6101c36106a1565b6101c36106a6565b6101c36106ab565b6101c36106b0565b6101c36106b5565b61020c6106ba565b61020c6102ea36600461153c565b6106ce565b6102f76106e2565b6040516101d09190611778565b61020c6103123660046114d9565b6106f2565b6101c3610708565b6101c361070d565b6101c3610712565b6101c3610717565b6101c361071c565b6101c3610721565b6101c3610726565b6101ec61035d36600461130c565b61072b565b6101c3610759565b61020c6103783660046113e3565b61075e565b61020c61038b3660046112f2565b6107b5565b6101c36107ec565b6101c36107f1565b60006001600160a01b0383166103d15760405162461bcd60e51b81526004016103c8906119bf565b60405180910390fd5b506000908152602081815260408083206001600160a01b03949094168352929052205490565b60006001600160e01b03198216636cdb3d1360e11b148061042857506001600160e01b031982166303a24d0760e21b145b80610437575061043782610805565b90505b919050565b61044761081e565b6104508161085d565b50565b60606002805461046290611c3a565b80601f016020809104026020016040519081016040528092919081815260200182805461048e90611c3a565b80156104db5780601f106104b0576101008083540402835291602001916104db565b820191906000526020600020905b8154815290600101906020018083116104be57829003601f168201915b50505050509050919050565b601281565b600f81565b601081565b6104fe61081e565b61050a84848484610870565b50505050565b600381565b600681565b6105226109ee565b6001600160a01b0316856001600160a01b0316148061054857506105488561035d6109ee565b6105645760405162461bcd60e51b81526004016103c8906118e2565b61057185858585856109f2565b5050505050565b600081565b601381565b606081518351146105a55760405162461bcd60e51b81526004016103c890611b16565b600083516001600160401b038111156105ce57634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156105f7578160200160208202803683370190505b50905060005b84518110156106995761065e85828151811061062957634e487b7160e01b600052603260045260246000fd5b602002602001015185838151811061065157634e487b7160e01b600052603260045260246000fd5b60200260200101516103a0565b82828151811061067e57634e487b7160e01b600052603260045260246000fd5b602090810291909101015261069281611ca1565b90506105fd565b509392505050565b600181565b600e81565b601581565b600281565b600581565b6106c261081e565b6106cc6000610bbf565b565b6106d661081e565b61050a84848484610c11565b6003546001600160a01b03165b90565b6107046106fd6109ee565b8383610d10565b5050565b601181565b601481565b600781565b600a81565b600c81565b600981565b600881565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b600b81565b6107666109ee565b6001600160a01b0316856001600160a01b0316148061078c575061078c8561035d6109ee565b6107a85760405162461bcd60e51b81526004016103c8906118e2565b6105718585858585610db3565b6107bd61081e565b6001600160a01b0381166107e35760405162461bcd60e51b81526004016103c890611979565b61045081610bbf565b600481565b600d81565b6001600160a01b03163b151590565b6001600160e01b031981166301ffc9a760e01b14919050565b6108266109ee565b6001600160a01b03166108376106e2565b6001600160a01b0316146106cc5760405162461bcd60e51b81526004016103c890611a98565b805161070490600290602084019061114d565b6001600160a01b0384166108965760405162461bcd60e51b81526004016103c890611ba7565b81518351146108b75760405162461bcd60e51b81526004016103c890611b5f565b60006108c16109ee565b90506108d281600087878787610bb7565b60005b8451811015610989578381815181106108fe57634e487b7160e01b600052603260045260246000fd5b602002602001015160008087848151811061092957634e487b7160e01b600052603260045260246000fd5b602002602001015181526020019081526020016000206000886001600160a01b03166001600160a01b0316815260200190815260200160002060008282546109719190611c22565b9091555081905061098181611ca1565b9150506108d5565b50846001600160a01b031660006001600160a01b0316826001600160a01b0316600080516020611da783398151915287876040516109c8929190611842565b60405180910390a46109df81600087878787610bb7565b61057181600087878787610efe565b3390565b8151835114610a135760405162461bcd60e51b81526004016103c890611b5f565b6001600160a01b038416610a395760405162461bcd60e51b81526004016103c890611a09565b6000610a436109ee565b9050610a53818787878787610bb7565b60005b8451811015610b55576000858281518110610a8157634e487b7160e01b600052603260045260246000fd5b602002602001015190506000858381518110610aad57634e487b7160e01b600052603260045260246000fd5b602090810291909101810151600084815280835260408082206001600160a01b038e168352909352919091205490915081811015610afd5760405162461bcd60e51b81526004016103c890611a4e565b6000838152602081815260408083206001600160a01b038e8116855292528083208585039055908b16825281208054849290610b3a908490611c22565b9250508190555050505080610b4e90611ca1565b9050610a56565b50846001600160a01b0316866001600160a01b0316826001600160a01b0316600080516020611da78339815191528787604051610b93929190611842565b60405180910390a4610ba9818787878787610bb7565b610bb7818787878787610efe565b505050505050565b600380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b038416610c375760405162461bcd60e51b81526004016103c890611ba7565b6000610c416109ee565b90506000610c4e85611023565b90506000610c5b85611023565b9050610c6c83600089858589610bb7565b6000868152602081815260408083206001600160a01b038b16845290915281208054879290610c9c908490611c22565b92505081905550866001600160a01b031660006001600160a01b0316846001600160a01b0316600080516020611dc78339815191528989604051610ce1929190611bf1565b60405180910390a4610cf883600089858589610bb7565b610d078360008989898961107c565b50505050505050565b816001600160a01b0316836001600160a01b03161415610d425760405162461bcd60e51b81526004016103c890611acd565b6001600160a01b0383811660008181526001602090815260408083209487168084529490915290819020805460ff1916851515179055517f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3190610da6908590611870565b60405180910390a3505050565b6001600160a01b038416610dd95760405162461bcd60e51b81526004016103c890611a09565b6000610de36109ee565b90506000610df085611023565b90506000610dfd85611023565b9050610e0d838989858589610bb7565b6000868152602081815260408083206001600160a01b038c16845290915290205485811015610e4e5760405162461bcd60e51b81526004016103c890611a4e565b6000878152602081815260408083206001600160a01b038d8116855292528083208985039055908a16825281208054889290610e8b908490611c22565b92505081905550876001600160a01b0316896001600160a01b0316856001600160a01b0316600080516020611dc78339815191528a8a604051610ecf929190611bf1565b60405180910390a4610ee5848a8a86868a610bb7565b610ef3848a8a8a8a8a61107c565b505050505050505050565b610f10846001600160a01b03166107f6565b15610bb75760405163bc197c8160e01b81526001600160a01b0385169063bc197c8190610f49908990899088908890889060040161178c565b602060405180830381600087803b158015610f6357600080fd5b505af1925050508015610f93575060408051601f3d908101601f19168201909252610f9091810190611672565b60015b610ff357610f9f611ce8565b806308c379a01415610fd95750610fb4611cff565b80610fbf5750610fdb565b8060405162461bcd60e51b81526004016103c8919061187b565b505b60405162461bcd60e51b81526004016103c89061188e565b6001600160e01b0319811663bc197c8160e01b14610d075760405162461bcd60e51b81526004016103c890611931565b6040805160018082528183019092526060916000919060208083019080368337019050509050828160008151811061106b57634e487b7160e01b600052603260045260246000fd5b602090810291909101015292915050565b61108e846001600160a01b03166107f6565b15610bb75760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e61906110c790899089908890889088906004016117ea565b602060405180830381600087803b1580156110e157600080fd5b505af1925050508015611111575060408051601f3d908101601f1916820190925261110e91810190611672565b60015b61111d57610f9f611ce8565b6001600160e01b0319811663f23a6e6160e01b14610d075760405162461bcd60e51b81526004016103c890611931565b82805461115990611c3a565b90600052602060002090601f01602090048101928261117b57600085556111c1565b82601f1061119457805160ff19168380011785556111c1565b828001600101855582156111c1579182015b828111156111c15782518255916020019190600101906111a6565b506111cd9291506111d1565b5090565b5b808211156111cd57600081556001016111d2565b60006001600160401b038311156111ff576111ff611cd2565b604051611216601f8501601f191660200182611c75565b80915083815284848401111561122b57600080fd5b83836020830137600060208583010152509392505050565b80356001600160a01b038116811461043a57600080fd5b600082601f83011261126a578081fd5b8135602061127782611bff565b6040516112848282611c75565b8381528281019150858301838502870184018810156112a1578586fd5b855b858110156112bf578135845292840192908401906001016112a3565b5090979650505050505050565b600082601f8301126112dc578081fd5b6112eb838335602085016111e6565b9392505050565b600060208284031215611303578081fd5b6112eb82611243565b6000806040838503121561131e578081fd5b61132783611243565b915061133560208401611243565b90509250929050565b600080600080600060a08688031215611355578081fd5b61135e86611243565b945061136c60208701611243565b935060408601356001600160401b0380821115611387578283fd5b61139389838a0161125a565b945060608801359150808211156113a8578283fd5b6113b489838a0161125a565b935060808801359150808211156113c9578283fd5b506113d6888289016112cc565b9150509295509295909350565b600080600080600060a086880312156113fa578081fd5b61140386611243565b945061141160208701611243565b9350604086013592506060860135915060808601356001600160401b03811115611439578182fd5b6113d6888289016112cc565b6000806000806080858703121561145a578384fd5b61146385611243565b935060208501356001600160401b038082111561147e578485fd5b61148a8883890161125a565b9450604087013591508082111561149f578384fd5b6114ab8883890161125a565b935060608701359150808211156114c0578283fd5b506114cd878288016112cc565b91505092959194509250565b600080604083850312156114eb578182fd5b6114f483611243565b915060208301358015158114611508578182fd5b809150509250929050565b60008060408385031215611525578182fd5b61152e83611243565b946020939093013593505050565b60008060008060808587031215611551578182fd5b61155a85611243565b9350602085013592506040850135915060608501356001600160401b03811115611582578182fd5b6114cd878288016112cc565b600080604083850312156115a0578182fd5b82356001600160401b03808211156115b6578384fd5b818501915085601f8301126115c9578384fd5b813560206115d682611bff565b6040516115e38282611c75565b8381528281019150858301838502870184018b1015611600578889fd5b8896505b848710156116295761161581611243565b835260019690960195918301918301611604565b509650508601359250508082111561163f578283fd5b5061164c8582860161125a565b9150509250929050565b600060208284031215611667578081fd5b81356112eb81611d90565b600060208284031215611683578081fd5b81516112eb81611d90565b60006020828403121561169f578081fd5b81356001600160401b038111156116b4578182fd5b8201601f810184136116c4578182fd5b6116d3848235602084016111e6565b949350505050565b6000602082840312156116ec578081fd5b5035919050565b6000815180845260208085019450808401835b8381101561172257815187529582019590820190600101611706565b509495945050505050565b60008151808452815b8181101561175257602081850181015186830182015201611736565b818111156117635782602083870101525b50601f01601f19169290920160200192915050565b6001600160a01b0391909116815260200190565b6001600160a01b0386811682528516602082015260a0604082018190526000906117b8908301866116f3565b82810360608401526117ca81866116f3565b905082810360808401526117de818561172d565b98975050505050505050565b6001600160a01b03868116825285166020820152604081018490526060810183905260a0608082018190526000906118249083018461172d565b979650505050505050565b6000602082526112eb60208301846116f3565b60006040825261185560408301856116f3565b828103602084015261186781856116f3565b95945050505050565b901515815260200190565b6000602082526112eb602083018461172d565b60208082526034908201527f455243313135353a207472616e7366657220746f206e6f6e20455243313135356040820152732932b1b2b4bb32b91034b6b83632b6b2b73a32b960611b606082015260800190565b6020808252602f908201527f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60408201526e195c881b9bdc88185c1c1c9bdd9959608a1b606082015260800190565b60208082526028908201527f455243313135353a204552433131353552656365697665722072656a656374656040820152676420746f6b656e7360c01b606082015260800190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b6020808252602a908201527f455243313135353a2061646472657373207a65726f206973206e6f742061207660408201526930b634b21037bbb732b960b11b606082015260800190565b60208082526025908201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604082015264647265737360d81b606082015260800190565b6020808252602a908201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60408201526939103a3930b739b332b960b11b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526029908201527f455243313135353a2073657474696e6720617070726f76616c20737461747573604082015268103337b91039b2b63360b91b606082015260800190565b60208082526029908201527f455243313135353a206163636f756e747320616e6420696473206c656e677468604082015268040dad2e6dac2e8c6d60bb1b606082015260800190565b60208082526028908201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206040820152670dad2e6dac2e8c6d60c31b606082015260800190565b60208082526021908201527f455243313135353a206d696e7420746f20746865207a65726f206164647265736040820152607360f81b606082015260800190565b90815260200190565b918252602082015260400190565b60006001600160401b03821115611c1857611c18611cd2565b5060209081020190565b60008219821115611c3557611c35611cbc565b500190565b600281046001821680611c4e57607f821691505b60208210811415611c6f57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8201601f191681016001600160401b0381118282101715611c9a57611c9a611cd2565b6040525050565b6000600019821415611cb557611cb5611cbc565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b600060033d11156106ef57600481823e5160e01c90565b600060443d1015611d0f576106ef565b6040516003193d81016004833e81513d6001600160401b038083116024840183101715611d405750505050506106ef565b8285019150815181811115611d5a575050505050506106ef565b843d8701016020828501011115611d76575050505050506106ef565b611d8560208286010187611c75565b509094505050505090565b6001600160e01b03198116811461045057600080fdfe4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fbc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62a26469706673582212201d64213fe6b1852452b6f4eb825d6c7e22f5ec777875f2c1394a7e92efd86e8364736f6c6343000801003368747470733a2f2f686973746f7069612e696f2f6170692f6974656d2f7b69647d2e6a736f6e";

type ResourcesConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ResourcesConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Resources__factory extends ContractFactory {
  constructor(...args: ResourcesConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Resources> {
    return super.deploy(overrides || {}) as Promise<Resources>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Resources {
    return super.attach(address) as Resources;
  }
  override connect(signer: Signer): Resources__factory {
    return super.connect(signer) as Resources__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ResourcesInterface {
    return new utils.Interface(_abi) as ResourcesInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Resources {
    return new Contract(address, _abi, signerOrProvider) as Resources;
  }
}