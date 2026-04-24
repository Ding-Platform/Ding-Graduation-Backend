import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

function getKey(): Buffer {
  const rawKey = process.env.ENCRYPTION_KEY;
  if (rawKey && rawKey.length === 64) {
    // 64-char hex string → 32 bytes
    return Buffer.from(rawKey, 'hex');
  }
  // Fallback: derive 32 bytes from a simpler secret (dev only)
  const secret = process.env.JWT_SECRET || 'dev-fallback-secret-key-32-chars!!';
  return crypto.createHash('sha256').update(secret).digest();
}

/**
 * Encrypts a plaintext string using AES-256-CBC.
 * Returns `iv:ciphertext` as a hex string.
 */
export function encrypt(text: string): string {
  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

/**
 * Decrypts a string produced by `encrypt()`.
 */
export function decrypt(encryptedText: string): string {
  const key = getKey();
  const [ivHex, encrypted] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/**
 * Validates a bank card number using the Luhn algorithm.
 */
export function luhnCheck(cardNumber: string): boolean {
  const sanitized = cardNumber.replace(/[\s-]/g, '');
  if (!/^\d{13,19}$/.test(sanitized)) return false;
  let sum = 0;
  let isEven = false;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

/**
 * Validates an Egyptian commercial registration number format.
 * رقم السجل التجاري — 7–10 digits.
 */
export function validateCommercialReg(value: string): boolean {
  return /^\d{7,10}$/.test(value.trim());
}

/**
 * Validates card expiry in MM/YY format and checks it's not expired.
 */
export function validateCardExpiry(expiry: string): boolean {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;
  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10) + 2000;
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const expiryDate = new Date(year, month - 1, 1);
  return expiryDate >= new Date(now.getFullYear(), now.getMonth(), 1);
}

/**
 * Masks all but the last 4 chars for safe display (e.g. "•••• 4242").
 */
export function maskCardNumber(cardNumber: string): string {
  const sanitized = cardNumber.replace(/[\s-]/g, '');
  return sanitized.slice(-4);
}
