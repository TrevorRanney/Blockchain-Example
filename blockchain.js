var blockchain = (genesisBlock) => {
    var blocks = {};
    var currentBlock = genesisBlock;
    var currentHash = genesisBlock.getBlockHash();
    blocks[currentHash] = genesisBlock;

    return {
        getCurrentBlock: () => {
            return currentBlock;
        },
        getCurrentHash: () => {
            return currentHash;
        },
        getBlock : (hash) => {
            return blocks[hash];
        },
        addBlock : (block) => {
            if(currentHash === block.previousBlock.getBlockHash() ){
                currentBlock = block;
                currentHash = block.getBlockHash();
                blocks[currentHash] = block;
            }
            else{
                throw('Invalid Block');
            }
        }
    };
};

module.exports = blockchain;