// Debug script - create pair first
// npx hardhat run scripts/debug-pair.js --network robinhoodTestnet

async function main() {
  const { ethers } = require("hardhat");

  const [deployer] = await ethers.getSigners();
  
  console.log("Debug with account:", deployer.address);

  const FACTORY_ADDRESS = "0xff6028E46364D8e691f5389C522F53133c0f1917";
  const ROUTER_ADDRESS = "0x0Cb47D1A9Fa3028eCC12Dd4688ABdE313A7a194e";
  const WETH_ADDRESS = "0x948E15C33F3e32df7673464ad64DF3b649b928ce";
  const WOOD_ADDRESS = "0x08F5FEeA797B3eAE564aAACeadDA36e4c123Ce5C";

  const factory = await ethers.getContractAt("SherwoodFactory", FACTORY_ADDRESS);
  const weth = await ethers.getContractAt("WETH", WETH_ADDRESS);
  const wood = await ethers.getContractAt("WOOD", WOOD_ADDRESS);

  // Check if pair exists
  let pairAddress = await factory.getPair(WOOD_ADDRESS, WETH_ADDRESS);
  console.log("Existing pair:", pairAddress);

  // If no pair, create one
  if (pairAddress === "0x0000000000000000000000000000000000000000") {
    console.log("\n📝 Creating pair...");
    try {
      const createTx = await factory.createPair(WOOD_ADDRESS, WETH_ADDRESS, { gasLimit: 5000000 });
      const receipt = await createTx.wait();
      console.log("✅ Pair created! TX:", receipt.hash);
      pairAddress = await factory.getPair(WOOD_ADDRESS, WETH_ADDRESS);
      console.log("Pair address:", pairAddress);
    } catch (error) {
      console.error("Error creating pair:", error.message);
      return;
    }
  }

  // Get pair contract
  const pair = await ethers.getContractAt("SherwoodPair", pairAddress);
  console.log("\nPair info:");
  console.log("  token0:", await pair.token0());
  console.log("  token1:", await pair.token1());

  // Approve tokens to pair directly
  console.log("\n📝 Approving tokens to pair...");
  const woodAmount = ethers.parseEther("1000");
  const ethAmount = ethers.parseEther("0.008");

  const approveWood = await wood.approve(pairAddress, woodAmount);
  await approveWood.wait();
  console.log("✅ WOOD approved to pair");

  // Wrap ETH and approve
  console.log("\n📝 Wrapping ETH...");
  const wrapTx = await weth.deposit({ value: ethAmount, gasLimit: 100000 });
  await wrapTx.wait();
  console.log("✅ ETH wrapped");

  const approveWeth = await weth.approve(pairAddress, ethAmount);
  await approveWeth.wait();
  console.log("✅ WETH approved to pair");

  // Transfer tokens to pair
  console.log("\n📝 Transferring tokens to pair...");
  const transferWood = await wood.transfer(pairAddress, woodAmount);
  await transferWood.wait();
  console.log("✅ WOOD transferred");

  const transferWeth = await weth.transfer(pairAddress, ethAmount);
  await transferWeth.wait();
  console.log("✅ WETH transferred");

  // Call mint on pair
  console.log("\n📝 Minting LP tokens...");
  try {
    const mintTx = await pair.mint(deployer.address, { gasLimit: 500000 });
    const receipt = await mintTx.wait();
    console.log("✅ LP tokens minted! TX:", receipt.hash);
    
    const lpBalance = await pair.balanceOf(deployer.address);
    console.log("LP tokens:", ethers.formatEther(lpBalance));
    
    const reserves = await pair.getReserves();
    console.log("\n📊 Reserves:");
    console.log("  Reserve0:", ethers.formatEther(reserves[0]));
    console.log("  Reserve1:", ethers.formatEther(reserves[1]));
  } catch (error) {
    console.error("Error minting:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
