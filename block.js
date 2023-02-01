var hash = require('object-hash');

var block = (previousHash, data) => {
    const previousBlockHash = previousHash;
    const blockData = data;
    const currentHash = hash([previousHash, data]);

    return {
        getPreviousHash : () => {
            return previousBlockHash;
        },
        getBlockHash : () => {
            return currentHash;
        },
        getBlockData : () => {
            return blockData;
        }
    };
};

module.exports = block;