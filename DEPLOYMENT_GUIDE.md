# Quick Start: Deploying to Etherlink Testnet

## Prerequisites

1. **Get XTZ Testnet Tokens**
   - Visit: https://faucet.etherlink.com (or compatible Etherlink testnet faucet)
   - Get some XTZ for gas fees

2. **Set Up Environment Variables**
   
   Edit `.env.local` and update:
   ```env
   PRIVATE_KEY=your_deployment_wallet_private_key_here
   ```

## Deployment Commands

```bash
# Step 1: Install dependencies (if not already done)
npm install

# Step 2: Compile contracts
npx hardhat compile

# Step 3: Deploy to Etherlink Testnet
npx hardhat run scripts/deploy-tloot-v2.ts --network etherlinkTestnet
```

## Expected Output

You should see:
```
🚀 Deploying Complete Pool System with TLOOT V2 to Mantle Sepolia... # (Note: message not updated)

Deploying with account: 0x...
Account balance: X.XX XTZ

Using existing contracts:
- MockUSDT: 0x...
- Supra Router: 0x...

STEP 1: Deploy PlatformTokenV2 (TLOOT)
✅ PlatformTokenV2 deployed to: 0x...

STEP 2: Deploy Factory Contracts
✅ LuckyDrawFactory deployed to: 0x...
✅ CommitToClaimFactory deployed to: 0x...

STEP 3: Grant MINTER_ROLE and ADMIN_ROLE to Factories
✅ All permissions granted

🎉 DEPLOYMENT COMPLETE
```

## After Deployment

Update `.env.local` with the deployed contract addresses:

```env
NEXT_PUBLIC_POOL_MANAGER_ADDRESS=<LuckyDrawFactory_or_CommitToClaimFactory_address>
NEXT_PUBLIC_TOKEN_ADDRESS=<PlatformTokenV2_address>
NEXT_PUBLIC_USDT_ADDRESS=<MockUSDT_address_if_deploying_new>
```

## Testing Locally

```bash
# Start development server
npm run dev

# Visit http://localhost:3000
# Connect your wallet to Etherlink Testnet
# Create and join pools to test functionality
```

## Network Settings for MetaMask

Add Etherlink Testnet to your wallet:

- **Network Name:** Etherlink Testnet
- **New RPC URL:** https://node.ghostnet.etherlink.com
- **Chain ID:** 128123
- **Currency Symbol:** XTZ
- **Block Explorer:** https://testnet.explorer.etherlink.com

## Troubleshooting

### "Insufficient funds" error
- Get more XTZ from the faucet
- Check your wallet balance

### "Invalid nonce" error
- Reset your wallet's transaction history in MetaMask → Settings → Advanced → Clear activity tab data

### Contracts not deploying
- Ensure `PRIVATE_KEY` is set in `.env.local`
- Ensure the private key has XTZ for gas
- Check RPC URL is accessible: `https://node.ghostnet.etherlink.com`

---

**Ready to deploy?** Run the commands above! 🚀
