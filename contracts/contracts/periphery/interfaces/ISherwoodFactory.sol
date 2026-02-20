// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ISherwoodFactory {
    function feeTo() external view returns (address);
    function feeToSetter() external view returns (address);
    function migrator() external view returns (address);

    function getPair(address tokenA, address tokenB) external view returns (address pair);
    function allPairs(uint256) external view returns (address pair);
    function allPairsLength() external view returns (uint256);

    function createPair(address tokenA, address tokenB) external returns (address pair);
    function setFeeTo(address _feeTo) external;
    function setFeeToSetter(address _feeToSetter) external;
    function setMigrator(address _migrator) external;
    function INIT_CODE_PAIR_HASH() external view returns (bytes32);
}
