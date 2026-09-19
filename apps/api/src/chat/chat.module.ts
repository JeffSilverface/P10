import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { SseConnectionService } from './sse-connection.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, SseConnectionService],
})
export class ChatModule {}
