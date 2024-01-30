import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

export enum OrderType {
  Buy = 0,
  Sell = 1,
}

export type Order = BuyOrder | SellOrder;

export type GenericOrder = {
  price: BN;
  size: BN;
  expiry: BN;
  nftMint: PublicKey | null;
  maker: PublicKey;
  honoredRoyaltyBps: number;
};

export type BuyOrder = GenericOrder & {
  typeRaw: 0;
};

export type SellOrder = GenericOrder & {
  typeRaw: 1;
};

export function isBuyOrder(order: Order): order is BuyOrder {
  return order.typeRaw === OrderType.Buy;
}

export function isSellOrder(order: Order): order is SellOrder {
  return order.typeRaw === OrderType.Sell;
}

export type CompressedNFTOrder = CompressedNFTBuyOrder | CompressedNFTSellOrder;

export type GenericCompressedNFTOrder = {
  price: BN;
  size: BN;
  expiry: BN;
  assetId: PublicKey | null;
  creator: PublicKey;
  honoredRoyaltyBps: number;
  topOffFunds?: boolean;
  postOnly?: boolean;
};

export type CompressedNFTBuyOrder = GenericCompressedNFTOrder & {
  typeRaw: 0;
};

export type CompressedNFTSellOrder = GenericCompressedNFTOrder & {
  typeRaw: 1;
};
