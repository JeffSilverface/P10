import { Injectable, MessageEvent } from '@nestjs/common';
import { Subject } from 'rxjs';

export type ChatEventType = 'message' | 'notification';

export interface ChatEvent {
  type: ChatEventType;
  data: string | object;
}

/**
 * Holds the client <-> open SSE connection association: the core technical
 * point of the PoC. A given clientId may have several open tabs, hence a
 * Set of subjects per id. Support agents share a single broadcast group
 * since any of them can pick up an incoming client message.
 */
@Injectable()
export class SseConnectionService {
  private readonly clientStreams = new Map<
    string,
    Set<Subject<MessageEvent>>
  >();
  private readonly supportStreams = new Set<Subject<MessageEvent>>();

  registerClient(clientId: string): Subject<MessageEvent> {
    const subject = new Subject<MessageEvent>();
    const existing = this.clientStreams.get(clientId) ?? new Set();
    existing.add(subject);
    this.clientStreams.set(clientId, existing);
    return subject;
  }

  unregisterClient(clientId: string, subject: Subject<MessageEvent>): void {
    const existing = this.clientStreams.get(clientId);
    if (!existing) return;
    existing.delete(subject);
    if (existing.size === 0) {
      this.clientStreams.delete(clientId);
    }
  }

  registerSupport(): Subject<MessageEvent> {
    const subject = new Subject<MessageEvent>();
    this.supportStreams.add(subject);
    return subject;
  }

  unregisterSupport(subject: Subject<MessageEvent>): void {
    this.supportStreams.delete(subject);
  }

  sendToClient(clientId: string, event: ChatEvent): void {
    const subjects = this.clientStreams.get(clientId);
    if (!subjects) return;
    for (const subject of subjects) {
      subject.next({ type: event.type, data: event.data });
    }
  }

  broadcastToSupport(event: ChatEvent): void {
    for (const subject of this.supportStreams) {
      subject.next({ type: event.type, data: event.data });
    }
  }
}
