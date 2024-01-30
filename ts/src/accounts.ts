import {
  IdlTypes,
  TypeDef,
} from '@coral-xyz/anchor/dist/cjs/program/namespace/types';
import { BorshCoder, DecodeType } from '@coral-xyz/anchor';
import { IDL, SniperMarket } from './idl';
import { IdlAccountItem, IdlField } from '@coral-xyz/anchor/dist/cjs/idl';
import { PartialAccounts } from '@coral-xyz/anchor/dist/cjs/program/namespace/methods';

export const BORSH_CODER = new BorshCoder(IDL);

export type ConvertElements<T extends any[], U> = {
  [K in keyof T]: U;
};

export type RemoveOptionality<T> = {
  [K in keyof T]-?: T[K];
};

export type ArgsTuple<A extends IdlField[], Defined> = {
  [K in keyof A]: A[K] extends IdlField
    ? DecodeType<A[K]['type'], Defined>
    : unknown;
} & unknown[];

export type ProgramInstructionArgs<T extends IdlField[]> = ArgsTuple<
  T,
  IdlTypes<SniperMarket>
>;

export type ProgramInstructionAccounts<T extends IdlAccountItem> =
  PartialAccounts<T>;

export type TypesByName<
  T extends LowercaseSniperMarket['types'][number],
  EventName extends string
> = Extract<T, { name: Lowercase<EventName> }>;

export type AccountByName<
  T extends LowercaseSniperMarket['accounts'][number],
  EventName extends string
> = Extract<T, { name: Lowercase<EventName> }>;

type LowercaseNames<T> = {
  [K in keyof T]: T[K] extends { name: string }
    ? { [P in keyof T[K]]: P extends 'name' ? Lowercase<T[K][P]> : T[K][P] }
    : T[K];
};

type LowercaseSniperMarket = {
  accounts: LowercaseNames<SniperMarket['accounts']>;
  types: LowercaseNames<SniperMarket['types']>;
};

export type PackedMetadataArgs = TypeDef<
  TypesByName<
    LowercaseSniperMarket['types'][number],
    Lowercase<'PackedMetadataArgs'>
  >,
  IdlTypes<SniperMarket>
>;

export type PackedUses = TypeDef<
  TypesByName<LowercaseSniperMarket['types'][number], Lowercase<'PackedUses'>>,
  IdlTypes<SniperMarket>
>;

export type PackedTokenStandard = TypeDef<
  TypesByName<
    LowercaseSniperMarket['types'][number],
    Lowercase<'PackedTokenStandard'>
  >,
  IdlTypes<SniperMarket>
>;

export type PackedURL = TypeDef<
  TypesByName<LowercaseSniperMarket['types'][number], Lowercase<'PackedURL'>>,
  IdlTypes<SniperMarket>
>;

export type BubblegumPayload = TypeDef<
  TypesByName<
    LowercaseSniperMarket['types'][number],
    Lowercase<'BubblegumPayload'>
  >,
  IdlTypes<SniperMarket>
>;

export type SOLCompressedNFTOrderV1 = TypeDef<
  AccountByName<
    LowercaseSniperMarket['accounts'][number],
    Lowercase<'SOLCompressedNFTOrderV1'>
  >,
  IdlTypes<SniperMarket>
>;

export type SOLNFTOrderV1 = TypeDef<
  AccountByName<
    LowercaseSniperMarket['accounts'][number],
    Lowercase<'SOLNFTOrderV1'>
  >,
  IdlTypes<SniperMarket>
>;

export type SOLNFTBuyOrderLockV1 = TypeDef<
  AccountByName<
    LowercaseSniperMarket['accounts'][number],
    Lowercase<'SOLNFTBuyOrderLockV1'>
  >,
  IdlTypes<SniperMarket>
>;

export type Market = TypeDef<
  AccountByName<LowercaseSniperMarket['accounts'][number], 'Market'>,
  IdlTypes<SniperMarket>
>;

export type MarketClock = TypeDef<
  AccountByName<LowercaseSniperMarket['accounts'][number], 'MarketClock'>,
  IdlTypes<SniperMarket>
>;

export type NFTValidationV1 = TypeDef<
  AccountByName<LowercaseSniperMarket['accounts'][number], 'NFTValidationV1'>,
  IdlTypes<SniperMarket>
