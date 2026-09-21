// Web Crypto API-based Security & Cryptography Utilities
// Ensures passwords are never stored or handled in plain text

/**
 * Converts an ArrayBuffer to a hex string
 */
function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Generates a cryptographically random salt
 */
export function generateSalt(length = 16): string {
  const bytes = new Uint8Array(length);
  window.crypto.getRandomValues(bytes);
  return bufferToHex(bytes.buffer);
}

/**
 * Generates a random session token
 */
export function generateSessionToken(): string {
  const bytes = new Uint8Array(32);
  window.crypto.getRandomValues(bytes);
  return bufferToHex(bytes.buffer);
}

/**
 * Generates a 6-digit numeric OTP code for identity verification
 */
export function generateOtpCode(): string {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  // Guarantee 6 digits between 100000 and 999999
  const code = 100000 + (array[0] % 900000);
  return code.toString();
}

/**
 * Hashes a password with a cryptographic salt using SHA-256
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  // Combine salt and password
  const data = enc.encode(`${salt}:${password}`);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  return bufferToHex(hashBuffer);
}

/**
 * Verifies a password against a stored hash and salt
 */
export async function verifyPassword(
  password: string,
  salt: string,
  expectedHash: string
): Promise<boolean> {
  const computedHash = await hashPassword(password, salt);
  return computedHash === expectedHash;
}

/**
 * Password complexity requirements interface
 */
export interface PasswordRequirements {
  minLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

/**
 * Evaluates password complexity requirements
 */
export function checkPasswordRequirements(password: string): PasswordRequirements {
  return {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
  };
}

/**
 * Calculates a password strength score (0 to 4) and label
 */
export function evaluatePasswordStrength(password: string): {
  score: number;
  label: 'Very Weak' | 'Weak' | 'Moderate' | 'Strong';
  color: string;
} {
  const reqs = checkPasswordRequirements(password);
  const metCount = Object.values(reqs).filter(Boolean).length;

  if (metCount <= 2) {
    return { score: 1, label: 'Very Weak', color: 'bg-rose-500' };
  }
  if (metCount === 3) {
    return { score: 2, label: 'Weak', color: 'bg-amber-500' };
  }
  if (metCount === 4) {
    return { score: 3, label: 'Moderate', color: 'bg-blue-500' };
  }
  return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
}

/**
 * Bangladeshi Mobile Carrier Detection
 */
export interface BDPhoneValidation {
  isValid: boolean;
  normalized: string; // Clean 11 digits: e.g. 01712345678
  formatted: string;  // International format: e.g. +880 1712-345678
  operator: 'Grameenphone' | 'Banglalink' | 'Robi' | 'Airtel' | 'Teletalk' | 'Unknown';
  error?: string;
}

/**
 * Validates and formats a Bangladesh mobile number
 * Operators:
 * 013, 017: Grameenphone
 * 014, 019: Banglalink
 * 016: Robi / Airtel
 * 018: Robi
 * 015: Teletalk
 */
export function validateBDMobile(input: string): BDPhoneValidation {
  if (!input || !input.trim()) {
    return {
      isValid: false,
      normalized: '',
      formatted: '',
      operator: 'Unknown',
      error: 'Mobile number is required'
    };
  }

  // Remove whitespace, dashes, parens, and international prefix
  let cleaned = input.replace(/[\s\-()]/g, '');

  // Strip +880, 880, or leading zero if user entered +8801...
  if (cleaned.startsWith('+880')) {
    cleaned = cleaned.slice(4);
  } else if (cleaned.startsWith('880')) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith('0')) {
    cleaned = cleaned.slice(1);
  }

  // Now cleaned should start with '1' and have 10 digits total (e.g. 1712345678)
  const fullNumber = '0' + cleaned;

  if (fullNumber.length !== 11) {
    return {
      isValid: false,
      normalized: fullNumber,
      formatted: input,
      operator: 'Unknown',
      error: 'Bangladeshi mobile number must be 11 digits (e.g., 01712345678)'
    };
  }

  const prefix = fullNumber.slice(0, 3);
  let operator: BDPhoneValidation['operator'] = 'Unknown';

  if (prefix === '013' || prefix === '017') {
    operator = 'Grameenphone';
  } else if (prefix === '014' || prefix === '019') {
    operator = 'Banglalink';
  } else if (prefix === '016') {
    operator = 'Airtel';
  } else if (prefix === '018') {
    operator = 'Robi';
  } else if (prefix === '015') {
    operator = 'Teletalk';
  } else {
    return {
      isValid: false,
      normalized: fullNumber,
      formatted: input,
      operator: 'Unknown',
      error: 'Invalid operator code. Must start with 013, 014, 015, 016, 017, 018, or 019.'
    };
  }

  const formatted = `+880 ${fullNumber.slice(0, 4)}-${fullNumber.slice(4)}`;

  return {
    isValid: true,
    normalized: fullNumber,
    formatted,
    operator
  };
}
