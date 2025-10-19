// /auth/SecureAuth.ts
import CryptoJS from "crypto-js";
import { set, get, del } from "idb-keyval";

const ENCRYPTED_DB_PREFIX = "walletdb-";
const SESSION_KEY = "wallet-session";

// PBKDF2 for deterministic key (never store the cleartext password!)
export async function hashPassword(password: string): Promise<string> {
  return CryptoJS.PBKDF2(password, "wallet-auth-salt", {
    keySize: 256/32,
    iterations: 50000
  }).toString();
}

// Encrypt and store a wallet credential entry
export async function saveUserCred(walletId: string, password: string) {
  const key = await hashPassword(password);
  const data = JSON.stringify({ walletId });
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(data, key, { iv }).toString();
  const storeObj = { iv: iv.toString(CryptoJS.enc.Hex), encrypted };
  await set(ENCRYPTED_DB_PREFIX + walletId, btoa(JSON.stringify(storeObj)));
}

// Validate login and set session if valid
export async function authenticateUser(walletId: string, password: string, ttlMinutes = 30): Promise<boolean> {
  const base64 = await get(ENCRYPTED_DB_PREFIX + walletId);
  if (!base64) return false;

  try {
    const storeObj = JSON.parse(atob(base64));
    const key = await hashPassword(password);
    const iv = CryptoJS.enc.Hex.parse(storeObj.iv);
    const decrypted = CryptoJS.AES.decrypt(storeObj.encrypted, key, { iv }).toString(CryptoJS.enc.Utf8);
    if (!decrypted) return false;
    const { walletId: storedId } = JSON.parse(decrypted);
    if (storedId !== walletId) return false;

    const expiresAt = Date.now() + ttlMinutes * 60 * 1000;
    localStorage.setItem(SESSION_KEY, JSON.stringify({ walletId, expiresAt }));
    return true;
  } catch {
    return false;
  }
}

export async function removeUser(walletId: string) {
  await del(ENCRYPTED_DB_PREFIX + walletId);
}

export function getActiveSession(): { walletId: string } | null {
  const item = localStorage.getItem(SESSION_KEY);
  if (!item) return null;
  try {
    const { walletId, expiresAt } = JSON.parse(item);
    if (Date.now() < expiresAt) return { walletId };
    localStorage.removeItem(SESSION_KEY);
    return null;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function logoutSession() {
  localStorage.removeItem(SESSION_KEY);
}

// New - check if user exists
export async function userExists(walletId: string): Promise<boolean> {
  const record = await get(ENCRYPTED_DB_PREFIX + walletId);
  return record !== undefined;
}
