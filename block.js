
var hash = require('object-hash');

var block = (data, previousBlock) => {
    
    const getBlockData = () => {
        return data;
    }

    const getBlockHash = () => {
        return previousBlock ? hash([previousBlock.getBlockHash(), data]) : hash(data);
    }

    // const getPreviousBlock = () => {
    //     return previousBlock;
    // }

    return {
        previousBlock,
        getBlockHash,
        getBlockData
    };
};

module.exports = block;