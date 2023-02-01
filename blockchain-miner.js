var blockchain = require('./blockchain');
var block = require('./block');

// Create the blockchain
var genesisBlock = block(0, '0');
var chain = blockchain(genesisBlock);

var startingDifficulty = 4;
var difficultyPrefix = '0';

// Mine 3 blocks
for(var blockChainLength = 1; blockChainLength < 4; blockChainLength++) {
    // Collect new data
    var nextBlockData = getNextData();

    // Mine the next block
    var nextBlock = mineNextBlock(nextBlockData);

    // Add it to the blockchain
    chain.addBlock(nextBlock);

    console.log("block", blockChainLength, "data contains", nextBlock.getBlockData(), "with hash", nextBlock.getBlockHash());
}

function mineNextBlock(blockDataValue){
    // Create an arbitrary number that can be altered to change the hash result
    var nonce = 0;
    var data = { data: blockDataValue, nonce: nonce };

    // Create a trial block using new data
    var blockData = data;
    var trialBlock = block(chain.getCurrentHash(), blockData);

    // Test if the trial block has a valid hash
    while(!isValidHashDifficulty(trialBlock.getBlockHash(), startingDifficulty)) {
        // Alter the nonce for next trial
        nonce++;
        // Create the next trial block using new nonce
        trialBlock = block(chain.getCurrentHash(), [blockData, nonce]);
    }

    // Found the next valid block
    return trialBlock;
}

// In order to make a miner useful it helps to associate data with the encryption,
// that way if this data is changed when the hash is recalcuated it will change all preceeding hashes 
function getNextData(){
    return  "Block data:" + blockChainLength;
}

// Check to see if the hash we pass in meet the arbitrary conditions we have set
// This makes it more difficult to create a desirable hash then to verify it
function isValidHashDifficulty(hash, currentDifficulty) {
    return hash.startsWith(difficultyPrefix.repeat(currentDifficulty));
}


// Retrieving a block using its hash and show its data
var exampleHash = '0000f7ed7323e5c07b40c330abf574b632db66f6';
console.log("\nBlock with hash", exampleHash);
console.log(chain.getBlock(exampleHash).getBlockData());
