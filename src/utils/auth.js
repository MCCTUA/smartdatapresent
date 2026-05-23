// Client-side password helpers using Web Crypto API.
// WARNING: This is casual-viewer protection only — anyone can inspect the
// JS bundle and extract the hash. DO NOT use this to protect truly sensitive
// data; treat it as a soft lock for staging/preview pages.

export async function hashPassword(plain) {
  const data = new TextEncoder().encode(plain);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function verifyPassword(plain, expectedHash) {
  const hash = await hashPassword(plain);
  return hash === expectedHash;
}

const storageKey = (pageId) => `auth_${pageId}`;

export function getAuthFlag(pageId) {
  try {
    return sessionStorage.getItem(storageKey(pageId)) === '1';
  } catch {
    return false;
  }
}

export function setAuthFlag(pageId) {
  try {
    sessionStorage.setItem(storageKey(pageId), '1');
  } catch {
    // sessionStorage may be unavailable (private mode, etc.) — fail silently
  }
}
