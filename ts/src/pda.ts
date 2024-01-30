import {
  Connection,
  GetProgramAccountsFilter,
  PublicKey,
} from '@solana/web3.js';
import { SNIPER_MARKET_PROGRAM_ID } from './constants';
import * as anchor from '@coral-xyz/anchor';
import { BN, BorshAccountsCoder } from '@coral-xyz/anchor';
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import {
  BORSH_CODER,
  NFTValidationV1,
  SOLCompressedNFTOrderV1,
  SOLNFTOrderV1,
} from './accounts';
import { CompressedNFTOrder, Order, OrderType } from './types';

export const SNIPERMARKET_PREFIX = 'snipermarket';
export const CLOCK_PREFIX = 'clock';
export const TREASURY_PREFIX = 'treasury';
export const NFT_VALIDATION_PREFIX = 'nft_validation';
export const SIGNER_PREFIX = 'signer';
export const MARKER_PREFIX = 'marker';
export const CRANKER_PREFIX = 'cranker';
export const LOCK_PREFIX = 'lock';

export function findMarketClockPDA(market: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(SNIPERMARKET_PREFIX),
      market.toBuffer(),
      Buffer.from(CLOCK_PREFIX),
    ],
    SNIPER_MARKET_PROGRAM_ID
  );
}

export function findEscrowVaultAccount(
  market: PublicKey,
  maker: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(SNIPERMARKET_PREFIX), market.toBuffer(), maker.toBuffer()],
    SNIPER_MARKET_PROGRAM_ID
  );
}

export function findTreasuryAccount(market: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(SNIPERMARKET_PREFIX),
      market.toBuffer(),
      Buffer.from(TREASURY_PREFIX),
    ],
    SNIPER_MARKET_PROGRAM_ID
  );
}

export async function findAllValidationAddressesWithData(
  connection: Connection,
  market: PublicKey,
  exclusiveInActive = true
) {
  const nftValidations: {
    [nftValidation: string]: NFTValidationV1;
  } = {};

  const accountPrefix =
    BorshAccountsCoder.accountDiscriminator('NFTValidationV1');

  const filters: GetProgramAccountsFilter[] = [
    {
      memcmp: {
        offset: 0,
        bytes: bs58.encode([...accountPrefix, ...market.toBuffer()]),
      },
    },
  ];

  const accounts = await connection.getProgramAccounts(
    SNIPER_MARKET_PROGRAM_ID,
    {
      filters,
    }
  );

  for (const account of accounts) {
    const nftValidation = account.pubkey.toString();
    const nftValidationDecodedData = BORSH_CODER.accounts.decode(
      'NFTValidationV1',
      account.account.data
    ) as NFTValidationV1;

    if ('inactive' in nftValidationDecodedData.status && exclusiveInActive) {
      continue;
    }

    nftValidations[nftValidation] = nftValidationDecodedData;
  }

  return nftValidations;
}

export async function findNFTValidationAddress(
  connection: Connection,
  market: PublicKey,
  collectionMint: PublicKey | null,
  collectionCreator: PublicKey | null
): Promise<PublicKey | null> {
  const accountPrefix =
    BorshAccountsCoder.accountDiscriminator('NFTValidationV1');
  const filters: GetProgramAccountsFilter[] = [
    {
      memcmp: {
        offset: 0,
        bytes: bs58.encode([...accountPrefix, ...market.toBuffer()]),
      },
    },
  ];

  if (collectionMint) {
    filters.push({
      memcmp: {
        offset: 8 + 32,
        bytes: bs58.encode(collectionMint.toBuffer()),
      },
    });
  } else if (collectionCreator) {
    filters.push({
      memcmp: {
        offset: 8 + 32 + 32 + 1 + 4,
        bytes: bs58.encode(collectionCreator.toBuffer()),
      },
    });
  }

  const accounts = await connection.getProgramAccounts(
    SNIPER_MARKET_PROGRAM_ID,
    {
      filters,
    }
  );

  if (accounts.length === 0) {
    return null;
  }

  return accounts[0].pubkey;
}

