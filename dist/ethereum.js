"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ethereum = void 0;
// import Web3 from "web3";
// import Web3 from "web3";
const Web3 = require("web3");
// const EthereumTx = require("ethereumjs-tx");
const EthereumTx = require("ethereumjs-tx");
// const Common = require('ethereumjs-common')
const Common = require("ethereumjs-common");
// Define the chain configuration
const common = Common.default.forCustomChain('mainnet', {
    name: 'sepolia',
    networkId: 11155111,
    chainId: 11155111,
}, 'petersburg');
class Ethereum {
    // const web3 = new Web3('https://mainnet.infura.io/v3/a3de7f586dff4c4aadd1eabd1b6a6007');
    constructor() {
        // this.web3 = new Web3('https://sepolia.infura.io/v3/a3de7f586dff4c4aadd1eabd1b6a6007');
        this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://sepolia.infura.io/ws/v3/a3de7f586dff4c4aadd1eabd1b6a6007'));
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
        // const nonce = await this.web3.eth.getTransactionCount(from);
        const nonce = 5;
        const nonceTest = await this.web3.eth.getTransactionCount(from);
        console.log(nonceTest);
        const txParams = {
            nonce: this.web3.utils.toHex(nonce),
            to: to,
            value: this.web3.utils.toHex(this.web3.utils.toWei(value, 'ether')),
            gasLimit: this.web3.utils.toHex(21000),
            // gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'Gwei'))
        };
        const tx = new EthereumTx.Transaction(txParams, { common });
        console.log(tx);
        tx.sign(Buffer.from(privateKey, 'hex'));
        const serializedTx = tx.serialize();
        const rawTx = '0x' + serializedTx.toString('hex');
        console.log(rawTx);
        try {
            const receipt = await this.web3.eth.sendSignedTransaction(rawTx);
            console.log(receipt.transactionHash);
            return receipt.transactionHash;
        }
        catch (error) {
            console.error('Error sending transaction:', error);
            throw new Error('Failed to send transaction');
        }
    }
}
exports.Ethereum = Ethereum;
