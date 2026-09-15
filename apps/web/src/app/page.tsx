"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Headset, MessageCircle } from "lucide-react";
import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";
import { useChatStream } from "@/hooks/use-chat-stream";
import { listConversations, streamClientUrl, streamSupportUrl } from "@/lib/api";
import { MOCK_CLIENTS } from "@/lib/mock-users";
import { isUnread } from "@/lib/read-state";
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

type LastMessage = Pick<Message, "senderType" | "sentAt">;

function NewBadge() {
  return (
    <AvatarBadge className="size-3 bg-red-500 ring-background" />
  );
}

export default function Home() {
  const [lastByClient, setLastByClient] = useState<Record<string, LastMessage>>({});

  const refresh = useCallback(() => {
    listConversations().then((conversations: Conversation[]) => {
      const next: Record<string, LastMessage> = {};
      for (const conversation of conversations) {
        const last = conversation.messages?.[0];
        if (!last) continue;
        const existing = next[conversation.clientId];
        if (!existing || new Date(last.sentAt) > new Date(existing.sentAt)) {
          next[conversation.clientId] = last;
        }
      }
      setLastByClient(next);
    });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Live-refresh badges: watching every mock identity's SSE channel is
  // only feasible because this PoC has a handful of hardcoded users.
  const onEvent = useCallback(() => refresh(), [refresh]);
  useChatStream(streamSupportUrl(), { onMessage: onEvent, onNotification: onEvent });
  useChatStream(streamClientUrl(MOCK_CLIENTS[0].id), { onMessage: onEvent, onNotification: onEvent });
  useChatStream(streamClientUrl(MOCK_CLIENTS[1].id), { onMessage: onEvent, onNotification: onEvent });
  useChatStream(streamClientUrl(MOCK_CLIENTS[2].id), { onMessage: onEvent, onNotification: onEvent });

  const clientUnread = (clientId: string) => {
    const last = lastByClient[clientId];
    return !!last && last.senderType === "SUPPORT" && isUnread(`client:${clientId}`, last.sentAt);
  };

  const supportUnread = Object.values(lastByClient).some(
    (last) => last.senderType === "CLIENT" && isUnread("support", last.sentAt),
  );

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 bg-muted/30 p-8">
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
          <MessageCircle className="size-6" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Chat PoC · Your Car Your Way
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ouvrez un client dans un onglet et le support dans un autre pour voir le
          temps réel en action.
        </p>
      </div>

      <div className="grid w-full max-w-md gap-2">
        {MOCK_CLIENTS.map((client) => (
          <Link
            key={client.id}
            href={`/client/${client.id}`}
            className={cn(
              "group flex items-center gap-3 rounded-xl border bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5",
              clientUnread(client.id) && "border-red-500/40 bg-red-500/5",
            )}
          >
            <Avatar>
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                {initials(client.name)}
              </AvatarFallback>
              {clientUnread(client.id) && <NewBadge />}
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{client.name}</p>
              <p className="text-xs text-muted-foreground">
                {clientUnread(client.id)
                  ? "Nouveau message du support"
                  : "Ouvrir en tant que client"}
              </p>
            </div>
          </Link>
        ))}
        <Link
          href="/support"
          className={cn(
            "group flex items-center gap-3 rounded-xl border bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5",
            supportUnread && "border-red-500/40 bg-red-500/5",
          )}
        >
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Headset className="size-4" />
            </AvatarFallback>
            {supportUnread && <NewBadge />}
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">Support</p>
            <p className="text-xs text-muted-foreground">
              {supportUnread ? "Nouveau message client" : "Voir toutes les conversations"}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
