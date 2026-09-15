import { MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';
import { SseConnectionService } from './sse-connection.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
export declare class ChatController {
    private readonly chatService;
    private readonly sse;
    constructor(chatService: ChatService, sse: SseConnectionService);
    streamClient(clientId: string): Observable<MessageEvent>;
    streamSupport(): Observable<MessageEvent>;
    createConversation(dto: CreateConversationDto): import("../../generated/prisma/models").Prisma__ConversationClient<{
        id: string;
        clientId: string;
        reservationId: string | null;
        initiatedBy: import("../../generated/prisma/enums").SenderType;
        status: import("../../generated/prisma/enums").ConversationStatus;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    getMessages(id: string): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: string;
        conversationId: string;
        senderType: import("../../generated/prisma/enums").SenderType;
        content: string;
        sentAt: Date;
    }[]>;
    sendMessage(dto: SendMessageDto): Promise<{
        id: string;
        conversationId: string;
        senderType: import("../../generated/prisma/enums").SenderType;
        content: string;
        sentAt: Date;
    }>;
}
