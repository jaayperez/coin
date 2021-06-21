// This is the module we’ve imported to calculate the hash of each block. We converted it to string using toString() method as the module will return the object.
const SHA256 = require("crypto-js/sha256");
class BlockCrypto {
  constructor(index, current_time, info, nextHash = " ") {
    // This is a distinctive number tracking the index of every block in the blockchain.
    this.index = index;
    // As the name states, it keeps a record of the time when each transaction is completed.
    this.current_time = current_time;
    // All completed transactions data are recorded and stored by this method.
    this.info = info;
    // It is pointing to the hash_key of the next block in the network chain. It’s mainly used to keep and maintain the integrity of the blockchain.
    this.nextHash = nextHash;
    // Based on properties passed to this method, it is used to calculate the hashkey of the next block in the chain.
    this.hash = this.computeHash();
  }

  computeHash() {
    return SHA256(
      this.index +
      this.nextHash +
      this.current_time +
      JSON.stringify(this.info)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.block1chain = [this.startGenesisBlock()];
  }
  // This is the first block created in the peer-to-peer network and has not been linked to any other. To our knowledge of indexing it’s at index 0.
  initGenesisBlock() {
    return new BlockCrypto(0, "06/20/2021", "Initial Block in the Chain", "0");
  }
  // As named, we use it for finding the last block added in the chain. As explained earlier, it helps to ensure the hash of the current block and map it to the hash of the previous block to ensure the chain integrity.
  latestBlock() {
    return this.block1chain[this.block1chain.length - 1];
  }
  // A new block is added to the chain using this method. The previous hash block is matched to the current hash block to ensure minimal or no tampering with the chain.
  addNewBlock(newBlock) {
    newBlock.nextHash = this.latestBlock().hash;
    newBlock.hash = newBlock.computeHash();
    this.block1chain.push(newBlock);
  }


  // This method verifies the integrity of the blockchain.
  checkChainValidity() {
    // Checking validity.
    for (let i = 1; i < this.block1chain.length; i++) {
      const currentBlock = this.block1chain[i];
      const nextHash = this.block1chain[i - 1];
      // Checking current block hash.
      // If the integrity of the blockchain has been compromised, it returns false.
      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }
      // Comparing current block hash with the next block.
      // Otherwise, in case no anomalies are encountered, it returns true.
      if (currentBlock.nextHash !== nextHash.hash)
        return false;
    }
    return true;
  }
}

// Now let's create a new instance of the Blockchain class and name it thecoin.
let thecoin = new Blockchain();

console.log("thecoin mining progressing....");
// Added some blocks into the blockchain using arbitrary values.
thecoin.addNewBlock(
  new BlockCrypto(1, "06/20/2021", {
    sender: "Justin Perez",
    recipient: "Jeff Bezos",
    quantity: 1000000
  })
);

thecoin.addNewBlock(
  new BlockCrypto(2, "06/21/2022", {
    sender: "Elon Musk",
    recipient: "Justin Perez",
    quantity: 11000000
  })
);

console.log(JSON.stringify(thecoin, null, 4));
