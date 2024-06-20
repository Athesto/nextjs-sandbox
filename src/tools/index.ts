
export function isServer(): boolean {
  return typeof globalThis.window === 'undefined' ? true : false
}

export function isClient(): boolean {
  return !isServer()
}

export function getEnvOrError(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}
