var assert = require('assert');

var block = require('../block');
var blockchain = require('../blockchain');

describe('Blockchain', () => {

    it('should contain the genesis block when created', () => {
        var genesisBlock = block("genesis block");
        var chain = blockchain(genesisBlock);

        assert.equal(chain.getCurrentBlock(), genesisBlock);
    });

    it('should get the last block hash when get last hash is called ', () =>{
        var genesisBlock = block("genesis block");
        var chain =  blockchain(genesisBlock);

        var expectedHash = genesisBlock.getBlockHash();

        var hash = chain.getCurrentHash();

        assert.equal(hash, expectedHash);
    });

    it('should be able to retrieve the second block after it is created', () => {
        var genesisBlock = block("genesis block");
        var chain =  blockchain(genesisBlock);

        var newBlock = block(['data'], chain.getCurrentBlock() );

        chain.addBlock(newBlock);

        assert.equal(chain.getBlock(newBlock.getBlockHash()), newBlock);
    });

    it('should throw an error if blocks previous hash does not match blockchains current hash', () => {
        var genesisBlock = block("genesis block");
        var chain =  blockchain(genesisBlock);

        var newBlock = block('trash', ['data']);

        assert.throws(() => { chain.addBlock(newBlock); });
    });

    it('should return the last hash for the second block after it is created', () => {
        var genesisBlock = block("genesis block");
        var chain =  blockchain(genesisBlock);

        var newBlock = block(['data'], genesisBlock);

        chain.addBlock(newBlock);

        assert.equal(chain.getCurrentHash(), newBlock.getBlockHash());
    });
});

