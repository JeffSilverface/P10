import { PrismaService } from '../prisma/prisma.service';
import { SseConnectionService } from './sse-connection.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { Message, SenderType } from '../../generated/prisma/client';
export declare class ChatService {
    private readonly prisma;
    private readonly sse;
    constructor(prisma: PrismaService, sse: SseConnectionService);
    createConversation(dto: CreateConversationDto): import("../../generated/prisma/models").Prisma__ConversationClient<{
        id: string;
        clientId: string;
        reservationId: string | null;
        initiatedBy: SenderType;
        status: import("../../generated/prisma/enums").ConversationStatus;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    getMessages(conversationId: string): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: string;
        conversationId: string;
        senderType: SenderType;
        content: string;
        sentAt: Date;
    }[]>;
    sendMessage(dto: SendMessageDto): Promise<Message>;
    private dispatch;
}
