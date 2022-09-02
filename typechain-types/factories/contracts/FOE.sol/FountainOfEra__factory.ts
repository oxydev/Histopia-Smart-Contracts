/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  FountainOfEra,
  FountainOfEraInterface,
} from "../../../contracts/FOE.sol/FountainOfEra";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_eraAllocatorAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_histopiaNFT",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_eraPerBlock",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "userMilitaryPower",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalMilitaryPower",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "EmergencyWithdraw",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Harvest",
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
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "userMilitaryPower",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalMilitaryPower",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "typeId",
        type: "uint256",
      },
    ],
    name: "addHistopianType",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "properties",
        type: "uint256[]",
      },
    ],
    name: "calculateMilitaryPower",
    outputs: [
      {
        internalType: "uint256",
        name: "militaryPower",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "calculateMilitaryPowerOfTokenId",
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
    name: "currentTotalMilitaryPower",
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
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "era",
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
    name: "eraAllocator",
    outputs: [
      {
        internalType: "contract Allocator",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eraPerBlock",
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
    name: "generalAccEraPerShare",
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
        internalType: "uint256",
        name: "_from",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_to",
        type: "uint256",
      },
    ],
    name: "getMultiplier",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getTokenIds",
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
    inputs: [],
    name: "harvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "histopianCount",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "histopianTypes",
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
    inputs: [],
    name: "lastBlock",
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
    name: "lastRewardBlock",
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
    name: "nftContract",
    outputs: [
      {
        internalType: "contract INFT",
        name: "",
        type: "address",
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
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "pendingERA",
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
    name: "renounceOwnership",
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
  {
    inputs: [],
    name: "updatePool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "militaryPower",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardDebt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIndices",
        type: "uint256[]",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001ccc38038062001ccc8339810160408190526200003491620001b1565b62000048620000426200011c565b62000120565b600280546001600160a01b0319166001600160a01b038581169190911791829055600483815560408051631a205bc560e31b81529051939092169263d102de289280830192602092918290030181600087803b158015620000a857600080fd5b505af1158015620000bd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000e391906200018d565b600380546001600160a01b039283166001600160a01b031991821617909155600180549490921693169290921790915550620001f19050565b3390565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146200018857600080fd5b919050565b6000602082840312156200019f578081fd5b620001aa8262000170565b9392505050565b600080600060608486031215620001c6578182fd5b620001d18462000170565b9250620001e16020850162000170565b9150604084015190509250925092565b611acb80620002016000396000f3fe608060405234801561001057600080fd5b50600436106101335760003560e01c806305de54c914610138578063143e55e0146101565780631959a0021461016b57806340de5fe21461018c5780634641257d146101ac578063598b8e71146101b65780635b1d7813146101c9578063715018a6146101d157806379a1ecd0146101d9578063806b984f146101e157806386aeab5b146101e95780638da5cb5b146101f15780638dbb1e3a146101f957806392846b8a1461020c578063978dcfa01461021f578063983d95ce14610232578063a9f8d18114610245578063b80224be1461024d578063cdf5aa4514610260578063ce28135e14610268578063d004b0361461027b578063d56d229d1461029b578063db2e21bc146102a3578063e3161ddd146102ab578063f2fde38b146102b3575b600080fd5b6101406102c6565b60405161014d919061193f565b60405180910390f35b61015e6102cc565b60405161014d919061173e565b61017e6101793660046114e7565b6102db565b60405161014d929190611948565b61019f61019a3660046116b3565b6102f4565b60405161014d9190611852565b6101b4610309565b005b6101b46101c436600461150e565b6103b9565b61015e610710565b6101b461071f565b610140610733565b610140610739565b61014061073f565b61015e610745565b6101406102073660046116e3565b610754565b6101b461021a3660046116b3565b610767565b61014061022d36600461157c565b61078a565b6101b461024036600461150e565b6107e4565b610140610e3b565b61014061025b3660046116b3565b610e41565b610140610ed2565b6101406102763660046114e7565b610ed8565b61028e6102893660046114e7565b610f8c565b60405161014d91906117d3565b61015e610ffb565b6101b461100a565b6101b4611169565b6101b46102c13660046114e7565b611248565b60095481565b6003546001600160a01b031681565b600a602052600090815260409020805460019091015482565b600b6020526000908152604090205460ff1681565b336000908152600a60205260409020610320611169565b6000816001015464e8d4a51000600654846000015461033f91906119e1565b61034991906119c1565b6103539190611a00565b905061035f3382611282565b336001600160a01b0316600080516020611a7683398151915282604051610386919061193f565b60405180910390a2600654825464e8d4a51000916103a3916119e1565b6103ad91906119c1565b82600101819055505050565b336000908152600a602052604090206103d0611169565b805415610447576000816001015464e8d4a5100060065484600001546103f691906119e1565b61040091906119c1565b61040a9190611a00565b90506104163382611282565b336001600160a01b0316600080516020611a768339815191528260405161043d919061193f565b60405180910390a2505b828290506009600082825461045c91906119a9565b9091555060009050805b8381101561067057600154600b906000906001600160a01b0316630d5242948888868181106104a557634e487b7160e01b600052603260045260246000fd5b905060200201356040518263ffffffff1660e01b81526004016104c8919061193f565b602060405180830381600087803b1580156104e257600080fd5b505af11580156104f6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061051a91906116cb565b815260208101919091526040016000205460ff166105535760405162461bcd60e51b815260040161054a9061190a565b60405180910390fd5b6001546001600160a01b03166323b872dd333088888681811061058657634e487b7160e01b600052603260045260246000fd5b905060200201356040518463ffffffff1660e01b81526004016105ab93929190611752565b600060405180830381600087803b1580156105c557600080fd5b505af11580156105d9573d6000803e3d6000fd5b5050505061060c85858381811061060057634e487b7160e01b600052603260045260246000fd5b90506020020135610e41565b61061690836119a9565b91508260020185858381811061063c57634e487b7160e01b600052603260045260246000fd5b835460018101855560009485526020948590209190940292909201359190920155508061066881611a2e565b915050610466565b508082600001600082825461068591906119a9565b92505081905550806008600082825461069e91906119a9565b9091555050600654825464e8d4a51000916106b8916119e1565b6106c291906119c1565b6001830155815460085460405133927f49ec6984156c4fe356d769a26a312447642a93e6abeb94621300304132f33999926107029289928992909161178f565b60405180910390a250505050565b6002546001600160a01b031681565b610727611422565b6107316000611461565b565b60085481565b60075481565b60065481565b6000546001600160a01b031690565b60006107608383611a00565b9392505050565b61076f611422565b6000908152600b60205260409020805460ff19166001179055565b6000805b82518110156107de578281815181106107b757634e487b7160e01b600052603260045260246000fd5b6020026020010151826107ca91906119a9565b9150806107d681611a2e565b91505061078e565b50919050565b336000908152600a602052604090206107fb611169565b6000816001015464e8d4a51000600654846000015461081a91906119e1565b61082491906119c1565b61082e9190611a00565b905061083a3382611282565b336001600160a01b0316600080516020611a7683398151915282604051610861919061193f565b60405180910390a2838390506009600082825461087e9190611a00565b909155506000905080846001600160401b038111156108ad57634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156108d6578160200160208202803683370190505b50905060005b85811015610b3457600285015487878381811061090957634e487b7160e01b600052603260045260246000fd5b905060200201351061092d5760405162461bcd60e51b815260040161054a9061185d565b8460020187878381811061095157634e487b7160e01b600052603260045260246000fd5b905060200201358154811061097657634e487b7160e01b600052603260045260246000fd5b90600052602060002001548282815181106109a157634e487b7160e01b600052603260045260246000fd5b60209081029190910101526001546001600160a01b03166323b872dd3033600289018b8b878181106109e357634e487b7160e01b600052603260045260246000fd5b9050602002013581548110610a0857634e487b7160e01b600052603260045260246000fd5b90600052602060002001546040518463ffffffff1660e01b8152600401610a3193929190611752565b600060405180830381600087803b158015610a4b57600080fd5b505af1158015610a5f573d6000803e3d6000fd5b50505050610abf85600201888884818110610a8a57634e487b7160e01b600052603260045260246000fd5b9050602002013581548110610aaf57634e487b7160e01b600052603260045260246000fd5b9060005260206000200154610e41565b610ac990846119a9565b9250600085600201888884818110610af157634e487b7160e01b600052603260045260246000fd5b9050602002013581548110610b1657634e487b7160e01b600052603260045260246000fd5b60009182526020909120015580610b2c81611a2e565b9150506108dc565b5081846000016000828254610b499190611a00565b925050819055508160086000828254610b629190611a00565b9091555050835460085460405133927fde6c06f4e097b6ce2914182d0ef02586f464ae018b34b46328f4eff13832221492610ba092869291906117e6565b60405180910390a2845b8015610e0b576000610bbd600183611a00565b6002870154909150610bd190600190611a00565b888883818110610bf157634e487b7160e01b600052603260045260246000fd5b905060200201351115610c045750610df9565b60005b80158015610c185750600287015415155b15610ca057600287018054610c2f90600190611a00565b81548110610c4d57634e487b7160e01b600052603260045260246000fd5b906000526020600020015490508060001415610c9b5786600201805480610c8457634e487b7160e01b600052603160045260246000fd5b600190038181906000526020600020016000905590555b610c07565b6002870154610cb0575050610e0b565b6002870154610cc190600190611a00565b898984818110610ce157634e487b7160e01b600052603260045260246000fd5b905060200201351415610d2a5786600201805480610d0f57634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055610df6565b6002870154610d3b90600190611a00565b898984818110610d5b57634e487b7160e01b600052603260045260246000fd5b905060200201351015610df65780876002018a8a85818110610d8d57634e487b7160e01b600052603260045260246000fd5b9050602002013581548110610db257634e487b7160e01b600052603260045260246000fd5b60009182526020909120015560028701805480610ddf57634e487b7160e01b600052603160045260246000fd5b600190038181906000526020600020016000905590555b50505b80610e0381611a17565b915050610baa565b50600654845464e8d4a5100091610e21916119e1565b610e2b91906119c1565b8460010181905550505050505050565b60055481565b600154604051634edea11160e01b8152600091610ecc916001600160a01b0390911690634edea11190610e7890869060040161193f565b60006040518083038186803b158015610e9057600080fd5b505afa158015610ea4573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261022d9190810190611610565b92915050565b60045481565b6001600160a01b0381166000908152600a6020526040812060065460085460055443118015610f0657508015155b15610f56576000610f1960055443610754565b9050600060045482610f2b91906119e1565b905082610f3d8264e8d4a510006119e1565b610f4791906119c1565b610f5190856119a9565b935050505b6001830154835464e8d4a5100090610f6f9085906119e1565b610f7991906119c1565b610f839190611a00565b95945050505050565b6001600160a01b0381166000908152600a6020908152604091829020600201805483518184028101840190945280845260609392830182828015610fef57602002820191906000526020600020905b815481526020019060010190808311610fdb575b50505050509050919050565b6001546001600160a01b031681565b336000908152600a60205260408120905b60028201548110156110d3576001546002830180546001600160a01b03909216916323b872dd9130913391908690811061106557634e487b7160e01b600052603260045260246000fd5b90600052602060002001546040518463ffffffff1660e01b815260040161108e93929190611752565b600060405180830381600087803b1580156110a857600080fd5b505af11580156110bc573d6000803e3d6000fd5b5050505080806110cb90611a2e565b91505061101b565b50336001600160a01b03167f1ad6082f7aa3e32095e38fd4c0bf76fa2bb7584e81474cf3519d2dea4081181c82600201604051611110919061180b565b60405180910390a260028101546009805460009061112f908490611a00565b9091555061114390506002820160006114b5565b805460088054600090611157908490611a00565b90915550506000600182018190559055565b600554431161117757610731565b6008546111875743600555610731565b600061119560055443610754565b90506000600454826111a791906119e1565b6002546040516301e0b8b960e11b81529192506001600160a01b0316906303c17172906111da9030908590600401611776565b600060405180830381600087803b1580156111f457600080fd5b505af1158015611208573d6000803e3d6000fd5b505050506008548164e8d4a5100061122091906119e1565b61122a91906119c1565b6006600082825461123b91906119a9565b9091555050436005555050565b611250611422565b6001600160a01b0381166112765760405162461bcd60e51b815260040161054a9061188f565b61127f81611461565b50565b6003546040516370a0823160e01b81526000916001600160a01b0316906370a08231906112b390309060040161173e565b60206040518083038186803b1580156112cb57600080fd5b505afa1580156112df573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061130391906116cb565b9050808211156113975760035460405163a9059cbb60e01b81526001600160a01b039091169063a9059cbb9061133f9086908590600401611776565b602060405180830381600087803b15801561135957600080fd5b505af115801561136d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113919190611693565b5061141d565b60035460405163a9059cbb60e01b81526001600160a01b039091169063a9059cbb906113c99086908690600401611776565b602060405180830381600087803b1580156113e357600080fd5b505af11580156113f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061141b9190611693565b505b505050565b61142a6114b1565b6001600160a01b031661143b610745565b6001600160a01b0316146107315760405162461bcd60e51b815260040161054a906118d5565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b3390565b508054600082559060005260206000209081019061127f91905b808211156114e357600081556001016114cf565b5090565b6000602082840312156114f8578081fd5b81356001600160a01b0381168114610760578182fd5b60008060208385031215611520578081fd5b82356001600160401b0380821115611536578283fd5b818501915085601f830112611549578283fd5b813581811115611557578384fd5b866020808302850101111561156a578384fd5b60209290920196919550909350505050565b6000602080838503121561158e578182fd5b82356001600160401b038111156115a3578283fd5b8301601f810185136115b3578283fd5b80356115c66115c182611986565b611956565b81815283810190838501858402850186018910156115e2578687fd5b8694505b838510156116045780358352600194909401939185019185016115e6565b50979650505050505050565b60006020808385031215611622578182fd5b82516001600160401b03811115611637578283fd5b8301601f81018513611647578283fd5b80516116556115c182611986565b8181528381019083850185840285018601891015611671578687fd5b8694505b83851015611604578051835260019490940193918501918501611675565b6000602082840312156116a4578081fd5b81518015158114610760578182fd5b6000602082840312156116c4578081fd5b5035919050565b6000602082840312156116dc578081fd5b5051919050565b600080604083850312156116f5578182fd5b50508035926020909101359150565b6000815180845260208085019450808401835b8381101561173357815187529582019590820190600101611717565b509495945050505050565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03929092168252602082015260400190565b6060808252810184905260006001600160fb1b038511156117ae578081fd5b6020850280876080850137820160800190815260208201939093526040015292915050565b6000602082526107606020830184611704565b6000606082526117f96060830186611704565b60208301949094525060400152919050565b6020808252825482820181905260008481528281209092916040850190845b818110156118465783548352600193840193928501920161182a565b50909695505050505050565b901515815260200190565b60208082526018908201527708c9e8a744092dcecc2d8d2c840e8ded6cadc40d2dcc8caf60431b604082015260600190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6020808252818101527f464f453a20596f7572204e4654206973206e6f7420486973746f7069616e212e604082015260600190565b90815260200190565b918252602082015260400190565b604051601f8201601f191681016001600160401b038111828210171561197e5761197e611a5f565b604052919050565b60006001600160401b0382111561199f5761199f611a5f565b5060209081020190565b600082198211156119bc576119bc611a49565b500190565b6000826119dc57634e487b7160e01b81526012600452602481fd5b500490565b60008160001904831182151516156119fb576119fb611a49565b500290565b600082821015611a1257611a12611a49565b500390565b600081611a2657611a26611a49565b506000190190565b6000600019821415611a4257611a42611a49565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfec9695243a805adb74c91f28311176c65b417e842d5699893cef56d18bfa48cbaa2646970667358221220c2b7e3684c96f545a386133fb5c6fb15256537a3a7c89fb007bea6629ccabb2764736f6c63430008010033";

type FountainOfEraConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FountainOfEraConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FountainOfEra__factory extends ContractFactory {
  constructor(...args: FountainOfEraConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _eraAllocatorAddress: PromiseOrValue<string>,
    _histopiaNFT: PromiseOrValue<string>,
    _eraPerBlock: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FountainOfEra> {
    return super.deploy(
      _eraAllocatorAddress,
      _histopiaNFT,
      _eraPerBlock,
      overrides || {}
    ) as Promise<FountainOfEra>;
  }
  override getDeployTransaction(
    _eraAllocatorAddress: PromiseOrValue<string>,
    _histopiaNFT: PromiseOrValue<string>,
    _eraPerBlock: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _eraAllocatorAddress,
      _histopiaNFT,
      _eraPerBlock,
      overrides || {}
    );
  }
  override attach(address: string): FountainOfEra {
    return super.attach(address) as FountainOfEra;
  }
  override connect(signer: Signer): FountainOfEra__factory {
    return super.connect(signer) as FountainOfEra__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FountainOfEraInterface {
    return new utils.Interface(_abi) as FountainOfEraInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FountainOfEra {
    return new Contract(address, _abi, signerOrProvider) as FountainOfEra;
  }
}