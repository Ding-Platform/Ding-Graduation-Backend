import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as slug from 'speakingurl';
import { generate } from 'voucher-code-generator';
import { TOKEN_CONSTANTS } from '../../constants/token.constants';

@Injectable()
export class HelperService {
  private getAuthEncryptionKey(): Buffer {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is required for encryption');
    }
    return crypto.createHash('sha256').update(secret).digest();
  }

  public encryptAuthToken(plainText: string): string {
    const key = this.getAuthEncryptionKey(); // 32 bytes
    const iv = crypto.randomBytes(12); // recommended length for GCM
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    const cipherText = Buffer.concat([
      cipher.update(plainText, 'utf8'),
      cipher.final(),
    ]);
    const tag = cipher.getAuthTag();

    return `${iv.toString('base64')}.${tag.toString('base64')}.${cipherText.toString('base64')}`;
  }

  public decryptAuthToken(encrypted: string): string {
    const key = this.getAuthEncryptionKey();
    const parts = encrypted.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted token format');
    }

    const [ivB64, tagB64, cipherTextB64] = parts;
    const iv = Buffer.from(ivB64, 'base64');
    const tag = Buffer.from(tagB64, 'base64');
    const cipherText = Buffer.from(cipherTextB64, 'base64');

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);

    const plain = Buffer.concat([decipher.update(cipherText), decipher.final()]);
    return plain.toString('utf8');
  }

  public slugify(value: string): string {
    if (value.charAt(value.length - 1) === '-')
      value = value.slice(0, value.length - 1);
    return `${slug(value, { titleCase: true })}-${
      generate({
        charset: '123456789abcdefghgklmnorstuvwxyz',
        length: 4,
      })[0]
    }`.toLowerCase();
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, TOKEN_CONSTANTS.SECURITY.BCRYPT_ROUNDS);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  public updateProvidedFields<T>(model: T, input: object): T {
    Object.keys(input).map((field) => (model[field] = input[field]));
    return model;
  }

  upperCaseFirstLetter(str: string) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  }

  public encryptStringWithRsaPublicKey(
    toEncrypt: string,
    relativeOrAbsolutePathToPublicKey: string,
  ) {
    const absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    const publicKey = fs.readFileSync(absolutePath, 'utf8');
    const buffer = Buffer.from(toEncrypt);
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
  }

  public decryptStringWithRsaPrivateKey(
    toDecrypt: string,
    relativeOrAbsolutePathToPrivateKey: string,
  ) {
    const absolutePath = path.resolve(relativeOrAbsolutePathToPrivateKey);
    const privateKey = fs.readFileSync(absolutePath, 'utf8');
    const buffer = Buffer.from(toDecrypt, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString('utf8');
  }

  public trimAllSpaces(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }

  public deriveMapFromArray<T>(array: T[], mapFn: (item: T) => any) {
    const map = new Map<any, any>();
    array.forEach((item) => {
      map.set(mapFn(item), item);
    });
    return map;
  }
}
