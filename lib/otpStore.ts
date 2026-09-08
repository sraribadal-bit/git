export interface OtpEntry {
  otp: string;
  expiresAt: number;
}

// Attach to globalThis so Next.js route handlers share the same in-memory store
const globalForOtp = globalThis as unknown as {
  otpStore?: Map<string, OtpEntry>;
};

if (!globalForOtp.otpStore) {
  globalForOtp.otpStore = new Map<string, OtpEntry>();
}

export const otpStore = globalForOtp.otpStore;

export function setOtp(phone: string, otp: string, ttlMs = 5 * 60 * 1000) {
  otpStore.set(phone, {
    otp,
    expiresAt: Date.now() + ttlMs,
  });
}

export function getOtp(phone: string): string | null {
  const entry = otpStore.get(phone);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    otpStore.delete(phone);
    return null;
  }
  return entry.otp;
}

export function deleteOtp(phone: string) {
  otpStore.delete(phone);
}