export async function findOrdersOnchain(
  connection: Connection,
  market: PublicKey,
  owner: PublicKey | null,
  mint: PublicKey | null,
  OrderType: OrderType | null
): Promise<{ data: SOLNFTOrderV1; pubkey: PublicKey }[]> {
  const accountPrefix =
    BorshAccountsCoder.accountDiscriminator('SOLNFTOrderV1');
  const filters: GetProgramAccountsFilter[] = [];

  if (owner && mint && OrderType) {
    filters.push({
      memcmp: {
        offset: 0,
        bytes: bs58.encode([
          ...accountPrefix,
          ...market.toBuffer(),
          ...owner.toBuffer(),
          ...[1], // mint is optional first byte is 1 if mint is present
          ...mint.toBuffer(),
          ...new BN(OrderType).toArrayLike(Buffer, 'le', 1),
        ]),
      },
    });
  } else {
    const continuousBytes = [...accountPrefix, ...market.toBuffer()];

    if (owner) {
      continuousBytes.push(...owner.toBuffer());
    }

    filters.push({
      memcmp: {
        offset: 0,
        bytes: bs58.encode(continuousBytes),
      },
    });

    if (mint) {
      filters.push({
        memcmp: {
          offset: 8 + 32 + 32,
          bytes: bs58.encode([1, ...mint.toBuffer()]),
        },
      });
    }

    if (OrderType !== null) {
      filters.push({
        memcmp: {
          offset: 8 + 32 + 32 + 33,
          bytes: bs58.encode(new BN(OrderType).toArrayLike(Buffer, 'le', 1)),
        },
      });
    }
  }

  const rawAccounts = await connection.getProgramAccounts(
    SNIPER_MARKET_PROGRAM_ID,
    {
      filters,
    }
  );

  if (rawAccounts.length === 0) {
    return [];
  }

  let parsedAccounts: { data: SOLNFTOrderV1; pubkey: PublicKey }[] = [];

  for (const account of rawAccounts) {
    try {
      parsedAccounts.push({
        pubkey: account.pubkey,
        data: BORSH_CODER.accounts.decode(
          'SOLNFTOrderV1',
          account.account.data
        ) as SOLNFTOrderV1,
      });
    } catch (e) {
      console.log(`Error decoding order account: ${e} ${account.pubkey}`);
    }
  }

  return parsedAccounts;
}

export async function findCompressedOrdersOnchain(
  connection: Connection,
  market: PublicKey,
  creator: PublicKey | null,
  assetId: PublicKey | null
  // orderType: OrderType | null
): Promise<{ data: SOLCompressedNFTOrderV1; pubkey: PublicKey }[]> {
  const accountPrefix = BorshAccountsCoder.accountDiscriminator(
    'SOLCompressedNFTOrderV1'
  );
  const filters: GetProgramAccountsFilter[] = [];

  if (creator && assetId) {
    filters.push({
      memcmp: {
        offset: 0,
        bytes: bs58.encode([
          ...accountPrefix,
          ...market.toBuffer(),
          ...creator.toBuffer(),
          ...[1], // assetId is optional first byte is 1 if assetId is present
          ...assetId.toBuffer(),
          // ...new BN(orderType).toArrayLike(Buffer, 'le', 1),
        ]),
      },
    });
  } else {
    const continuousBytes = [...accountPrefix, ...market.toBuffer()];
    if (creator) {
      continuousBytes.push(...creator.toBuffer());
    }
    filters.push({
      memcmp: {
        offset: 0,
        bytes: bs58.encode(continuousBytes),
      },
    });
    if (assetId) {
      filters.push({
        memcmp: {
          offset: 8 + 32 + 32,
          bytes: bs58.encode([1, ...assetId.toBuffer()]),
        },
      });
    }
  }

  const rawAccounts = await connection.getProgramAccounts(
    SNIPER_MARKET_PROGRAM_ID,
    {
      filters,
    }
  );

  if (rawAccounts.length === 0) {
    return [];
  }

  let parsedAccounts: { data: SOLCompressedNFTOrderV1; pubkey: PublicKey }[] =
    [];

  for (const account of rawAccounts) {
    try {
      parsedAccounts.push({
        pubkey: account.pubkey,
        data: BORSH_CODER.accounts.decode(
          'SOLCompressedNFTOrderV1',
          account.account.data
        ) as SOLCompressedNFTOrderV1,
      });
    } catch (e) {
      console.log(`Error decoding order account: ${e} ${account.pubkey}`);
    }
  }

  return parsedAccounts;
}

export async function findOrdersOnchainFromValidation(
  connection: Connection,
  market: PublicKey,
  nftValidation: PublicKey
): Promise<Order[]> {
  let orders: Order[] = [];
  const accountPrefix =
    BorshAccountsCoder.accountDiscriminator('SOLNFTOrderV1');
  const continuousBytes = [...accountPrefix, ...market.toBuffer()];

  for (let i = 0; i < 2; i++) {
    const filters: GetProgramAccountsFilter[] = [
      {
        memcmp: {
          offset: 0,
          bytes: bs58.encode(continuousBytes),
        },
      },
    ];

    const orderTypeBytes = new BN(i).toArrayLike(Buffer, 'le', 0);
    filters.push(
      {
        memcmp: {
          offset: 8 + 32 + 32,
          bytes: bs58.encode(orderTypeBytes),
        },
      },
      {
        memcmp: {
          offset: 8 + 32 + 32 + 1 + i * 32 + 1 + 1 + 1,
          bytes: bs58.encode(nftValidation.toBuffer()),
        },
      }
    );

    const rawAccounts = await connection.getProgramAccounts(
      SNIPER_MARKET_PROGRAM_ID,
      {
        filters,
      }
    );

    if (rawAccounts.length === 0) {
      continue;
    }

    for (const account of rawAccounts) {
      try {
        const accountParsed = BORSH_CODER.accounts.decode(
          'SOLNFTOrderV1',
          account.account.data
        ) as SOLNFTOrderV1;

        orders.push({
          price: accountParsed.price,
          size: accountParsed.size,
          expiry: accountParsed.expireAt,
          nftMint: accountParsed.nftMint,
          maker: accountParsed.owner,
          honoredRoyaltyBps: accountParsed.honoredRoyaltyBps,
          typeRaw: accountParsed.orderType.buy ? 0 : 1,
        });
      } catch (e) {
        console.log(`Error decoding order account: ${e} ${account.pubkey}`);
      }
    }
  }

  return orders;
}