>;

export type AuthorizedCranker = TypeDef<
  AccountByName<LowercaseSniperMarket['accounts'][number], 'AuthorizedCranker'>,
  IdlTypes<SniperMarket>
>;

export function decodeNFTValidationFromData(data: Buffer) {
  if (!data) {
    throw new Error('Invalid order data');
  }

  const postNFTValidation = new BorshCoder(
    IDL
  ).accounts.decodeUnchecked<NFTValidationV1>('NFTValidationV1', data);

  return postNFTValidation;
}

export function decodeBuyOrderLockFromData(data: Buffer) {
  if (!data) {
    throw new Error('Invalid order data');
  }

  const postBuyOrderLock = new BorshCoder(
    IDL
  ).accounts.decodeUnchecked<SOLNFTBuyOrderLockV1>(
    'SOLNFTBuyOrderLockV1',
    data
  );

  return postBuyOrderLock;
}

export function decodeMarketFromData(data: Buffer) {
  if (!data) {
    throw new Error('Invalid market data');
  }

  const postMarketState = new BorshCoder(IDL).accounts.decodeUnchecked<Market>(
    'Market',
    data
  );

  return postMarketState;
}

export function decodeMarketsFromData<U extends Array<Buffer>>(
  ...data: U
): Market[] {
  const markets: ConvertElements<U, Market> = [] as any;

  for (const d of data) {
    if (d) {
      const market = decodeMarketFromData(d);

      markets.push(market);
    }
  }

  return markets;
}

export function decodeCompressedNFTOrderFromData(data: Buffer) {
  if (!data) {
    throw new Error('Invalid order data');
  }

  return new BorshCoder(IDL).accounts.decode<SOLCompressedNFTOrderV1>(
    'SOLCompressedNFTOrderV1',
    data
  );
}

export function decodeOrderFromData(data: Buffer) {
  if (!data) {
    throw new Error('Invalid order data');
  }

  const postOrderState = new BorshCoder(IDL).accounts.decode<SOLNFTOrderV1>(
    'SOLNFTOrderV1',
    data
  );

  return postOrderState;
}

export function decodeOrderLockFromData(data: Buffer) {
  if (!data) {
    throw new Error('Invalid order data');
  }

  const postOrderState = new BorshCoder(
    IDL
  ).accounts.decodeUnchecked<SOLNFTBuyOrderLockV1>(
    'SOLNFTBuyOrderLockV1',
    data
  );

  return postOrderState;
}

export function decodeOrdersFromData<U extends Array<Buffer>>(...data: U) {
  const orders: ConvertElements<U, SOLNFTOrderV1> = [] as any;

  for (const d of data) {
    if (d) {
      const order = decodeOrderFromData(d);

      orders.push(order);
    }
  }

  return orders;
}

export function decodeMarketClockFromData<U extends Array<Buffer>>(...data: U) {
  const marketClocks: ConvertElements<U, MarketClock> = [] as any;

  for (const d of data) {
    if (d) {
      const clock: MarketClock = new BorshCoder(
        IDL
      ).accounts.decodeUnchecked<MarketClock>('MarketClock', d);

      marketClocks.push(clock);
    }
  }

  return marketClocks;
}

export function decodeVerifiedCrankerFromData<U extends Array<Buffer>>(
  ...data: U
) {
  const marketClocks: ConvertElements<U, MarketClock> = [] as any;

  for (const d of data) {
    if (d) {
      const clock: MarketClock = new BorshCoder(
        IDL
      ).accounts.decodeUnchecked<MarketClock>('MarketClock', d);

      marketClocks.push(clock);
    }
  }

  return marketClocks;
}

export function isRoyaltyEnforcedNFTValidation(nftValidation: NFTValidationV1) {
  return (nftValidation.flags & 0b00000001) === 0b00000001 ? true : false;
}

export function isBypassMarketFeesNFTValidation(
  nftValidation: NFTValidationV1
) {
  return (nftValidation.flags & 0b00000010) === 0b00000010 ? true : false;
}

export function isCosignerBypassNFTValidation(nftValidation: NFTValidationV1) {
  return (nftValidation.flags & 0b00000100) === 0b00000100 ? true : false;
}
