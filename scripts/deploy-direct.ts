import { createWalletClient, createPublicClient, http, formatEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import * as dotenv from "dotenv";

// Import contract ABIs
import PlatformTokenV2Artifact from "../artifacts/contracts/PlatformTokenV2.sol/PlatformTokenV2.json" assert { type: "json" };
import LuckyDrawFactoryArtifact from "../artifacts/contracts/LuckyDrawFactory.sol/LuckyDrawFactory.json" assert { type: "json" };
import CommitToClaimFactoryArtifact from "../artifacts/contracts/CommitToClaimFactory.sol/CommitToClaimFactory.json" assert { type: "json" };

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
    console.log("🚀 Deploying Complete Pool System with TLOOT V2 to Etherlink Shadownet...\n");

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

    // Existing contracts
    const MOCK_USDT = "0x59a2fB83F0f92480702EDEE8f84c72a1eF44BD9b";
    const SUPRA_ROUTER = "0x214F9eD5750D2fC87ae084184e999Ff7DFa1EB09";
    const adminAddress = account.address;

    console.log("Using existing contracts:");
    console.log("- MockUSDT:", MOCK_USDT);
    console.log("- Supra Router:", SUPRA_ROUTER);
    console.log("- Admin:", adminAddress);
    console.log("");

    // Step 1: Deploy PlatformTokenV2 (TLOOT)
    console.log("=".repeat(60));
    console.log("STEP 1: Deploy PlatformTokenV2 (TLOOT)");
    console.log("=".repeat(60));
    console.log("");
    console.log("📦 Deploying PlatformTokenV2...");

    const tlootHash = await walletClient.deployContract({
        abi: PlatformTokenV2Artifact.abi,
        bytecode: PlatformTokenV2Artifact.bytecode as `0x${string}`,
        args: [],
    });

    const tlootReceipt = await publicClient.waitForTransactionReceipt({ hash: tlootHash });
    const tlootAddress = tlootReceipt.contractAddress!;
    console.log("✅ PlatformTokenV2 deployed to:", tlootAddress);
    console.log("");

    // Step 2: Deploy Factories
    console.log("=".repeat(60));
    console.log("STEP 2: Deploy Factory Contracts");
    console.log("=".repeat(60));
    console.log("");

    console.log("📦 Deploying LuckyDrawFactory...");
    const ldFactoryHash = await walletClient.deployContract({
        abi: LuckyDrawFactoryArtifact.abi,
        bytecode: LuckyDrawFactoryArtifact.bytecode as `0x${string}`,
        args: [MOCK_USDT, tlootAddress, SUPRA_ROUTER, adminAddress],
    });
    const ldFactoryReceipt = await publicClient.waitForTransactionReceipt({ hash: ldFactoryHash });
    const ldFactoryAddress = ldFactoryReceipt.contractAddress!;
    console.log("✅ LuckyDrawFactory deployed to:", ldFactoryAddress);
    console.log("");

    console.log("📦 Deploying CommitToClaimFactory...");
    const ctcFactoryHash = await walletClient.deployContract({
        abi: CommitToClaimFactoryArtifact.abi,
        bytecode: CommitToClaimFactoryArtifact.bytecode as `0x${string}`,
        args: [MOCK_USDT, tlootAddress, adminAddress],
    });
    const ctcFactoryReceipt = await publicClient.waitForTransactionReceipt({ hash: ctcFactoryHash });
    const ctcFactoryAddress = ctcFactoryReceipt.contractAddress!;
    console.log("✅ CommitToClaimFactory deployed to:", ctcFactoryAddress);
    console.log("");

    // Step 3: Grant roles...
    console.log("=".repeat(60));
    console.log("STEP 3: Grant MINTER_ROLE to Factories");
    console.log("=".repeat(60));
    console.log("");

    const MINTER_ROLE = "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";

    console.log("Granting MINTER_ROLE to LuckyDrawFactory...");
    const grantLDHash = await walletClient.writeContract({
        address: tlootAddress,
        abi: PlatformTokenV2Artifact.abi,
        functionName: "grantRole",
        args: [MINTER_ROLE, ldFactoryAddress],
    });
    await publicClient.waitForTransactionReceipt({ hash: grantLDHash });
    console.log("✅ Granted MINTER_ROLE to LuckyDrawFactory");

    console.log("Granting MINTER_ROLE to CommitToClaimFactory...");
    const grantCTCHash = await walletClient.writeContract({
        address: tlootAddress,
        abi: PlatformTokenV2Artifact.abi,
        functionName: "grantRole",
        args: [MINTER_ROLE, ctcFactoryAddress],
    });
    await publicClient.waitForTransactionReceipt({ hash: grantCTCHash });
    console.log("✅ Granted MINTER_ROLE to CommitToClaimFactory");
    console.log("");

    // Final summary
    console.log("=".repeat(60));
    console.log("🎉 DEPLOYMENT COMPLETE");
    console.log("=".repeat(60));
    console.log("");
    console.log("📋 Deployed Contract Addresses:");
    console.log("- PlatformTokenV2 (TLOOT):", tlootAddress);
    console.log("- LuckyDrawFactory:", ldFactoryAddress);
    console.log("- CommitToClaimFactory:", ctcFactoryAddress);
    console.log("");
    console.log("📝 Update your .env.local:");
    console.log(`NEXT_PUBLIC_POOL_MANAGER_ADDRESS=${ldFactoryAddress}`);
    console.log(`NEXT_PUBLIC_TOKEN_ADDRESS=${tlootAddress}`);
    console.log(`NEXT_PUBLIC_USDT_ADDRESS=${MOCK_USDT}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
