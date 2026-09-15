"use client";

import { use, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Headset } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatWindow } from "@/components/chat/chat-window";
import { useChatStream } from "@/hooks/use-chat-stream";
import {
  createConversation,
  getClientConversation,
  getMessages,
  sendMessage,
  streamClientUrl,
} from "@/lib/api";
import { getClientName } from "@/lib/mock-users";
import { markRead } from "@/lib/read-state";
import type { Message } from "@/lib/types";

export default function ClientChatPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const existing = await getClientConversation(clientId);
      const conversation = existing ?? (await createConversation(clientId));
      if (cancelled) return;
      setConversationId(conversation.id);
      const history = await getMessages(conversation.id);
      if (cancelled) return;
      setMessages(history);
      setLoading(false);
      markRead(`client:${clientId}`);
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [clientId]);

  const onMessage = useCallback(
    (message: Message) => {
      setMessages((prev) => [...prev, message]);
      markRead(`client:${clientId}`, message.sentAt);
    },
    [clientId],
  );

  const onNotification = useCallback(() => {
    toast.info("Le support a répondu");
  }, []);

  useChatStream(streamClientUrl(clientId), { onMessage, onNotification });

  async function handleSend(content: string) {
    if (!conversationId) return;
    const message = await sendMessage({
      conversationId,
      senderType: "CLIENT",
      content,
    });
    setMessages((prev) => [...prev, message]);
  }

  const clientName = getClientName(clientId);

  return (
    <div className="flex flex-1 flex-col h-dvh">
      <header className="flex items-center gap-3 border-b bg-background px-4 py-3 sm:px-6">
        <Avatar className="bg-primary/10">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Headset className="size-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold leading-tight">Support Your Car Your Way</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            En ligne · connecté en tant que {clientName}
          </p>
        </div>
      </header>
      <ChatWindow
        currentSender="CLIENT"
        labels={{ CLIENT: clientName, SUPPORT: "Support" }}
        messages={messages}
        onSend={handleSend}
        disabled={loading || !conversationId}
        emptyLabel={loading ? "Chargement..." : "Écrivez au support pour démarrer."}
      />
    </div>
  );
}
