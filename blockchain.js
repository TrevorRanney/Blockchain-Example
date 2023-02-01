var blockchain = (genesisBlock) => {
    var blocks = {};
    var currentHash = genesisBlock.getBlockHash();

    blocks[currentHash] = genesisBlock;

    return {
        getCurrentHash: () => {
            return currentHash;
        },
        getBlock : (hash) => {
            return blocks[hash];
        },
        addBlock : (block) => {
            if(currentHash === block.getPreviousHash() ){
                currentHash = block.getBlockHash();
                blocks[currentHash] = block;
            }
            else{
                throw('The new block hash does not match the current hash. Call getCurrentHash.');
            }
        }
    };
};

module.exports = blockchain;