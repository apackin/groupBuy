pragma solidity ^0.4.11;


import "./StandardToken.sol";
import "../lifecycle/Killable.sol";


/**
 * @title SingleSourceCreationToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator. 
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `StandardToken` functions.
 */
contract SingleSourceCreationToken is StandardToken, Killable {

  string public name = "GroupBuy";
  string public symbol = "GBT";
  uint256 public decimals = 0;

  /**
   * @dev Creates tokens and send to the specified address.
   * @param recipient The address which will recieve the new tokens.
   */
  function createTokens(address recipient, uint tokensCreated) onlyOwner {
    if (tokensCreated <= 0) {
      throw;
    }
    totalSupply = totalSupply.add(tokensCreated);
    balances[recipient] = balances[recipient].add(tokensCreated);
  }

}