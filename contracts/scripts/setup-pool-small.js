// Setup initial WOOD/WETH pool with available balance
// npx hardhat run scripts/setup-pool-small.js --network robinhoodTestnet

async function main() {
  const { ethers } = require("hardhat");

  const [deployer] = await ethers.getSigners();
  
  console.log("Setting up pool with account:", deployer.address);

  // ACTUAL deployed addresses
  const FACTORY_ADDRESS = "0xff6028E46364D8e691f5389C522F53133c0f1917";
  const ROUTER_ADDRESS = "0x0Cb47D1A9Fa3028eCC12Dd4688ABdE313A7a194e";
  const WETH_ADDRESS = "0x948E15C33F3e32df7673464ad64DF3b649b928ce";
  const WOOD_ADDRESS = "0x08F5FEeA797B3eAE564aAACeadDA36e4c123Ce5C";

  // Get contract instances
  const factory = await ethers.getContractAt("SherwoodFactory", FACTORY_ADDRESS);
  const router = await ethers.getContractAt("SherwoodRouter02", ROUTER_ADDRESS);
  const weth = await ethers.getContractAt("WETH", WETH_ADDRESS);
  const wood = await ethers.getContractAt("WOOD", WOOD_ADDRESS);

  console.log("\n📊 Current balances:");
  const woodBalance = await wood.balanceOf(deployer.address);
  const ethBalance = await ethers.provider.getBalance(deployer.address);
  console.log("WOOD balance:", ethers.formatEther(woodBalance));
  console.log("ETH balance:", ethers.formatEther(ethBalance));

  // Use smaller amounts based on available ETH
  const ethToUse = ethers.parseEther("0.01"); // 0.01 ETH (leave some for gas)
  const woodToUse = ethers.parseEther("1000"); // 1000 WOOD (ratio 100k WOOD per ETH)

  // Step 1: Approve WOOD for router
  console.log("\n📝 Step 1: Approving WOOD...");
  const woodApproveTx = await wood.approve(ROUTER_ADDRESS, woodToUse);
  await woodApproveTx.wait();
  console.log("✅ WOOD approved");

  // Step 2: Add liquidity directly with ETH (router will wrap it)
  console.log("\n📝 Step 2: Adding liquidity to WOOD/WETH pool...");
  console.log("Amounts:", {
    WOOD: ethers.formatEther(woodToUse),
    ETH: ethers.formatEther(ethToUse)
  });
  
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

  try {
    const addLiqTx = await router.addLiquidityETH(
      WOOD_ADDRESS,
      woodToUse,
      ethers.parseEther("900"), // min WOOD
      ethers.parseEther("0.005"), // min ETH
      deployer.address,
      deadline,
      { value: ethToUse, gasLimit: 2000000 }
    );
    console.log("Transaction submitted, waiting for confirmation...");
    const receipt = await addLiqTx.wait();
    console.log("✅ Liquidity added!");
    console.log("TX Hash:", receipt.hash);
  } catch (error) {
    console.error("Error adding liquidity:", error.message);
    return;
  }

  // Step 3: Check pair was created
  console.log("\n📝 Step 3: Checking pair...");
  const pairAddress = await factory.getPair(WOOD_ADDRESS, WETH_ADDRESS);
  console.log("WOOD/WETH Pair address:", pairAddress);

  if (pairAddress !== "0x0000000000000000000000000000000000000000") {
    const pair = await ethers.getContractAt("SherwoodPair", pairAddress);
    const reserves = await pair.getReserves();
    console.log("\n📊 Pool Reserves:");
    console.log("  Reserve0:", ethers.formatEther(reserves[0]));
    console.log("  Reserve1:", ethers.formatEther(reserves[1]));
    const lpBalance = await pair.balanceOf(deployer.address);
    console.log("  LP tokens received:", ethers.formatEther(lpBalance));
    
    // Get token order
    const token0 = await pair.token0();
    console.log("\n  Token0:", token0);
    console.log("  Token1:", await pair.token1());
    
    console.log("\n🎉 Pool setup complete!");
    console.log("\n📋 Add this to frontend addresses.ts:");
    console.log(`PAIR_ADDRESS: '${pairAddress}',`);
  } else {
    console.log("❌ Pair not created.");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
