"use client";

import { useEffect, useRef } from "react";
import type { Message, NotificationEvent } from "@/lib/types";

type ChatStreamHandlers = {
  onMessage: (message: Message) => void;
  onNotification: (event: NotificationEvent) => void;
};

/**
 * Opens one SSE connection per url and dispatches on the two mutualized
 * event types (message, notification). Handlers are read via ref so the
 * connection is not torn down on every render.
 */
export function useChatStream(url: string | null, handlers: ChatStreamHandlers) {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    if (!url) return;

    const source = new EventSource(url);
    const onMessage = (event: MessageEvent<string>) => {
      handlersRef.current.onMessage(JSON.parse(event.data));
    };
    const onNotification = (event: MessageEvent<string>) => {
      handlersRef.current.onNotification(JSON.parse(event.data));
    };

    source.addEventListener("message", onMessage);
    source.addEventListener("notification", onNotification);

    return () => {
      source.removeEventListener("message", onMessage);
      source.removeEventListener("notification", onNotification);
      source.close();
    };
  }, [url]);
}
