import {
  Body,
  Controller,
  Get,
  MessageEvent,
  Param,
  Post,
  Query,
  Sse,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';
import { SseConnectionService } from './sse-connection.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { ConversationStatus } from '../../generated/prisma/client';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly sse: SseConnectionService,
  ) {}

  @Sse('stream/client/:clientId')
  streamClient(@Param('clientId') clientId: string): Observable<MessageEvent> {
    const subject = this.sse.registerClient(clientId);
    return new Observable<MessageEvent>((subscriber) => {
      const subscription = subject.subscribe(subscriber);
      return () => {
        subscription.unsubscribe();
        this.sse.unregisterClient(clientId, subject);
      };
    });
  }

  @Sse('stream/support')
  streamSupport(): Observable<MessageEvent> {
    const subject = this.sse.registerSupport();
    return new Observable<MessageEvent>((subscriber) => {
      const subscription = subject.subscribe(subscriber);
      return () => {
        subscription.unsubscribe();
        this.sse.unregisterSupport(subject);
      };
    });
  }

  @Post('conversations')
  createConversation(@Body() dto: CreateConversationDto) {
    return this.chatService.createConversation(dto);
  }

  @Get('conversations')
  listConversations(@Query('status') status?: ConversationStatus) {
    return this.chatService.listConversations(status);
  }

  @Get('conversations/client/:clientId')
  getClientConversation(@Param('clientId') clientId: string) {
    return this.chatService.getClientConversation(clientId);
  }

  @Get('conversations/:id/messages')
  getMessages(@Param('id') id: string) {
    return this.chatService.getMessages(id);
  }

  @Post('messages')
  sendMessage(@Body() dto: SendMessageDto) {
    return this.chatService.sendMessage(dto);
  }
}
