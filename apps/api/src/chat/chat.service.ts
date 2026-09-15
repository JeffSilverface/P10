import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SseConnectionService, ChatEvent } from './sse-connection.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { Message, SenderType } from '../../generated/prisma/client';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sse: SseConnectionService,
  ) {}

  createConversation(dto: CreateConversationDto) {
    if (!dto.clientId) {
      throw new BadRequestException('clientId is required');
    }

    return this.prisma.conversation.create({
      data: {
        clientId: dto.clientId,
        reservationId: dto.reservationId,
        initiatedBy: dto.initiatedBy,
      },
    });
  }

  getMessages(conversationId: string) {
    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { sentAt: 'asc' },
    });
  }

  async sendMessage(dto: SendMessageDto): Promise<Message> {
    if (!dto.content?.trim()) {
      throw new BadRequestException('content is required');
    }

    const conversation = await this.prisma.conversation.findUnique({
      where: { id: dto.conversationId },
    });
    if (!conversation) {
      throw new NotFoundException('conversation not found');
    }

    const message = await this.prisma.message.create({
      data: {
        conversationId: dto.conversationId,
        senderType: dto.senderType,
        content: dto.content,
      },
    });

    this.dispatch(conversation.clientId, dto.senderType, message);

    return message;
  }

  /**
   * Routes the new message over SSE to whoever did not send it, plus a
   * lightweight notification event on the same mutualized channel.
   */
  private dispatch(clientId: string, senderType: SenderType, message: Message): void {
    const messageEvent: ChatEvent = { type: 'message', data: message };
    const notificationEvent: ChatEvent = {
      type: 'notification',
      data: { conversationId: message.conversationId, senderType },
    };

    if (senderType === SenderType.CLIENT) {
      this.sse.broadcastToSupport(messageEvent);
      this.sse.broadcastToSupport(notificationEvent);
    } else {
      this.sse.sendToClient(clientId, messageEvent);
      this.sse.sendToClient(clientId, notificationEvent);
    }
  }
}
