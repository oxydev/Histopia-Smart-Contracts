/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155__factory>;
    getContractFactory(
      name: "IERC1155MetadataURI",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155MetadataURI__factory>;
    getContractFactory(
      name: "IERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155__factory>;
    getContractFactory(
      name: "IERC1155Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155Receiver__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Permit__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "ERC721Burnable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Burnable__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "BridgeERA",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BridgeERA__factory>;
    getContractFactory(
      name: "Challenger",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Challenger__factory>;
    getContractFactory(
      name: "ERAAllocation",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERAAllocation__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERA",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERA__factory>;
    getContractFactory(
      name: "Allocator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Allocator__factory>;
    getContractFactory(
      name: "FountainOfEra",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FountainOfEra__factory>;
    getContractFactory(
      name: "INFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.INFT__factory>;
    getContractFactory(
      name: "AttachableERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AttachableERC721__factory>;
    getContractFactory(
      name: "Multicall",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Multicall__factory>;
    getContractFactory(
      name: "AttachableERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AttachableERC721__factory>;
    getContractFactory(
      name: "HistopiaNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HistopiaNFT__factory>;
    getContractFactory(
      name: "TypedNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TypedNFT__factory>;
    getContractFactory(
      name: "Resources",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Resources__factory>;

    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155>;
    getContractAt(
      name: "IERC1155MetadataURI",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155MetadataURI>;
    getContractAt(
      name: "IERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155>;
    getContractAt(
      name: "IERC1155Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155Receiver>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Permit",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Permit>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "ERC721Burnable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721Burnable>;
    getContractAt(
      name: "IERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "BridgeERA",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BridgeERA>;
    getContractAt(
      name: "Challenger",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Challenger>;
    getContractAt(
      name: "ERAAllocation",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERAAllocation>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERA",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERA>;
    getContractAt(
      name: "Allocator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Allocator>;
    getContractAt(
      name: "FountainOfEra",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FountainOfEra>;
    getContractAt(
      name: "INFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.INFT>;
    getContractAt(
      name: "AttachableERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AttachableERC721>;
    getContractAt(
      name: "Multicall",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Multicall>;
    getContractAt(
      name: "AttachableERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AttachableERC721>;
    getContractAt(
      name: "HistopiaNFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.HistopiaNFT>;
    getContractAt(
      name: "TypedNFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TypedNFT>;
    getContractAt(
      name: "Resources",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Resources>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
