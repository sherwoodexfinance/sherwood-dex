import { expect } from "chai";
import { ethers } from "hardhat";
import { SherwoodFactory, SherwoodPair, SherwoodRouter02, WETH, WOOD } from "../typechain-types";

describe("Sherwood DEX", function () {
  let factory: SherwoodFactory;
  let router: SherwoodRouter02;
  let weth: WETH;
  let wood: WOOD;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy WETH
    const WETHFactory = await ethers.getContractFactory("WETH");
    weth = await WETHFactory.deploy();

    // Deploy Factory
    const FactoryContract = await ethers.getContractFactory("SherwoodFactory");
    factory = await FactoryContract.deploy(owner.address);

    // Deploy Router
    const RouterContract = await ethers.getContractFactory("SherwoodRouter02");
    router = await RouterContract.deploy(await factory.getAddress(), await weth.getAddress());

    // Deploy WOOD token
    const WOODContract = await ethers.getContractFactory("WOOD");
    wood = await WOODContract.deploy(owner.address);
  });

  describe("Factory", function () {
    it("Should set the correct feeToSetter", async function () {
      expect(await factory.feeToSetter()).to.equal(owner.address);
    });

    it("Should create a pair", async function () {
      const tokenA = await wood.getAddress();
      const tokenB = await weth.getAddress();
      
      await expect(factory.createPair(tokenA, tokenB))
        .to.emit(factory, "PairCreated");
      
      const pairAddress = await factory.getPair(tokenA, tokenB);
      expect(pairAddress).to.not.equal(ethers.ZeroAddress);
    });

    it("Should have correct INIT_CODE_HASH", async function () {
      const initCodeHash = await factory.INIT_CODE_PAIR_HASH();
      expect(initCodeHash).to.not.equal(ethers.ZeroHash);
    });
  });

  describe("WOOD Token", function () {
    it("Should have correct name and symbol", async function () {
      expect(await wood.name()).to.equal("Sherwood WOOD");
      expect(await wood.symbol()).to.equal("WOOD");
    });

    it("Should allow owner to mint", async function () {
      await wood.mint(owner.address, ethers.parseEther("1000"));
      expect(await wood.balanceOf(owner.address)).to.equal(ethers.parseEther("1000"));
    });

    it("Should not allow non-owner to mint", async function () {
      await expect(
        wood.connect(addr1).mint(addr1.address, ethers.parseEther("1000"))
      ).to.be.reverted;
    });
  });

  describe("Router - Add Liquidity", function () {
    it("Should add liquidity", async function () {
      const tokenA = await wood.getAddress();
      const tokenB = await weth.getAddress();
      
      // Mint tokens
      await wood.mint(owner.address, ethers.parseEther("10000"));
      await wood.approve(await router.getAddress(), ethers.parseEther("10000"));
      
      // Approve WETH (mint by depositing ETH)
      await weth.deposit({ value: ethers.parseEther("10") });
      await weth.approve(await router.getAddress(), ethers.parseEther("10"));
      
      await router.addLiquidity(
        tokenA,
        tokenB,
        ethers.parseEther("1000"),
        ethers.parseEther("1"),
        0,
        0,
        owner.address,
        Math.floor(Date.now() / 1000) + 3600
      );

      const pairAddress = await factory.getPair(tokenA, tokenB);
      const pair = await ethers.getContractAt("SherwoodPair", pairAddress);
      const lpBalance = await pair.balanceOf(owner.address);
      
      expect(lpBalance).to.be.gt(0);
    });
  });
});
