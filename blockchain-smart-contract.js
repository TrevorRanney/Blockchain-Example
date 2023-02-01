var CryptoJS = require("crypto-js");
var Blockchain = require('./blockchain');
var Block = require('./block');

// Create the blockchain
var genesisBlock = Block(0, '0');
var blockchain = Blockchain(genesisBlock);

// Write some code to be placed on the chain
var contract = `console.log('This is a javascript smart contract ;)');`;

// Create a Block using the hash of the last/current block in the blockchain and the BlockData
var contractBlock = Block(blockchain.getCurrentHash(), contract);

// Add it to the blockchain
blockchain.addBlock(contractBlock);

// Prove that it can be retrieved and executed
blockOffTheChain = blockchain.getBlock(contractBlock.getBlockHash());
var code = blockOffTheChain.getBlockData();
console.log('Execute the contract: ');
eval(code);
