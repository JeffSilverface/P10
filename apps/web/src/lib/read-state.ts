const PREFIX = "chat:lastRead:";

export function getLastRead(key: string): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(PREFIX + key);
}

export function markRead(key: string, at: string = new Date().toISOString()): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PREFIX + key, at);
}

export function isUnread(key: string, messageAt: string): boolean {
  const lastRead = getLastRead(key);
  return !lastRead || new Date(messageAt) > new Date(lastRead);
}
