# TLOOT - GameFi Social Ticketing Platform

A blockchain-based GameFi platform that democratizes access to premium event tickets through collaborative pool funding and lucky draw mechanics. Built on **Etherlink Shadownet Testnet**.

## 🎯 What's this about?

Let's be honest - premium event tickets are expensive. Whether it's that concert you've been wanting to see or a sports game, dropping hundreds of dollars upfront isn't always feasible.

TLOOT takes a different approach. Instead of buying tickets alone, users pool their funds together with others who want to attend the same event. Think of it as group buying meets GameFi, with some interesting mechanics thrown in.

## 🎮 How it works

We support two ways to participate

### 1. Commit-to-Claim Pools
The straightforward one. Users contribute to a pool (anywhere from 1 USDT up to 80% of what's remaining). Once the pool fills up and the ticket is secured, participants complete their payment before the event. It's kind of like a group reservation system   .

If someone doesn't pay up, their initial commitment is redistributed as token rewards to everyone else. Fair's fair fair .

**Key Features:**
- Variable contribution amounts (minimum 1 USDT, maximum 80% of remaining)
- Unlimited participants
- Instant TLOOT token rewards (1:1 with USDT contribution)
- No debt beyond deadline - all payments complete before event
- Automatic pool finalization when fully funded

### 2. Lucky Draw Pools
The fun one. Chip in a small amount for a chance to win the ticket. When the pool completes, a random winner gets selected via **Supra dVRF**. They pay a 20% claim fee, and everyone who participated gets TLOOT tokens as consolation. So even if you don't win, you walk away with something.

**Key Features:**
- Fixed entry amount per participant
- Limited participant slots (set at pool creation)
- Verifiable randomness via Supra dVRF integration
- Winner pays claim fee (20% of ticket price)
- Fair and transparent winner selection
- All participants earn TLOOT rewards

## 💎 TLOOT Tokens

Every time you contribute to a pool, you get TLOOT tokens minted instantly (1:1 with your USDT contribution). Think of it like Aave's model - the tokens are built right into the pool manager contract.

These aren't just collectibles. They represent your participation and can be used for platform utilities down the road.

**Token Specifications:**
- **Name:** TLOOT Token
- **Symbol:** TLOOT
- **Max Supply:** 1,000,000,000 TLOOT (1 billion tokens)
- **Minting:** 1:1 with USDT contributions
- **Utility:** Governance rights, platform fee discounts, staking rewards (planned)

## 🛠 Tech Stack

**Frontend:**
- Next.js 16.1 with React 19
- TypeScript 5.8.3
- Wagmi 3.3.2 + Viem 2.44.2 for Web3 interactions
- RainbowKit 2.2.10 for wallet connection
- Zustand 5.0.10 for state management
- TailwindCSS 4.1.18 for styling
- Framer Motion 12.26.2 for animations

**Smart Contracts:**
- Solidity 0.8.28
- Hardhat 3.1.3 for development
- OpenZeppelin Contracts 5.4.0
- Supra dVRF for verifiable randomness
- Deployed on **Etherlink Shadownet Testnet**

**Architecture:**
We went with a simplified approach - one `SimplePoolManager` contract handles everything. No factories, no complexity. It manages both pool types, handles contributions with variable amounts, and mints TLOOT tokens all in one place.

## 🚀 Getting Started

### Prerequisites

1. **Node.js 18+** installed
2. **npm** or **pnpm** package manager
3. **Wallet** with some XTZ testnet tokens
4. **WalletConnect Project ID** from [cloud.walletconnect.com](https://cloud.walletconnect.com/)

### Installation

Clone the repo and install dependencies:

```bash
# Using npm
npm install

# Or using pnpm (recommended)
pnpm install
```

### Environment Setup

Copy `.env.local` and configure your environment variables:

```env
# WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Etherlink Shadownet RPC URL
ETHERLINK_RPC_URL=https://node.shadownet.etherlink.com
NEXT_PUBLIC_ETHERLINK_RPC_URL=https://node.shadownet.etherlink.com

# Deployed Contract Addresses
NEXT_PUBLIC_POOL_MANAGER_ADDRESS=0x54112a77c92a9a0571091f15702e8c95a9d5d161
NEXT_PUBLIC_TOKEN_ADDRESS=0x54112a77c92a9a0571091f15702e8c95a9d5d161
NEXT_PUBLIC_USDT_ADDRESS=0x59a2fB83F0f92480702EDEE8f84c72a1eF44BD9b

# Private key for contract deployment (only if deploying)
PRIVATE_KEY=your_private_key_here
```

### Run Development Server

```bash
npm run dev
# or
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📝 Smart Contracts

### Compile Contracts

```bash
npx hardhat compile
```

### Deploy to Etherlink Testnet

```bash
npx hardhat run scripts/deploy-tloot-v2.ts --network etherlinkTestnet
```

The main contract is `SimplePoolManager` - it's basically all you need. Handles pool creation, variable contributions, winner selection, and token minting.

### Contract Files

- **SimplePoolManager.sol** - Main unified pool manager
- **PlatformTokenV2.sol** - TLOOT ERC20 token
- **MockUSDT.sol** - Test USDT for development

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

## 🌐 Network Information

### Etherlink Shadownet Testnet

- **Network Name:** Etherlink Shadownet
- **RPC URL:** https://node.shadownet.etherlink.com
- **Chain ID:** 127823
- **Currency Symbol:** XTZ
- **Block Explorer:** https://shadownet.explorer.etherlink.com
- **Faucet:** https://faucet.etherlink.com

### Deployed Contracts

- **SimplePoolManager:** `0x54112a77c92a9a0571091f15702e8c95a9d5d161`
- **TLOOT Token:** `0x54112a77c92a9a0571091f15702e8c95a9d5d161` (built into pool manager)
- **Mock USDT:** `0x59a2fB83F0f92480702EDEE8f84c72a1eF44BD9b`

### Add Network to MetaMask

To interact with the app, add Etherlink Shadownet to your wallet:

1. Open MetaMask
2. Go to Settings → Networks → Add Network
3. Enter the network details above
4. Get testnet XTZ from the [faucet](https://faucet.etherlink.com)

## 📂 Project Structure

```
big-bag-pool/
├── contracts/              # Smart contracts
│   ├── SimplePoolManager.sol
│   ├── PlatformTokenV2.sol
│   ├── MockUSDT.sol
│   └── ...
├── scripts/               # Deployment and utility scripts
│   ├── deploy-tloot-v2.ts
│   ├── deploy-direct.ts
│   └── ...
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── pools/        # Pool browsing and details
│   │   ├── dashboard/    # User dashboard
│   │   └── rewards/      # Token rewards page
│   ├── components/       # React components
│   ├── lib/             # Utilities and constants
│   │   ├── web3.ts      # Wagmi configuration
│   │   └── constants.ts # Contract ABIs and addresses
│   ├── store/           # Zustand state stores
│   └── types/           # TypeScript type definitions
├── test/                  # Contract tests
├── artifacts/            # Compiled contract artifacts
└── ignition/             # Hardhat Ignition deployment modules
```

## ✨ Key Features

- **Variable contributions**: For Commit-to-Claim pools, contribute anywhere from 1 USDT to 80% of remaining amount
- **Auto-finalization**: Pools automatically finalize when fully funded
- **Instant rewards**: Get TLOOT tokens immediately when joining pools
- **No participant limits**: Commit-to-Claim pools can have unlimited participants
- **Transparent mechanics**: Everything happens on-chain, verifiable by anyone
- **Verifiable randomness**: Supra dVRF for fair Lucky Draw winner selection
- **Real-world utility**: Actual event tickets, not just digital collectibles

## 🔐 Security Features

- **OpenZeppelin Standards:** All contracts inherit from audited OpenZeppelin libraries
- **Reentrancy Protection:** `ReentrancyGuard` on all state-changing functions
- **Access Control:** `Ownable` pattern for admin functions
- **Input Validation:** Extensive validation for all parameters
- **Deadline Enforcement:** Pools automatically cancel after deadline
- **No Debt Risk:** All payments complete before event date

## 🎯 Development Status

- ✅ Smart contracts deployed to Etherlink Shadownet
- ✅ Frontend application functional
- ✅ Wallet integration complete
- ✅ Pool creation and joining working
- ✅ TLOOT token minting operational
- 🔄 Supra dVRF integration (in progress)
- 🔄 Claim flow implementation
- 🔄 Dashboard and rewards pages

## 🗺 Roadmap

### Short-term
- Complete Supra dVRF integration for Lucky Draw winner selection
- Implement claim flow for winners
- Add comprehensive dashboard analytics
- Real event integrations

### Medium-term
- TLOOT staking for yield
- Governance mechanisms
- Secondary market for pool positions
- Mobile app development

### Long-term
- Multi-chain deployment
- NFT ticket integration
- DAO governance
- Advanced pool types (auctions, blind pools)

## 🤝 Contributing

This project was built as a demonstration of how blockchain technology can solve real-world problems in the ticketing industry while providing engaging GameFi experiences.

If you want to contribute or have ideas, feel free to open an issue or PR.


## 📄 License

MIT

