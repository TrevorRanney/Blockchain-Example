var Blockchain = require('./blockchain');
var Block = require('./block');

// Create the blockchain
var genesisBlock = Block('genesis');
var blockchain = Blockchain(genesisBlock);

// Write some code to be placed on the chain
var contract = `console.log('This is a javascript smart contract ;)');`;

// Create a Block using the hash of the last block in the blockchain
var contractBlock = Block(contract, blockchain.getCurrentBlock() );

// Add it to the blockchain
blockchain.addBlock(contractBlock);

// Prove that it can be retrieved and executed
blockOffTheChain = blockchain.getBlock(contractBlock.getBlockHash());
var code = blockOffTheChain.getBlockData();
console.log('Execute the contract: ');
eval(code);
