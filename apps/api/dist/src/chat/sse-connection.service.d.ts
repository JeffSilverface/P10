import { MessageEvent } from '@nestjs/common';
import { Subject } from 'rxjs';
export type ChatEventType = 'message' | 'notification';
export interface ChatEvent {
    type: ChatEventType;
    data: string | object;
}
export declare class SseConnectionService {
    private readonly clientStreams;
    private readonly supportStreams;
    registerClient(clientId: string): Subject<MessageEvent>;
    unregisterClient(clientId: string, subject: Subject<MessageEvent>): void;
    registerSupport(): Subject<MessageEvent>;
    unregisterSupport(subject: Subject<MessageEvent>): void;
    sendToClient(clientId: string, event: ChatEvent): void;
    broadcastToSupport(event: ChatEvent): void;
}
