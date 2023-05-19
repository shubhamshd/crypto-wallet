"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ethereum = void 0;
// import Web3 from "web3";
const web3_1 = require("web3");
const EthereumTx = require("ethereumjs-tx");
// const web3 = new Web3('https://mainnet.infura.io/v3/a3de7f586dff4c4aadd1eabd1b6a6007');
class Ethereum {
    // const web3 = new Web3('https://mainnet.infura.io/v3/a3de7f586dff4c4aadd1eabd1b6a6007');
    constructor() {
        // this.web3 = new Web3('https://sepolia.infura.io/v3/a3de7f586dff4c4aadd1eabd1b6a6007');
        this.web3 = new web3_1.default(new web3_1.default.providers.WebsocketProvider('wss://sepolia.infura.io/ws/v3/a3de7f586dff4c4aadd1eabd1b6a6007'));
    }
    // constructor(web3: Web3) {
    //     this.web3 = web3;
    // }
    async createAccount() {
        const account = await this.web3.eth.accounts.create();
        return account.address;
    }
    async getBalance(address) {
        const balance = await this.web3.eth.getBalance(address);
        return this.web3.utils.fromWei(balance, 'ether');
    }
    async sendTransaction(from, to, value, privateKey) {
        const nonce = await this.web3.eth.getTransactionCount(from);
        const txParams = {
            nonce: this.web3.utils.toHex(nonce),
            to: to,
            value: this.web3.utils.toHex(this.web3.utils.toWei(value, 'ether')),
            gasLimit: this.web3.utils.toHex(21000),
            // gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'Gwei'))
        };
        const tx = new EthereumTx(txParams);
        tx.sign(Buffer.from(privateKey, 'hex'));
        const serializedTx = tx.serialize();
        const rawTx = '0x' + serializedTx.toString('hex');
        const receipt = await this.web3.eth.sendSignedTransaction(rawTx);
        return receipt.transactionHash;
    }
}
exports.Ethereum = Ethereum;
