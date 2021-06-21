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
