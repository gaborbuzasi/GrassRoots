pragma solidity ^0.4.13;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract GrassRootsCoin is MintableToken {
  string public name = "GRASSROOTS COIN";
  string public symbol = "GRS";
  uint256 public decimals = 18;
}
