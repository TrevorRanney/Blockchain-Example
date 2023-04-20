var assert = require('assert');
var hash = require('object-hash');
var block = require('../block');

describe('getBlockHash', () => {
    it('should return the data of the first block', () => {
        const transactions = ['a','b','c'];
        const testBlock = block(transactions);

        assert.equal(testBlock.getBlockData(), transactions);
    });

    it('should return the hash of the first block', () => {
        const transactions = ['a','b','c'];
        const testBlock = block(transactions);
        const expectedHash = hash(transactions);

        assert.equal(testBlock.getBlockHash(), expectedHash);
    });

    it('should return the data of a 2nd block', () => {
        const firstBlock = block(['a','b','d']);
        const secondBlockData = ['e','f','g'];
        const secondBlock = block(secondBlockData, firstBlock);

        assert.equal(secondBlock.getBlockData(), secondBlockData);
    });

    it('should return the hash of a 2nd block', () => {
        const firstBlock = block(['a','b','d']);
        const secondBlockData = ['e','f','g'];
        const secondBlock = block(secondBlockData, firstBlock);
        const expectedHash = hash([firstBlock.getBlockHash(), secondBlockData]);

        assert.equal(secondBlock.getBlockHash(), expectedHash);
    });

    it('should not return the hash of the block with altered transactions', () => {
        const transactions = ['a','b','c'];
        const testBlock = block(transactions);
        const expectedHash = testBlock.getBlockHash();
        const alteredtransactions = ['a','b','d'];
        const alteredBlock = block(alteredtransactions);

        assert.notEqual(alteredBlock.getBlockHash(), expectedHash);
    });

    it('should return the data of a previous block when asked', () => {
        const firstBlockData = ['a','b','c'];
        const firstBlock = block(firstBlockData);
        const secondBlock = block(['d','e','f'], firstBlock);
        const firstHash = firstBlock.getBlockHash();
        assert.equal(firstBlockData, secondBlock.previousBlock.getBlockData() );
    });

    it('should return the hash of a previous block when asked', () => {
        const firstBlock = block(['a','b','c']);
        const secondBlock = block(['d','e','f'], firstBlock);
        const firstHash = firstBlock.getBlockHash();
        assert.equal(firstHash, secondBlock.previousBlock.getBlockHash() );
    });
});


