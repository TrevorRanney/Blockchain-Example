var assert = require('assert');
var hash = require('object-hash');
var block = require('../block');

describe('getBlockHash', () => {
    it('should return the hash of the first block', () => {
        var previousHash = 123;
        var transactions = ['a','b','c'];
        var testBlock = block(previousHash, transactions);
        var expectedHash = hash([previousHash, transactions]);

        assert.equal(testBlock.getBlockHash(), expectedHash);
    });

    it('should return the hash of a new block', () => {
        var previousHash = 456;
        var transactions = ['a','b','d'];
        var testBlock = block(previousHash, transactions);
        var expectedHash = hash([previousHash, transactions]);

        assert.equal(testBlock.getBlockHash(), expectedHash);
    });

    it('should not return the hash of the block with altered transactions', () => {
        var previousHash = 123;
        var transactions = ['a','b','c'];
        var testBlock = block(previousHash, transactions);
        var transactions = ['a','b','d'];
        var expectedHash = hash([previousHash,  transactions]);

        assert.notEqual(testBlock.getBlockHash(), expectedHash);
    });

    it('should return the hash of a previous block when asked', () => {
        var previousHash = 456;
        var transactions = ['a','b','d'];
        var testBlock = block(previousHash, transactions);

        assert.equal(previousHash, testBlock.getPreviousHash());
    });
});


