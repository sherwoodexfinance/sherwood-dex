// Setup initial WOOD/WETH pool
// npx hardhat run scripts/setup-pool.js --network robinhoodTestnet

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

  // Step 1: Approve WOOD for router
  console.log("\n📝 Step 1: Approving WOOD...");
  const approveAmount = ethers.parseEther("1000000"); // 1M WOOD
  
  const woodApproveTx = await wood.approve(ROUTER_ADDRESS, approveAmount);
  await woodApproveTx.wait();
  console.log("✅ WOOD approved");

  // Step 2: Approve WETH for router (wrap ETH first if needed)
  console.log("\n📝 Step 2: Checking WETH balance...");
  let wethBalance = await weth.balanceOf(deployer.address);
  console.log("WETH balance:", ethers.formatEther(wethBalance));
  
  if (wethBalance < ethers.parseEther("10")) {
    console.log("Wrapping 10 ETH to WETH...");
    const depositTx = await weth.deposit({ value: ethers.parseEther("10") });
    await depositTx.wait();
    wethBalance = await weth.balanceOf(deployer.address);
    console.log("✅ Wrapped ETH. New WETH balance:", ethers.formatEther(wethBalance));
  }

  // Approve WETH
  const wethApproveTx = await weth.approve(ROUTER_ADDRESS, ethers.parseEther("10"));
  await wethApproveTx.wait();
  console.log("✅ WETH approved");

  // Step 3: Add liquidity
  console.log("\n📝 Step 3: Adding liquidity to WOOD/WETH pool...");
  const amountWOOD = ethers.parseEther("100000"); // 100k WOOD
  const amountETH = ethers.parseEther("5"); // 5 ETH (keep some for gas)
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

  try {
    const addLiqTx = await router.addLiquidityETH(
      WOOD_ADDRESS,
      amountWOOD,
      ethers.parseEther("90000"), // min WOOD (90k)
      ethers.parseEther("4"), // min ETH (4)
      deployer.address,
      deadline,
      { value: amountETH, gasLimit: 5000000 }
    );
    console.log("Transaction submitted, waiting for confirmation...");
    const receipt = await addLiqTx.wait();
    console.log("✅ Liquidity added!");
    console.log("TX Hash:", receipt.hash);
  } catch (error) {
    console.error("Error adding liquidity:", error.message);
    if (error.data) console.error("Error data:", error.data);
  }

  // Step 4: Check pair was created
  console.log("\n📝 Step 4: Checking pair...");
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
    
    console.log("\n🎉 Pool setup complete!");
    console.log("\n📋 Save this for frontend:");
    console.log(`PAIR_ADDRESS=${pairAddress}`);
  } else {
    console.log("❌ Pair not created. Check for errors above.");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
