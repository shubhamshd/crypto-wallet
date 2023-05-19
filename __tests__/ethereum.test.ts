import { Ethereum } from '../src/ethereum';
// import Web3 from 'web3';

describe('Ethereum Transaction', () => {
    let ethereum: Ethereum;
    // let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://sepolia.infura.io/ws/v3/a3de7f586dff4c4aadd1eabd1b6a6007'));
    // let web3 = new Web3('https://sepolia.infura.io/v3/a3de7f586dff4c4aadd1eabd1b6a6007');

    beforeEach(() => {
        ethereum = new Ethereum();
    });

    it('send transaction successfully', async () => {
        const senderAddress = "0xA404C8849C20997EE4ba3A4709976d7Aa3286398";
        const recipientAddress = "0x5392d7bBC233fC4b24ee53366e33579C8Fd43F7a";
        const amountToSend = '0.05';
        const privateKey = '58b722e719c5cc433fc2a7ac49cecdec6a3738082b11466e18e00594d25a3d4b';

        // Call the sendTransaction method with the mock input values
        const result = await ethereum.sendTransaction(
            senderAddress,
            recipientAddress,
            amountToSend,
            privateKey
        );

      expect(result).toBeTruthy();

    });
});
