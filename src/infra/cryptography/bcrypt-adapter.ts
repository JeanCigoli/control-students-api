import bcrypt from 'bcrypt';
import { Hash, HashComparer } from '../../data/protocols/cryptography';

export class BcryptAdapter implements Hash, HashComparer {
  constructor(private readonly salt: number) {}

  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt);
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest);
  }
}
