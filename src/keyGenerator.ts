// import crypto from "crypto";
const crypto = require('crypto');

class KeyGenerator {
    generatePrivateKey(): string{
        // generate a new private key using a secure random generator
        const privateKey = crypto.randomBytes(32).toString("hex");
        return privateKey
    }

    derivePublicKey(privateKey: string): string{
        // derive public key using private key
        try{
            const keyPair = crypto.createPublicKey(privateKey);
            const publicKey = keyPair.export({type: "spki", format: "pem" });
            return publicKey;
        }
        catch(error){
            console.log("failed to derive public key", error)
            throw new Error ("failed to derive public key")
        }
        
    }
}

export {KeyGenerator};