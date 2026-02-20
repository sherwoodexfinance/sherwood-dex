// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SherwoodPair.sol";
import "../periphery/interfaces/ISherwoodFactory.sol";

contract SherwoodFactory is ISherwoodFactory {
    address public override feeTo;
    address public override feeToSetter;
    address public override migrator;

    mapping(address => mapping(address => address)) public override getPair;
    address[] public override allPairs;

    event PairCreated(address indexed token0, address indexed token1, address pair, uint256);

    constructor(address _feeToSetter) {
        feeToSetter = _feeToSetter;
    }

    function allPairsLength() external view override returns (uint256) {
        return allPairs.length;
    }

    function createPair(address tokenA, address tokenB) external override returns (address pair) {
        require(tokenA != tokenB, "Sherwood: IDENTICAL_ADDRESSES");
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), "Sherwood: ZERO_ADDRESS");
        require(getPair[token0][token1] == address(0), "Sherwood: PAIR_EXISTS");
        
        bytes memory bytecode = type(SherwoodPair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        SherwoodPair(pair).initialize(token0, token1);
        
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair;
        allPairs.push(pair);
        
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external override {
        require(msg.sender == feeToSetter, "Sherwood: FORBIDDEN");
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external override {
        require(msg.sender == feeToSetter, "Sherwood: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }

    function setMigrator(address _migrator) external override {
        require(msg.sender == feeToSetter, "Sherwood: FORBIDDEN");
        migrator = _migrator;
    }

    function INIT_CODE_PAIR_HASH() external pure override returns (bytes32) {
        return keccak256(type(SherwoodPair).creationCode);
    }
}
