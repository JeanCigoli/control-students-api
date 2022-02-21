import { createCipheriv, createDecipheriv } from 'crypto';
import { ENCRYPTION } from '@/utils/constants';

import { Decrypt, Encrypt } from '@/data/protocols/cryptography';

export class SecretToken implements Encrypt, Decrypt {
  encrypt(params: Encrypt.Params): Encrypt.Result {
    const cipher = createCipheriv(
      'aes-256-cbc',
      Buffer.from(ENCRYPTION.KEY),
      ENCRYPTION.IV,
    );

    const updatedCipher = cipher.update(JSON.stringify(params));

    const finalCypher = Buffer.concat([updatedCipher, cipher.final()]);

    const base64Token = finalCypher.toString('base64');

    return base64Token;
  }

  decrypt(data: string): Decrypt.Result {
    const encryptedText = Buffer.from(data, 'base64');

    const decipher = createDecipheriv(
      'aes-256-cbc',
      Buffer.from(ENCRYPTION.KEY),
      ENCRYPTION.IV,
    );

    const updatedDecipher = decipher.update(encryptedText);

    const finalDecipher = Buffer.concat([updatedDecipher, decipher.final()]);

    const base = finalDecipher.toString();

    return JSON.parse(base);
  }
}
