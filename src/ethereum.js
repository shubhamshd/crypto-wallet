"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ethereum = void 0;
// import Web3 from "web3";
// import Web3 from "web3";
var Web3 = require("web3");
// const EthereumTx = require("ethereumjs-tx");
var EthereumTx = require("ethereumjs-tx");
// const Common = require('ethereumjs-common')
var Common = require("ethereumjs-common");
// Define the chain configuration
var common = Common.default.forCustomChain('mainnet', {
    name: 'sepolia',
    networkId: 11155111,
    chainId: 11155111,
}, 'petersburg');
var Ethereum = /** @class */ (function () {
    // const web3 = new Web3('https://mainnet.infura.io/v3/a3de7f586dff4c4aadd1eabd1b6a6007');
    function Ethereum() {
        // this.web3 = new Web3('https://sepolia.infura.io/v3/a3de7f586dff4c4aadd1eabd1b6a6007');
        this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://sepolia.infura.io/ws/v3/a3de7f586dff4c4aadd1eabd1b6a6007'));
    }
    // constructor(web3: Web3) {
    //     this.web3 = web3;
    // }
    Ethereum.prototype.createAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.accounts.create()];
                    case 1:
                        account = _a.sent();
                        return [2 /*return*/, account.address];
                }
            });
        });
    };
    Ethereum.prototype.getBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.getBalance(address)];
                    case 1:
                        balance = _a.sent();
                        return [2 /*return*/, this.web3.utils.fromWei(balance, 'ether')];
                }
            });
        });
    };
    Ethereum.prototype.sendTransaction = function (from, to, value, privateKey) {
        return __awaiter(this, void 0, void 0, function () {
            var nonce, nonceTest, txParams, tx, serializedTx, rawTx, receipt, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nonce = 4;
                        return [4 /*yield*/, this.web3.eth.getTransactionCount(from)];
                    case 1:
                        nonceTest = _a.sent();
                        console.log(nonceTest);
                        txParams = {
                            nonce: this.web3.utils.toHex(nonce),
                            to: to,
                            value: this.web3.utils.toHex(this.web3.utils.toWei(value, 'ether')),
                            gasLimit: this.web3.utils.toHex(21000),
                            // gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'Gwei'))
                        };
                        tx = new EthereumTx.Transaction(txParams, { common: common });
                        console.log(tx);
                        tx.sign(Buffer.from(privateKey, 'hex'));
                        serializedTx = tx.serialize();
                        rawTx = '0x' + serializedTx.toString('hex');
                        console.log(rawTx);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.web3.eth.sendSignedTransaction(rawTx)];
                    case 3:
                        receipt = _a.sent();
                        console.log(receipt.transactionHash);
                        return [2 /*return*/, receipt.transactionHash];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error sending transaction:', error_1);
                        throw new Error('Failed to send transaction');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Ethereum;
}());
exports.Ethereum = Ethereum;
