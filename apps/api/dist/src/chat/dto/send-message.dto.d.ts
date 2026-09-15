import { SenderType } from '../../../generated/prisma/client';
export declare class SendMessageDto {
    conversationId: string;
    senderType: SenderType;
    content: string;
}
