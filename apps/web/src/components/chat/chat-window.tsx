"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Message, SenderType } from "@/lib/types";

type ChatWindowProps = {
  currentSender: SenderType;
  messages: Message[];
  onSend: (content: string) => Promise<void> | void;
  disabled?: boolean;
  emptyLabel?: string;
  labels: Record<SenderType, string>;
};

function initials(label: string): string {
  return label
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ChatWindow({
  currentSender,
  messages,
  onSend,
  disabled,
  emptyLabel = "Aucun message pour le moment.",
  labels,
}: ChatWindowProps) {
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function handleSend() {
    const content = draft.trim();
    if (!content || sending) return;
    setSending(true);
    try {
      await onSend(content);
      setDraft("");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col min-h-0 bg-muted/30">
      <ScrollArea className="flex-1 px-4 sm:px-6">
        <div className="flex flex-col gap-4 py-6">
          {messages.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-12">
              {emptyLabel}
            </p>
          )}
          {messages.map((message, i) => {
            const isOwn = message.senderType === currentSender;
            const prev = messages[i - 1];
            const showAvatar = !prev || prev.senderType !== message.senderType;
            return (
              <div
                key={message.id}
                className={cn(
                  "flex items-end gap-2",
                  isOwn ? "flex-row-reverse" : "flex-row",
                )}
              >
                <div className="w-8 shrink-0">
                  {showAvatar && (
                    <Avatar size="sm">
                      <AvatarFallback
                        className={cn(
                          isOwn
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground",
                        )}
                      >
                        {initials(labels[message.senderType])}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <div
                  className={cn(
                    "flex max-w-[75%] flex-col gap-0.5",
                    isOwn ? "items-end" : "items-start",
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm",
                      isOwn
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-card text-card-foreground border rounded-bl-sm",
                    )}
                  >
                    {message.content}
                  </div>
                  <span className="text-[10px] text-muted-foreground px-1">
                    {new Date(message.sentAt).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
      <div className="flex items-end gap-2 border-t bg-background p-3 sm:p-4">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Écrire un message..."
          disabled={disabled}
          className="min-h-[44px] max-h-32 resize-none rounded-xl"
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={disabled || sending || !draft.trim()}
          className="size-11 rounded-xl shrink-0"
        >
          <SendHorizonal className="size-4" />
        </Button>
      </div>
    </div>
  );
}
