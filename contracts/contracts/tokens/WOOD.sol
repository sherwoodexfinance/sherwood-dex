// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract WOOD is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 billion max

    constructor(address initialOwner) 
        ERC20("Sherwood WOOD", "WOOD") 
        Ownable(initialOwner)
        ERC20Permit("Sherwood WOOD")
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "WOOD: Max supply exceeded");
        _mint(to, amount);
    }

    // Owner can renounce minting rights by transferring ownership to zero address
    function renounceMinting() external onlyOwner {
        renounceOwnership();
    }
}
