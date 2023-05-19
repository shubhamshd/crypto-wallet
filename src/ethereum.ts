import Web3 from "web3";
const EthereumTx = require("ethereumjs-tx");

const web3 = new Web3('https://mainnet.infura.io/v3/a3de7f586dff4c4aadd1eabd1b6a6007');

async function createAccount(): Promise<string> {
    const account = await web3.eth.accounts.create();
    return account.address;
}

async function getBalance(address: string): Promise<string>{
    const balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, 'ether');
}

async function sendTransaction(
    from: string, 
    to: string, 
    value: string, 
    privateKey: string): Promise<string> {
    const nonce = await web3.eth.getTransactionCount(from);

    const txParams = {
        nonce: web3.utils.toHex(nonce),
        to,
        value: web3.utils.toHex(web3.utils.toWei(value, 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei(10, 'Gwei'))
    };

    const tx = new EthereumTx(txParams);
    tx.sign(Buffer.from(privateKey, 'hex'));

    const serializedTx = tx.serialize();
    const rawTx = '0x' + serializedTx.toString('hex');

    const receipt = await web3.eth.sendSignedTransaction(rawTx);
    return receipt.transactionHash;
}

export { createAccount, getBalance, sendTransaction };