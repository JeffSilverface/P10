import type { Conversation, Message, SenderType } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) {
    throw new Error(`${init?.method ?? "GET"} ${path} failed: ${res.status}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : (null as T);
}

export function getClientConversation(
  clientId: string,
): Promise<Conversation | null> {
  return request(`/chat/conversations/client/${clientId}`);
}

export function createConversation(clientId: string): Promise<Conversation> {
  return request("/chat/conversations", {
    method: "POST",
    body: JSON.stringify({ clientId, initiatedBy: "CLIENT" }),
  });
}

export function listConversations(
  status?: "OPEN" | "CLOSED",
): Promise<Conversation[]> {
  const query = status ? `?status=${status}` : "";
  return request(`/chat/conversations${query}`);
}

export function getMessages(conversationId: string): Promise<Message[]> {
  return request(`/chat/conversations/${conversationId}/messages`);
}

export function sendMessage(input: {
  conversationId: string;
  senderType: SenderType;
  content: string;
}): Promise<Message> {
  return request("/chat/messages", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function streamClientUrl(clientId: string): string {
  return `${API_URL}/chat/stream/client/${clientId}`;
}

export function streamSupportUrl(): string {
  return `${API_URL}/chat/stream/support`;
}
