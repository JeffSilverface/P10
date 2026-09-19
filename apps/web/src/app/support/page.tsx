"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { MessagesSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatWindow } from "@/components/chat/chat-window";
import { useChatStream } from "@/hooks/use-chat-stream";
import {
  getMessages,
  listConversations,
  sendMessage,
  streamSupportUrl,
} from "@/lib/api";
import { getClientName } from "@/lib/mock-users";
import { markRead } from "@/lib/read-state";
import { cn } from "@/lib/utils";
import type { Conversation, Message } from "@/lib/types";

function initials(label: string): string {
  return label
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function SupportPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const refreshConversations = useCallback(() => {
    listConversations("OPEN").then(setConversations);
  }, []);

  useEffect(() => {
    refreshConversations();
    markRead("support");
  }, [refreshConversations]);

  useEffect(() => {
    if (!selectedId) {
      setMessages([]);
      return;
    }
    getMessages(selectedId).then(setMessages);
  }, [selectedId]);

  const onMessage = useCallback(
    (message: Message) => {
      if (message.conversationId === selectedId) {
        setMessages((prev) => [...prev, message]);
      }
      refreshConversations();
      markRead("support", message.sentAt);
    },
    [selectedId, refreshConversations],
  );

  const onNotification = useCallback(() => {
    toast.info("Nouveau message client");
    refreshConversations();
  }, [refreshConversations]);

  useChatStream(streamSupportUrl(), { onMessage, onNotification });

  async function handleSend(content: string) {
    if (!selectedId) return;
    const message = await sendMessage({
      conversationId: selectedId,
      senderType: "SUPPORT",
      content,
    });
    setMessages((prev) => [...prev, message]);
    refreshConversations();
  }

  const selected = conversations.find((c) => c.id === selectedId);
  const selectedName = selected ? getClientName(selected.clientId) : "";

  return (
    <div className="flex flex-1 h-dvh">
      <aside className="w-72 shrink-0 border-r bg-background flex flex-col">
        <div className="border-b px-4 py-3.5">
          <p className="text-sm font-semibold">Conversations</p>
          <p className="text-xs text-muted-foreground">
            {conversations.length} ouverte(s)
          </p>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-1 p-2">
            {conversations.map((conversation) => {
              const lastMessage = conversation.messages?.[0];
              const name = getClientName(conversation.clientId);
              const isActive = selectedId === conversation.id;
              return (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedId(conversation.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted",
                    isActive && "bg-muted",
                  )}
                >
                  <Avatar>
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {initials(name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium truncate">{name}</span>
                      <Badge variant="secondary" className="shrink-0 text-[10px]">
                        {conversation.status}
                      </Badge>
                    </div>
                    <span className="block text-xs text-muted-foreground truncate">
                      {lastMessage?.content ?? "Aucun message"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </aside>
      <div className="flex flex-1 flex-col min-h-0">
        {selected ? (
          <>
            <header className="flex items-center gap-3 border-b bg-background px-4 py-3 sm:px-6">
              <Avatar>
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  {initials(selectedName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold leading-tight">{selectedName}</p>
                <p className="text-xs text-muted-foreground">Conversation {selected.status}</p>
              </div>
            </header>
            <ChatWindow
              currentSender="SUPPORT"
              labels={{ CLIENT: selectedName, SUPPORT: "Vous" }}
              messages={messages}
              onSend={handleSend}
            />
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-muted/30 text-center">
            <MessagesSquare className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Sélectionnez une conversation pour répondre.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
