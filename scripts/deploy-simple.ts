import { createWalletClient, createPublicClient, http, formatEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import * as dotenv from "dotenv";

// Import contract ABI
import SimplePoolManagerArtifact from "../artifacts/contracts/SimplePoolManager.sol/SimplePoolManager.json" assert { type: "json" };

dotenv.config({ path: ".env.local" });

const ETHERLINK_SHADOWNET = {
  id: 127823,
  name: "Etherlink Shadownet",
  nativeCurrency: { name: "XTZ", symbol: "XTZ", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.ETHERLINK_RPC_URL || "https://node.shadownet.etherlink.com"] },
  },
};

async function main() {
  console.log("🚀 Deploying SimplePoolManager to Etherlink Shadownet...\n");

  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY not set in .env.local");
  }

  const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY.replace(/^0x/, "")}`);

  const walletClient = createWalletClient({
    account,
    chain: ETHERLINK_SHADOWNET,
    transport: http(ETHERLINK_SHADOWNET.rpcUrls.default.http[0], {
      timeout: 120_000, // 2 minutes
    }),
  });

  const publicClient = createPublicClient({
    chain: ETHERLINK_SHADOWNET,
    transport: http(ETHERLINK_SHADOWNET.rpcUrls.default.http[0], {
      timeout: 120_000, // 2 minutes
    }),
  });

  console.log("Deploying with account:", account.address);
  const balance = await publicClient.getBalance({ address: account.address });
  console.log("Account balance:", formatEther(balance), "XTZ\n");

  const MOCK_USDT = "0x59a2fB83F0f92480702EDEE8f84c72a1eF44BD9b";

  console.log("=".repeat(60));
  console.log("Deploying SimplePoolManager (All-in-one contract)");
  console.log("=".repeat(60));
  console.log("");
  console.log("📦 Deploying SimplePoolManager...");

  const hash = await walletClient.deployContract({
    abi: SimplePoolManagerArtifact.abi,
    bytecode: SimplePoolManagerArtifact.bytecode as `0x${string}`,
    args: [MOCK_USDT],
  });

  console.log("Transaction hash:", hash);
  console.log("Waiting for confirmation...");

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  const contractAddress = receipt.contractAddress!;

  console.log("✅ SimplePoolManager deployed to:", contractAddress);
  console.log("");

  // Final summary
  console.log("=".repeat(60));
  console.log("🎉 DEPLOYMENT COMPLETE");
  console.log("=".repeat(60));
  console.log("");
  console.log("📋 Deployed Contract Address:");
  console.log("- SimplePoolManager:", contractAddress);
  console.log("");
  console.log("📝 Update your .env.local:");
  console.log(`NEXT_PUBLIC_POOL_MANAGER_ADDRESS=${contractAddress}`);
  console.log(`NEXT_PUBLIC_TOKEN_ADDRESS=${contractAddress}`);
  console.log(`NEXT_PUBLIC_USDT_ADDRESS=${MOCK_USDT}`);
  console.log("");
  console.log("ℹ️  Note: SimplePoolManager has built-in TLOOT token,");
  console.log("   so POOL_MANAGER and TOKEN addresses are the same!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
