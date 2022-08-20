const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //Constructor Function
const web3 = new Web3(ganache.provider()); // Provider is the communication layer between web3 and local test network (Ganache)