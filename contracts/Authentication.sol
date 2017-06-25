pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';

contract Authentication is Killable {
  struct User {
    bytes32 name;
  }

  mapping (address => User) private users;
  mapping (bytes32 => address) private userList;

  uint private id; // Stores user id temporarily

  function login() constant returns (bytes32) {
    // Check if user exists.
    // If yes, return user.
    // If no, throw.

    if (users[msg.sender].name == 0x0)
    {
        throw;
    }

    return (users[msg.sender].name);
  }

  function signup(bytes32 name) payable returns (bytes32) {
    // Check if name was sent
    // If no, throw.
    // If yes, Check if user exist.
    // If yes, return user name.
    // If no, check if name is taken.
    // If yes, throw.
    // if no, create and return user.

    if (name == 0x0)
    {
        throw;
    }

    if (users[msg.sender].name == 0x0)
    {
        // if user name is taken throw.
        if (userList[name] != 0x0)
        {
          throw;
        }
        users[msg.sender].name = name;
        userList[name] = msg.sender;
        return (users[msg.sender].name);
    }

    // This burns gas for nothing? Should there be a way to check before using gas if the name exists?
    return (users[msg.sender].name);
  }

  function update(bytes32 name) payable returns (bytes32) {
    // Update user name.

    if (name == 0x0)
    {
        throw;
    }

    if (users[msg.sender].name != 0x0)
    {
        // if user name is taken throw.
        if (userList[name] != 0x0)
        {
            throw;
        }
        delete userList[users[msg.sender].name];
        users[msg.sender].name = name;
        userList[name] = msg.sender;
        return (users[msg.sender].name);
    }

    throw;
  }
}
