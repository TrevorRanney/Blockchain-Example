var CryptoJS = require("crypto-js");
var Blockchain = require('./blockchain');
var Block = require('./block');

// Create the blockchain
var genesisBlock = Block('genesis');
var blockchain = Blockchain(genesisBlock);

// Create sample data and a super strong key
var data = `Here is an example of encrypted data stored on a blockchain.`

// Here is the Key that the user would keep private
var secretKey = 'secret key 123';

// Encrypt data and add it to a BlockData object
var encryptedData = CryptoJS.AES.encrypt(data, secretKey);

// Create a Block using the hash of the last/current block in the blockchain and the BlockData 
var encryptedBlock = Block(encryptedData, blockchain.getCurrentBlock() );

// Add it to the blockchain
blockchain.addBlock(encryptedBlock);

// Prove that it can be retrieved and decrypted
var blockOffTheChain = blockchain.getBlock(encryptedBlock.getBlockHash());
var encryptedData = blockOffTheChain.getBlockData();
var decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
console.log('Decrypted data:', decryptedData);