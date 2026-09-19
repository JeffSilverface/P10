export type SenderType = "CLIENT" | "SUPPORT";
export type ConversationStatus = "OPEN" | "CLOSED";

export type Message = {
  id: string;
  conversationId: string;
  senderType: SenderType;
  content: string;
  sentAt: string;
};

export type Conversation = {
  id: string;
  clientId: string;
  reservationId: string | null;
  initiatedBy: SenderType;
  status: ConversationStatus;
  createdAt: string;
  messages?: Message[];
};

export type NotificationEvent = {
  conversationId: string;
  senderType: SenderType;
};
