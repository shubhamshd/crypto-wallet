import * as crypto from "crypto";

class KeyGenerator {
    generatePrivateKey(): crypto.KeyObject {
        const { privateKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 2048,
          publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
          },
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
          }
        });
        return crypto.createPrivateKey(privateKey);
    }

    derivePublicKey(privateKey: crypto.KeyObject): crypto.KeyObject{
        // derive public key using private key
        try{
            console.log(privateKey);
            const publicKey = crypto.createPublicKey(privateKey);
            // console.log(keyPair);
            // const publicKey = keyPair.export({type: "spki", format: "pem" });
            return publicKey;
        }
        catch(error){
            console.log("failed to derive public key", error)
            throw new Error ("failed to derive public key")
        }
        
    }
}

export {KeyGenerator};