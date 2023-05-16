import { KeyGenerator } from './keyGenerator';
import * as crypto from "crypto";

class Wallet {
  private keyGenerator: KeyGenerator;

  constructor() {
    this.keyGenerator = new KeyGenerator();
  }

  generatePrivateKey(): crypto.KeyObject {
    return this.keyGenerator.generatePrivateKey();
  }

  derivePublicKey(privateKey: crypto.KeyObject): crypto.KeyObject {
    return this.keyGenerator.derivePublicKey(privateKey);
  }
}

export { Wallet };
