// Network Configuration
export const ETHERLINK_TESTNET = {
  id: 127823,
  name: "Etherlink Shadownet",
  network: "etherlink-shadownet",
  nativeCurrency: {
    decimals: 18,
    name: "XTZ",
    symbol: "XTZ",
  },
  rpcUrls: {
    default: { http: ["https://node.shadownet.etherlink.com"] },
    public: { http: ["https://node.shadownet.etherlink.com"] },
  },
  blockExplorers: {
    default: { name: "Etherlink Explorer", url: "https://explorer.etherlink.com" },
  },
  testnet: true,
} as const;

// Contract Addresses (Deployed on Etherlink Testnet)
// 
// SIMPLIFIED ARCHITECTURE:
// - SimplePoolManager (0xda6ff5a56c2156fbc8ad101392ef2f7aa3af0e2d)
//   * Single unified contract for ALL pool operations
//   * Built-in TLOOT token (ERC20) - Aave-style immediate minting
//   * No factories, no complexity - just ONE contract!
//   * When users join pools, they instantly receive TLOOT tokens
// 
export const CONTRACT_ADDRESSES = {
  // Simple unified contract (everything in one!)
  POOL_MANAGER: process.env.NEXT_PUBLIC_POOL_MANAGER_ADDRESS || "0x54112a77c92a9a0571091f15702e8c95a9d5d161", // SimplePoolManager

  // Token contracts
  TOKEN: process.env.NEXT_PUBLIC_TOKEN_ADDRESS || "0x54112a77c92a9a0571091f15702e8c95a9d5d161", // TLOOT (Built into SimplePoolManager)
  USDT: "0x59a2fB83F0f92480702EDEE8f84c72a1eF44BD9b", // MockUSDT

  // Supra dVRF
  SUPRA_ROUTER: "0x214F9eD5750D2fC87ae084184e999Ff7DFa1EB09",
  SUPRA_DEPOSIT: "0xd6675f4fD26119bF729B0fF912c28022a63Ae0a9",

  YIELD_ROUTER: "0x0000000000000000000000000000000000000000",
} as const;

// Pool Types
export enum PoolType {
  LUCKY_DRAW = "LUCKY_DRAW",
  COMMIT_TO_CLAIM = "COMMIT_TO_CLAIM",
}

// Pool Status
export enum PoolStatus {
  ACTIVE = "ACTIVE",
  FILLING = "FILLING",
  COMPLETED = "COMPLETED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
}

// User Participation Status
export enum ParticipationStatus {
  JOINED = "JOINED",
  WON = "WON",
  LOST = "LOST",
  CLAIMED = "CLAIMED",
  PENDING_PAYMENT = "PENDING_PAYMENT",
  DEFAULTED = "DEFAULTED",
}

// GameFi Constants
export const XP_PER_POOL_JOIN = 10;
export const XP_PER_WIN = 50;
export const XP_PER_CLAIM = 25;
export const REPUTATION_BOOST_ON_PAYMENT = 5;
export const REPUTATION_PENALTY_ON_DEFAULT = -20;

// UI Constants
export const POOL_CARD_SKELETON_COUNT = 6;
export const POOLS_PER_PAGE = 12;
export const CLAIM_FEE_PERCENTAGE = 20;
