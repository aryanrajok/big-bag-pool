# TLOOT – GameFi Social Ticketing Platform

A blockchain-powered platform that makes premium event tickets more accessible through collaborative funding and GameFi mechanics.

Built on **Etherlink Shadownet Testnet**.

---

## 🎯 Why TLOOT?

Premium event tickets are expensive.  
Concerts, sports matches, and live events often require large upfront payments.

TLOOT offers a smarter alternative:
- Pool funds with others
- Reduce individual financial burden
- Add transparent on-chain mechanics
- Earn rewards while participating

It’s group buying — powered by blockchain.

---

## 🎮 How It Works

### 1️⃣ Commit-to-Claim Pools

Users contribute to a shared pool (minimum 1 USDT, up to 80% of remaining amount).

Once the pool is fully funded:
- The ticket is secured
- Participants complete payment before the event
- TLOOT tokens are minted instantly (1:1 with contribution)

If someone fails to pay:
- Their committed amount is redistributed as rewards to others

#### Key Features:
- Flexible contribution amounts
- Unlimited participants
- Instant token rewards
- No long-term debt
- Automatic pool finalization

---

### 2️⃣ Lucky Draw Pools

Users contribute a fixed amount for a chance to win a ticket.

When the pool completes:
- A winner is selected using **Supra dVRF (verifiable randomness)**
- Winner pays 20% claim fee
- All participants receive TLOOT token rewards

Even if you don’t win — you still earn.

#### Key Features:
- Fixed entry amount
- Limited participant slots
- Transparent on-chain randomness
- Fair winner selection
- Reward distribution for all participants

---

## 💎 TLOOT Token

Every contribution mints TLOOT tokens instantly (1:1 with USDT).

These tokens represent platform participation and future utility.

### Token Details:
- **Name:** TLOOT Token
- **Symbol:** TLOOT
- **Max Supply:** 1,000,000,000
- **Minting Model:** 1:1 with contributions
- **Future Utility:**
  - Governance rights
  - Platform fee discounts
  - Staking rewards

---

## 🛠 Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Wagmi + Viem
- RainbowKit
- Zustand
- TailwindCSS
- Framer Motion

### Smart Contracts
- Solidity
- Hardhat
- OpenZeppelin
- Supra dVRF
- Deployed on Etherlink Shadownet

### Architecture
- Single unified contract: `SimplePoolManager`
- Handles pool creation
- Manages contributions
- Mints TLOOT tokens
- Selects winners

Simple. Minimal. Efficient.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm
- Wallet with Etherlink testnet XTZ
- WalletConnect Project ID

### Installation

```bash
npm install
# or
pnpm install
```

### Run Development Server

```bash
npm run dev
# or
pnpm run dev
```

Visit:
http://localhost:3000

---

## 🌐 Network Information

### Etherlink Shadownet Testnet
- **RPC URL:** https://node.shadownet.etherlink.com
- **Chain ID:** 127823
- **Currency:** XTZ
- **Explorer:** https://shadownet.explorer.etherlink.com
- **Faucet:** https://faucet.etherlink.com

---

## 🔐 Security

- OpenZeppelin audited libraries
- Reentrancy protection
- Access control (Ownable)
- Strict input validation
- Deadline enforcement
- No post-event debt risk

---

## 📈 Development Status

- ✅ Smart contracts deployed
- ✅ Frontend functional
- ✅ Wallet integration complete
- ✅ Pool creation & joining live
- 🔄 Lucky Draw randomness integration
- 🔄 Dashboard improvements

---

## 🗺 Roadmap

### Short-Term
- Complete dVRF integration
- Improve claim flow
- Add dashboard analytics

### Mid-Term
- Staking mechanism
- Governance features
- Secondary pool markets

### Long-Term
- Multi-chain expansion
- NFT ticket integration
- DAO governance

---

## 📄 License

MIT
