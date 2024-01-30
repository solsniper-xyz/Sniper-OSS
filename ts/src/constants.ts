import { PublicKey } from '@solana/web3.js';
import { findMarketPDA, findTreasuryAccount } from './pda';

export const MAKER_REBATE_BPS = 0;
export const MARKET_FEE_BPS = 100;

export const DEFAULT_FLAT_FEE = 0.0001 * 1e9;

export const SNIPER_MARKET_ALT = new PublicKey(
  'BqjwJ7mPKiw7f9RXg5bR72tHnj6QVziCCYTp1Jrqghf8'
);

export const SNIPER_MARKET_PROGRAM_ID = new PublicKey(
  'SNPRohhBurQwrpwAptw1QYtpFdfEKitr4WSJ125cN1g'
);

export const TREASURY_MINT = new PublicKey(
  'So11111111111111111111111111111111111111112'
);

export const SNIPER_MARKET_AUTHORITY = new PublicKey(
  'K1NGcWSdkMYmurLsBjLiCLNBnQYVBW9uFEG3Q9g7opp'
);

export const [SNIPER_MARKET_PDA] = findMarketPDA(SNIPER_MARKET_AUTHORITY);
export const [SNIPER_MARKET_TREASURY_PDA] =
  findTreasuryAccount(SNIPER_MARKET_PDA);
