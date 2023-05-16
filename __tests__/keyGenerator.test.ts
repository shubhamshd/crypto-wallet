import {KeyGenerator} from "../src/keyGenerator";

describe("KeyGenerator", () => {
    let keyGenerator: KeyGenerator;

    beforeEach(() => {
        keyGenerator = new KeyGenerator;
    });

    test("generate a new private key", () => {
        const privateKey = keyGenerator.generatePrivateKey();
        expect(privateKey).toBeDefined();
        // expect(typeof privateKey).toBe('string');
        // expect(privateKey.length).toBe(64);
    });

    test("derive public key using private key", () => {
        const privateKey = keyGenerator.generatePrivateKey();
        const publicKey = keyGenerator.derivePublicKey(privateKey);
        expect(publicKey).toBeDefined();
        // expect(publicKey).toBe('string');
    })

})