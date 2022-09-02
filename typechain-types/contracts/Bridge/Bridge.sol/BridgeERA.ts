/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface BridgeERAInterface extends utils.Interface {
  functions: {
    "ERAContract()": FunctionFragment;
    "MINIMUM_THRESHOLD()": FunctionFragment;
    "lock(uint256,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "ERAContract" | "MINIMUM_THRESHOLD" | "lock"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "ERAContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MINIMUM_THRESHOLD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lock",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "ERAContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MINIMUM_THRESHOLD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lock", data: BytesLike): Result;

  events: {
    "Locked(uint256,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Locked"): EventFragment;
}

export interface LockedEventObject {
  amount: BigNumber;
  to: string;
  destChain: BigNumber;
}
export type LockedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  LockedEventObject
>;

export type LockedEventFilter = TypedEventFilter<LockedEvent>;

export interface BridgeERA extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BridgeERAInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    ERAContract(overrides?: CallOverrides): Promise<[string]>;

    MINIMUM_THRESHOLD(overrides?: CallOverrides): Promise<[BigNumber]>;

    lock(
      amount: PromiseOrValue<BigNumberish>,
      to: PromiseOrValue<string>,
      destChain: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  ERAContract(overrides?: CallOverrides): Promise<string>;

  MINIMUM_THRESHOLD(overrides?: CallOverrides): Promise<BigNumber>;

  lock(
    amount: PromiseOrValue<BigNumberish>,
    to: PromiseOrValue<string>,
    destChain: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    ERAContract(overrides?: CallOverrides): Promise<string>;

    MINIMUM_THRESHOLD(overrides?: CallOverrides): Promise<BigNumber>;

    lock(
      amount: PromiseOrValue<BigNumberish>,
      to: PromiseOrValue<string>,
      destChain: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Locked(uint256,address,uint256)"(
      amount?: null,
      to?: PromiseOrValue<string> | null,
      destChain?: PromiseOrValue<BigNumberish> | null
    ): LockedEventFilter;
    Locked(
      amount?: null,
      to?: PromiseOrValue<string> | null,
      destChain?: PromiseOrValue<BigNumberish> | null
    ): LockedEventFilter;
  };

  estimateGas: {
    ERAContract(overrides?: CallOverrides): Promise<BigNumber>;

    MINIMUM_THRESHOLD(overrides?: CallOverrides): Promise<BigNumber>;

    lock(
      amount: PromiseOrValue<BigNumberish>,
      to: PromiseOrValue<string>,
      destChain: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ERAContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MINIMUM_THRESHOLD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lock(
      amount: PromiseOrValue<BigNumberish>,
      to: PromiseOrValue<string>,
      destChain: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
