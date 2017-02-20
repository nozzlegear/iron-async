import * as Bluebird from "bluebird";
import { seal as ironSeal, unseal as ironUnseal, Options, defaults } from "iron";

/**
 * Seals an object, converting it to an Iron token string.
 */
export function seal(value, password: string, options: Options = defaults) {
    return new Bluebird<string>((res, rej) => {
        ironSeal(value, password, options, (err, token) => {
            if (err) {
                return rej(err);
            }

            return res(token);
        })
    });
}

/**
 * Unseals an Iron token string, converting it to an object.
 */
export function unseal<T>(token: string, password: string, options: Options = defaults) {
    return new Bluebird<T>((res, rej) => {
        ironUnseal(token, password, options, (err, data) => {
            if (err) {
                return rej(err);
            }

            return res(data as T);
        })
    });
}

export interface Options {
    /**
     * Defines the options used by the encryption process.
     */
    encryption: EncryptionOptions;

    /**
     * Defines the options used by the HMAC integrity verification process.
     */
    integrity: EncryptionOptions;

    /**
     * Sealed object lifetime in milliseconds where 0 means forever. Defaults to 0.
     */
    ttl: number;

    /**
     * Number of seconds of permitted clock skew for incoming expirations. Defaults to 60 seconds.
     */
    timestampSkewSec: number;

    /**
     * Local clock time offset, expressed in number of milliseconds (positive or negative). Defaults to 0.
     */
    localtimeOffsetMsec: number;
}

export interface EncryptionOptions {
    /**
     * The size of the salt (random buffer used to ensure that two identical objects will generate a different encrypted result.
     */
    saltBits: number;

    /**
     * The algorithm used ('aes-256-cbc' for encryption and 'sha256' for integrity are the only two supported at this time).
     */
    algorithm: string;

    /**
     * The number of iterations used to derive a key from the password. Set to 1 by default. The number of ideal iterations to use is dependent on your application's performance requirements. More iterations means it takes longer to generate the key.
     */
    iterations: number;
}