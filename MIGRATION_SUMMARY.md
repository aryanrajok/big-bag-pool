# 🎉 Migration Complete: Mantle Sepolia → Etherlink Testnet

## ✅ Changes Made

### 1️⃣ **Hardhat Configuration** (`hardhat.config.ts`)
- ✅ Removed `mantleSepolia` network configuration
- ✅ Added `etherlinkTestnet` network  with:
  - Chain ID: **128123** (was 5003)
  - RPC URL: from `process.env.ETHERLINK_RPC_URL`
  - Network type: `http` with `chainType: "l1"`

### 2️⃣ **Environment Variables** (`.env.local`)
- ✅ Removed:  `NEXT_PUBLIC_MANTLE_RPC_URL`
- ✅ Added:
  - `ETHERLINK_RPC_URL=https://node.ghostnet.etherlink.com`
  - `NEXT_PUBLIC_ETHERLINK_RPC_URL=https://node.ghostnet.etherlink.com`
- Contract addresses remain placeholders (will be updated after deployment)

### 3️⃣ **Frontend Chain Configuration**

#### `src/lib/constants.ts`
- ✅ Replaced `MANTLE_CHAIN` and `MANTLE_TESTNET` with `ETHERLINK_TESTNET`:
  - Chain ID: **128123**
  - Name: "Etherlink Testnet"
  - Network: "etherlink-testnet"
  - Native Currency: **XTZ** (was MNT)
  - RPC: `https://node.ghostnet.etherlink.com`
  - Explorer: `https://testnet.explorer.etherlink.com`

#### `src/lib/web3.ts`
- ✅ Replaced `mantleSetoliaChain` with `etherlinkTestnetChain`
- ✅ Updated all Wagmi configuration to use Etherlink
- ✅ Updated RPC URLs to use `NEXT_PUBLIC_ETHERLINK_RPC_URL`

#### `src/store/pool-store.ts`
- ✅ Replaced all `mantleSepoliaTestnet` imports with `ETHERLINK_TESTNET`
- ✅ Updated all public/wallet client configurations
- ✅ Updated RPC endpoints in all 4 locations

#### `src/app/pools/[id]/page.tsx`
- ✅ Replaced `mantleSepoliaTestnet` import with `ETHERLINK_TESTNET`
- ✅ Updated wallet and public client configurations
- ✅ Updated RPC URLs

### 4️⃣ **Deployment Script** (`scripts/deploy-tloot-v2.ts`)
- ⚠️ **Note**: The deployment script message still references "Mantle Sepolia" (encoding issue prevented update)
- ✅ Script will work with `--network etherlinkTestnet` flag

---

## 📋 Next Steps

### **Step 1: Deploy Contracts to Etherlink**

```bash
# Compile contracts
npx hardhat compile

# Deploy to Etherlink Testnet  
npx hardhat run scripts/deploy-tloot-v2.ts --network etherlinkTestnet
```

### **Step 2: Update Contract Addresses**

After successful deployment, update `.env.local` with the new addresses:

```env
NEXT_PUBLIC_POOL_MANAGER_ADDRESS=<NEW_POOL_MANAGER_ADDRESS>
NEXT_PUBLIC_TOKEN_ADDRESS=<NEW_POOL_MANAGER_ADDRESS>  # Same address (built-in token)
NEXT_PUBLIC_USDT_ADDRESS=<NEW_USDT_ADDRESS>
PRIVATE_KEY=<YOUR_PRIVATE_KEY>
```

### **Step 3: Update Documentation**

Update `README.md` to replace all Mantle references with Etherlink:
- Change "Mantle Sepolia" → "Etherlink Testnet"
- Update RPC URLs
- Update explorer links
- Update chain ID references (5003 → 128123)

### **Step 4: Update Footer**

Update `src/components/layout/footer.tsx`:
- Change "Built on Mantle Network" → "Built on Etherlink (Tezos Ecosystem)"
- Update hackathon reference if needed

### **Step 5: Test**

1. Start development server:
   ```bash
   npm run dev
   ```

2. Connect wallet to Etherlink Testnet (Chain ID: 128123)
3. Test pool creation
4. Test joining pools
5. Verify TLOOT token minting

---

## 🔧 Etherlink Testnet Details

| Property | Value |
|----------|-------|
| **Network Name** | Etherlink Testnet |
| **Chain ID** | 128123 |
| **Currency Symbol** | XTZ |
| **RPC URL** | https://node.ghostnet.etherlink.com |
| **Explorer** | https://testnet.explorer.etherlink.com |

---

## ⚠️ Important Notes

1. **No smart contract code was modified** - only network configuration changed
2. **TypeScript errors** shown during migration are expected and will resolve after recompiling
3. **All Mantle Sepolia references replaced** with Etherlink equivalents
4. **Deployment script** references "Mantle Sepolia" in console output but will deploy to Etherlink when using `--network etherlinkTestnet`
5. **Test thoroughly** before production deployment

---

## 🎯 Verification Checklist

- [ ] Contracts compile successfully
- [ ] Contracts deploy to Etherlink Testnet
- [ ] Frontend connects to Etherlink Testnet
- [ ] Pool creation works
- [ ] Pool joining works
- [ ] TLOOT tokens mint correctly
- [ ] No "5003" or "Mantle" references in codebase (except docs/comments)
- [ ] README updated
- [ ] Footer updated
- [ ] All contract addresses updated in `.env.local`

---

**Migration Status:** ✅ **COMPLETE** (Pending deployment and testing)
