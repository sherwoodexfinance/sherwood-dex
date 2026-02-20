import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // Deploy WETH first
  console.log("\n📦 Deploying WETH...");
  const WETH = await ethers.getContractFactory("WETH");
  const weth = await WETH.deploy();
  await weth.waitForDeployment();
  const wethAddress = await weth.getAddress();
  console.log("✅ WETH deployed to:", wethAddress);

  // Deploy Factory
  console.log("\n📦 Deploying SherwoodFactory...");
  const Factory = await ethers.getContractFactory("SherwoodFactory");
  const factory = await Factory.deploy(deployer.address);
  await factory.waitForDeployment();
  const factoryAddress = await factory.getAddress();
  console.log("✅ SherwoodFactory deployed to:", factoryAddress);

  // Deploy Router
  console.log("\n📦 Deploying SherwoodRouter02...");
  const Router = await ethers.getContractFactory("SherwoodRouter02");
  const router = await Router.deploy(factoryAddress, wethAddress);
  await router.waitForDeployment();
  const routerAddress = await router.getAddress();
  console.log("✅ SherwoodRouter02 deployed to:", routerAddress);

  // Deploy WOOD Token
  console.log("\n📦 Deploying WOOD Token...");
  const WOOD = await ethers.getContractFactory("WOOD");
  const wood = await WOOD.deploy(deployer.address);
  await wood.waitForDeployment();
  const woodAddress = await wood.getAddress();
  console.log("✅ WOOD Token deployed to:", woodAddress);

  // Mint initial WOOD tokens to deployer
  console.log("\n📦 Minting initial WOOD tokens...");
  const mintAmount = ethers.parseEther("100000000"); // 100 million WOOD
  await wood.mint(deployer.address, mintAmount);
  console.log("✅ Minted 100,000,000 WOOD to deployer");

  // Output deployment addresses
  console.log("\n🎉 DEPLOYMENT COMPLETE!\n");
  console.log("=".repeat(50));
  console.log("Contract Addresses:");
  console.log("=".repeat(50));
  console.log(`FACTORY_ADDRESS=${factoryAddress}`);
  console.log(`ROUTER_ADDRESS=${routerAddress}`);
  console.log(`WETH_ADDRESS=${wethAddress}`);
  console.log(`WOOD_ADDRESS=${woodAddress}`);
  console.log("=".repeat(50));
  
  // Get INIT_CODE_HASH
  const initCodeHash = await factory.INIT_CODE_PAIR_HASH();
  console.log(`INIT_CODE_HASH=${initCodeHash}`);
  console.log("=".repeat(50));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
