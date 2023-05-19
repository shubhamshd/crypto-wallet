"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const keyGenerator_1 = require("./keyGenerator");
class Wallet {
    constructor() {
        this.keyGenerator = new keyGenerator_1.KeyGenerator();
    }
    generatePrivateKey() {
        return this.keyGenerator.generatePrivateKey();
    }
    derivePublicKey(privateKey) {
        return this.keyGenerator.derivePublicKey(privateKey);
    }
}
exports.Wallet = Wallet;
