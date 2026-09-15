import { SenderType } from '../../../generated/prisma/client';

export class SendMessageDto {
  conversationId!: string;
  senderType!: SenderType;
  content!: string;
}