export function findMarketPDA(authority: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(anchor.utils.bytes.utf8.encode(SNIPERMARKET_PREFIX)),
      authority.toBuffer(),
    ],
    SNIPER_MARKET_PROGRAM_ID
  );
}

export function findNFTValidationMarker(
  market: PublicKey,
  collectionMint: PublicKey
) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(anchor.utils.bytes.utf8.encode(MARKER_PREFIX)),
      market.toBuffer(),
      collectionMint?.toBuffer() ?? Buffer.from([]),
    ],
    SNIPER_MARKET_PROGRAM_ID
  );
}

export function findProgramAsSignerPDA(order: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(anchor.utils.bytes.utf8.encode(SNIPERMARKET_PREFIX)),
      order.toBuffer(),
      Buffer.from(anchor.utils.bytes.utf8.encode(SIGNER_PREFIX)),
    ],
    SNIPER_MARKET_PROGRAM_ID
  );
}

export function findOrderStatePDA({
  market,
  nftValidation,
  order,
}: {
  market: PublicKey;
  nftValidation: PublicKey;
  order: Pick<Order, 'typeRaw' | 'price' | 'nftMint' | 'maker' | 'expiry'>;
}) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(anchor.utils.bytes.utf8.encode(SNIPERMARKET_PREFIX)),
      order.maker.toBuffer(),
      market.toBuffer(),
      nftValidation.toBuffer(),
      order.nftMint?.toBuffer() ?? Buffer.from([]),
      new anchor.BN(order.typeRaw).toArrayLike(Buffer, 'le', 1),
      new anchor.BN(order.price).toArrayLike(Buffer, 'le', 8),
      order.expiry.eq(new anchor.BN(-1))
        ? Buffer.from([])
        : new anchor.BN(order.expiry).toArrayLike(Buffer, 'le', 8),
    ],
    SNIPER_MARKET_PROGRAM_ID
  );
}

export function findCompressedNFTOrderState({
  market,
  nftValidation,
  order,
}: {
  market: PublicKey;
  nftValidation: PublicKey;
  order: Pick<
    CompressedNFTOrder,
    'creator' | 'assetId' | 'typeRaw' | 'price' | 'expiry'
  >;
}) {
  let expirySeeds = new anchor.BN(order.expiry).toArrayLike(Buffer, 'le', 8);

  // BN.js isn't calculating bytes of -1 correctly
  if (order.expiry.eq(new anchor.BN(-1))) {
    expirySeeds = Buffer.from([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
  }

  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(anchor.utils.bytes.utf8.encode(SNIPERMARKET_PREFIX)),
      order.creator.toBuffer(),
      market.toBuffer(),
      nftValidation.toBuffer(),
      order.assetId?.toBuffer() ?? Buffer.from([]),
      new anchor.BN(order.typeRaw).toArrayLike(Buffer, 'le', 1),
      new anchor.BN(order.price).toArrayLike(Buffer, 'le', 8),
      expirySeeds,
    ],
    SNIPER_MARKET_PROGRAM_ID
  );
}

export function findSellOrderLock(
  seller: PublicKey,
  sellOrder: PublicKey,
  nftMint: PublicKey
) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(anchor.utils.bytes.utf8.encode(LOCK_PREFIX)),
      new anchor.BN(OrderType.Sell).toArrayLike(Buffer, 'le', 1),
      seller.toBuffer(),
      sellOrder.toBuffer(),
      nftMint.toBuffer(),
    ],
    SNIPER_MARKET_PROGRAM_ID
  );
}
export function findBuyOrderLock(
  buyer: PublicKey,
  buyOrder: PublicKey,
  nftMint: PublicKey
) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(anchor.utils.bytes.utf8.encode(LOCK_PREFIX)),
      new anchor.BN(OrderType.Buy).toArrayLike(Buffer, 'le', 1),
      buyer.toBuffer(),
      buyOrder.toBuffer(),
      nftMint.toBuffer(),
    ],
    SNIPER_MARKET_PROGRAM_ID
  );
}

export function findAuthorizedCrankerProof(
  market: PublicKey,
  cranker: PublicKey
) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(anchor.utils.bytes.utf8.encode(CRANKER_PREFIX)),
      market.toBuffer(),
      cranker.toBuffer(),
    ],
    SNIPER_MARKET_PROGRAM_ID
  );
}

export function findEventAuthority() {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('__event_authority')],
    SNIPER_MARKET_PROGRAM_ID
  );
}
