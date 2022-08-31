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
  "0x60806040523480156200001157600080fd5b5060405162001eef38038062001eef8339810160408190526200003491620001b1565b62000048620000426200011c565b62000120565b600280546001600160a01b0319166001600160a01b038581169190911791829055600483815560408051631a205bc560e31b81529051939092169263d102de289280830192602092918290030181600087803b158015620000a857600080fd5b505af1158015620000bd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000e391906200018d565b600380546001600160a01b039283166001600160a01b031991821617909155600180549490921693169290921790915550620001f19050565b3390565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146200018857600080fd5b919050565b6000602082840312156200019f578081fd5b620001aa8262000170565b9392505050565b600080600060608486031215620001c6578182fd5b620001d18462000170565b9250620001e16020850162000170565b9150604084015190509250925092565b611cee80620002016000396000f3fe608060405234801561001057600080fd5b50600436106101335760003560e01c806305de54c914610138578063143e55e0146101565780631959a0021461016b57806340de5fe21461018c5780634641257d146101ac578063598b8e71146101b65780635b1d7813146101c9578063715018a6146101d157806379a1ecd0146101d9578063806b984f146101e157806386aeab5b146101e95780638da5cb5b146101f15780638dbb1e3a146101f957806392846b8a1461020c578063978dcfa01461021f578063983d95ce14610232578063a9f8d18114610245578063b80224be1461024d578063cdf5aa4514610260578063ce28135e14610268578063d004b0361461027b578063d56d229d1461029b578063db2e21bc146102a3578063e3161ddd146102ab578063f2fde38b146102b3575b600080fd5b6101406102c6565b60405161014d9190611b62565b60405180910390f35b61015e6102cc565b60405161014d9190611910565b61017e61017936600461166e565b6102db565b60405161014d929190611b6b565b61019f61019a36600461183a565b6102f4565b60405161014d9190611a24565b6101b4610309565b005b6101b46101c4366004611695565b6103b9565b61015e610710565b6101b461071f565b610140610733565b610140610739565b61014061073f565b61015e610745565b61014061020736600461186a565b610754565b6101b461021a36600461183a565b610767565b61014061022d366004611703565b61078a565b6101b4610240366004611695565b6107e4565b610140610f0f565b61014061025b36600461183a565b610f15565b610140610fa6565b61014061027636600461166e565b610fac565b61028e61028936600461166e565b611060565b60405161014d91906119a5565b61015e6110cf565b6101b46110de565b6101b461123d565b6101b46102c136600461166e565b61131c565b60095481565b6003546001600160a01b031681565b600a602052600090815260409020805460019091015482565b600b6020526000908152604090205460ff1681565b336000908152600a6020526040902061032061123d565b6000816001015464e8d4a51000600654846000015461033f9190611c04565b6103499190611be4565b6103539190611c23565b905061035f3382611356565b336001600160a01b0316600080516020611c99833981519152826040516103869190611b62565b60405180910390a2600654825464e8d4a51000916103a391611c04565b6103ad9190611be4565b82600101819055505050565b336000908152600a602052604090206103d061123d565b805415610447576000816001015464e8d4a5100060065484600001546103f69190611c04565b6104009190611be4565b61040a9190611c23565b90506104163382611356565b336001600160a01b0316600080516020611c998339815191528260405161043d9190611b62565b60405180910390a2505b828290506009600082825461045c9190611bcc565b9091555060009050805b8381101561067057600154600b906000906001600160a01b0316630d5242948888868181106104a557634e487b7160e01b600052603260045260246000fd5b905060200201356040518263ffffffff1660e01b81526004016104c89190611b62565b602060405180830381600087803b1580156104e257600080fd5b505af11580156104f6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061051a9190611852565b815260208101919091526040016000205460ff166105535760405162461bcd60e51b815260040161054a90611b2d565b60405180910390fd5b6001546001600160a01b03166323b872dd333088888681811061058657634e487b7160e01b600052603260045260246000fd5b905060200201356040518463ffffffff1660e01b81526004016105ab93929190611924565b600060405180830381600087803b1580156105c557600080fd5b505af11580156105d9573d6000803e3d6000fd5b5050505061060c85858381811061060057634e487b7160e01b600052603260045260246000fd5b90506020020135610f15565b6106169083611bcc565b91508260020185858381811061063c57634e487b7160e01b600052603260045260246000fd5b835460018101855560009485526020948590209190940292909201359190920155508061066881611c51565b915050610466565b50808260000160008282546106859190611bcc565b92505081905550806008600082825461069e9190611bcc565b9091555050600654825464e8d4a51000916106b891611c04565b6106c29190611be4565b6001830155815460085460405133927f49ec6984156c4fe356d769a26a312447642a93e6abeb94621300304132f339999261070292899289929091611961565b60405180910390a250505050565b6002546001600160a01b031681565b6107276114f6565b6107316000611535565b565b60085481565b60075481565b60065481565b6000546001600160a01b031690565b60006107608383611c23565b9392505050565b61076f6114f6565b6000908152600b60205260409020805460ff19166001179055565b6000805b82518110156107de578281815181106107b757634e487b7160e01b600052603260045260246000fd5b6020026020010151826107ca9190611bcc565b9150806107d681611c51565b91505061078e565b50919050565b336000908152600a602052604090206107fb61123d565b6000816001015464e8d4a51000600654846000015461081a9190611c04565b6108249190611be4565b61082e9190611c23565b905061083a3382611356565b336001600160a01b0316600080516020611c99833981519152826040516108619190611b62565b60405180910390a2838390506009600082825461087e9190611c23565b909155506000905080846001600160401b038111156108ad57634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156108d6578160200160208202803683370190505b50905060005b85811015610b3457600285015487878381811061090957634e487b7160e01b600052603260045260246000fd5b905060200201351061092d5760405162461bcd60e51b815260040161054a90611a80565b8460020187878381811061095157634e487b7160e01b600052603260045260246000fd5b905060200201358154811061097657634e487b7160e01b600052603260045260246000fd5b90600052602060002001548282815181106109a157634e487b7160e01b600052603260045260246000fd5b60209081029190910101526001546001600160a01b03166323b872dd3033600289018b8b878181106109e357634e487b7160e01b600052603260045260246000fd5b9050602002013581548110610a0857634e487b7160e01b600052603260045260246000fd5b90600052602060002001546040518463ffffffff1660e01b8152600401610a3193929190611924565b600060405180830381600087803b158015610a4b57600080fd5b505af1158015610a5f573d6000803e3d6000fd5b50505050610abf85600201888884818110610a8a57634e487b7160e01b600052603260045260246000fd5b9050602002013581548110610aaf57634e487b7160e01b600052603260045260246000fd5b9060005260206000200154610f15565b610ac99084611bcc565b9250600085600201888884818110610af157634e487b7160e01b600052603260045260246000fd5b9050602002013581548110610b1657634e487b7160e01b600052603260045260246000fd5b60009182526020909120015580610b2c81611c51565b9150506108dc565b5081846000016000828254610b499190611c23565b925050819055508160086000828254610b629190611c23565b9091555050835460085460405133927fde6c06f4e097b6ce2914182d0ef02586f464ae018b34b46328f4eff13832221492610ba092869291906119b8565b60405180910390a2845b8015610edf576000610bbd600183611c23565b9050610c15604051806040016040528060058152602001640d2dcc8caf60db1b815250898984818110610c0057634e487b7160e01b600052603260045260246000fd5b90506020020135886002018054905084611585565b60005b6002870154811015610c9357610c816040518060400160405280600e81526020016d03ab9b2b9173a37b5b2b724a239960951b815250886002018381548110610c7157634e487b7160e01b600052603260045260246000fd5b90600052602060002001546115ce565b80610c8b81611c51565b915050610c18565b506002860154610ca590600190611c23565b888883818110610cc557634e487b7160e01b600052603260045260246000fd5b905060200201351115610cd85750610ecd565b60005b80158015610cec5750600287015415155b15610d7457600287018054610d0390600190611c23565b81548110610d2157634e487b7160e01b600052603260045260246000fd5b906000526020600020015490508060001415610d6f5786600201805480610d5857634e487b7160e01b600052603160045260246000fd5b600190038181906000526020600020016000905590555b610cdb565b6002870154610d84575050610edf565b6002870154610d9590600190611c23565b898984818110610db557634e487b7160e01b600052603260045260246000fd5b905060200201351415610dfe5786600201805480610de357634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055610eca565b6002870154610e0f90600190611c23565b898984818110610e2f57634e487b7160e01b600052603260045260246000fd5b905060200201351015610eca5780876002018a8a85818110610e6157634e487b7160e01b600052603260045260246000fd5b9050602002013581548110610e8657634e487b7160e01b600052603260045260246000fd5b60009182526020909120015560028701805480610eb357634e487b7160e01b600052603160045260246000fd5b600190038181906000526020600020016000905590555b50505b80610ed781611c3a565b915050610baa565b50600654845464e8d4a5100091610ef591611c04565b610eff9190611be4565b8460010181905550505050505050565b60055481565b60015460405163a3f61b3160e01b8152600091610fa0916001600160a01b039091169063a3f61b3190610f4c908690600401611b62565b60006040518083038186803b158015610f6457600080fd5b505afa158015610f78573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261022d9190810190611797565b92915050565b60045481565b6001600160a01b0381166000908152600a6020526040812060065460085460055443118015610fda57508015155b1561102a576000610fed60055443610754565b9050600060045482610fff9190611c04565b9050826110118264e8d4a51000611c04565b61101b9190611be4565b6110259085611bcc565b935050505b6001830154835464e8d4a5100090611043908590611c04565b61104d9190611be4565b6110579190611c23565b95945050505050565b6001600160a01b0381166000908152600a60209081526040918290206002018054835181840281018401909452808452606093928301828280156110c357602002820191906000526020600020905b8154815260200190600101908083116110af575b50505050509050919050565b6001546001600160a01b031681565b336000908152600a60205260408120905b60028201548110156111a7576001546002830180546001600160a01b03909216916323b872dd9130913391908690811061113957634e487b7160e01b600052603260045260246000fd5b90600052602060002001546040518463ffffffff1660e01b815260040161116293929190611924565b600060405180830381600087803b15801561117c57600080fd5b505af1158015611190573d6000803e3d6000fd5b50505050808061119f90611c51565b9150506110ef565b50336001600160a01b03167f1ad6082f7aa3e32095e38fd4c0bf76fa2bb7584e81474cf3519d2dea4081181c826002016040516111e491906119dd565b60405180910390a2600281015460098054600090611203908490611c23565b90915550611217905060028201600061163c565b80546008805460009061122b908490611c23565b90915550506000600182018190559055565b600554431161124b57610731565b60085461125b5743600555610731565b600061126960055443610754565b905060006004548261127b9190611c04565b6002546040516301e0b8b960e11b81529192506001600160a01b0316906303c17172906112ae9030908590600401611948565b600060405180830381600087803b1580156112c857600080fd5b505af11580156112dc573d6000803e3d6000fd5b505050506008548164e8d4a510006112f49190611c04565b6112fe9190611be4565b6006600082825461130f9190611bcc565b9091555050436005555050565b6113246114f6565b6001600160a01b03811661134a5760405162461bcd60e51b815260040161054a90611ab2565b61135381611535565b50565b6003546040516370a0823160e01b81526000916001600160a01b0316906370a0823190611387903090600401611910565b60206040518083038186803b15801561139f57600080fd5b505afa1580156113b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113d79190611852565b90508082111561146b5760035460405163a9059cbb60e01b81526001600160a01b039091169063a9059cbb906114139086908590600401611948565b602060405180830381600087803b15801561142d57600080fd5b505af1158015611441573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611465919061181a565b506114f1565b60035460405163a9059cbb60e01b81526001600160a01b039091169063a9059cbb9061149d9086908690600401611948565b602060405180830381600087803b1580156114b757600080fd5b505af11580156114cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114ef919061181a565b505b505050565b6114fe611617565b6001600160a01b031661150f610745565b6001600160a01b0316146107315760405162461bcd60e51b815260040161054a90611af8565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6114ef8484848460405160240161159f9493929190611a51565b60408051601f198184030181529190526020810180516001600160e01b03166304772b3360e11b17905261161b565b61161382826040516024016115e4929190611a2f565b60408051601f198184030181529190526020810180516001600160e01b03166309710a9d60e41b17905261161b565b5050565b3390565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b508054600082559060005260206000209081019061135391905b8082111561166a5760008155600101611656565b5090565b60006020828403121561167f578081fd5b81356001600160a01b0381168114610760578182fd5b600080602083850312156116a7578081fd5b82356001600160401b03808211156116bd578283fd5b818501915085601f8301126116d0578283fd5b8135818111156116de578384fd5b86602080830285010111156116f1578384fd5b60209290920196919550909350505050565b60006020808385031215611715578182fd5b82356001600160401b0381111561172a578283fd5b8301601f8101851361173a578283fd5b803561174d61174882611ba9565b611b79565b8181528381019083850185840285018601891015611769578687fd5b8694505b8385101561178b57803583526001949094019391850191850161176d565b50979650505050505050565b600060208083850312156117a9578182fd5b82516001600160401b038111156117be578283fd5b8301601f810185136117ce578283fd5b80516117dc61174882611ba9565b81815283810190838501858402850186018910156117f8578687fd5b8694505b8385101561178b5780518352600194909401939185019185016117fc565b60006020828403121561182b578081fd5b81518015158114610760578182fd5b60006020828403121561184b578081fd5b5035919050565b600060208284031215611863578081fd5b5051919050565b6000806040838503121561187c578182fd5b50508035926020909101359150565b6000815180845260208085019450808401835b838110156118ba5781518752958201959082019060010161189e565b509495945050505050565b60008151808452815b818110156118ea576020818501810151868301820152016118ce565b818111156118fb5782602083870101525b50601f01601f19169290920160200192915050565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03929092168252602082015260400190565b6060808252810184905260006001600160fb1b03851115611980578081fd5b6020850280876080850137820160800190815260208201939093526040015292915050565b600060208252610760602083018461188b565b6000606082526119cb606083018661188b565b60208301949094525060400152919050565b6020808252825482820181905260008481528281209092916040850190845b81811015611a18578354835260019384019392850192016119fc565b50909695505050505050565b901515815260200190565b600060408252611a4260408301856118c5565b90508260208301529392505050565b600060808252611a6460808301876118c5565b6020830195909552506040810192909252606090910152919050565b60208082526018908201527708c9e8a744092dcecc2d8d2c840e8ded6cadc40d2dcc8caf60431b604082015260600190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6020808252818101527f464f453a20596f7572204e4654206973206e6f7420486973746f7069616e212e604082015260600190565b90815260200190565b918252602082015260400190565b604051601f8201601f191681016001600160401b0381118282101715611ba157611ba1611c82565b604052919050565b60006001600160401b03821115611bc257611bc2611c82565b5060209081020190565b60008219821115611bdf57611bdf611c6c565b500190565b600082611bff57634e487b7160e01b81526012600452602481fd5b500490565b6000816000190483118215151615611c1e57611c1e611c6c565b500290565b600082821015611c3557611c35611c6c565b500390565b600081611c4957611c49611c6c565b506000190190565b6000600019821415611c6557611c65611c6c565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfec9695243a805adb74c91f28311176c65b417e842d5699893cef56d18bfa48cbaa26469706673582212204ec19632d19473bc35f91326834ba1be3ba9d3b36e38f0a74103376e0e5d838264736f6c63430008010033";

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
