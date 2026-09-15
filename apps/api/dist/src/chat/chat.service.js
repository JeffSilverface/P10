"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const sse_connection_service_1 = require("./sse-connection.service");
const client_1 = require("../../generated/prisma/client");
let ChatService = class ChatService {
    prisma;
    sse;
    constructor(prisma, sse) {
        this.prisma = prisma;
        this.sse = sse;
    }
    createConversation(dto) {
        if (!dto.clientId) {
            throw new common_1.BadRequestException('clientId is required');
        }
        return this.prisma.conversation.create({
            data: {
                clientId: dto.clientId,
                reservationId: dto.reservationId,
                initiatedBy: dto.initiatedBy,
            },
        });
    }
    getMessages(conversationId) {
        return this.prisma.message.findMany({
            where: { conversationId },
            orderBy: { sentAt: 'asc' },
        });
    }
    async sendMessage(dto) {
        if (!dto.content?.trim()) {
            throw new common_1.BadRequestException('content is required');
        }
        const conversation = await this.prisma.conversation.findUnique({
            where: { id: dto.conversationId },
        });
        if (!conversation) {
            throw new common_1.NotFoundException('conversation not found');
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
    dispatch(clientId, senderType, message) {
        const messageEvent = { type: 'message', data: message };
        const notificationEvent = {
            type: 'notification',
            data: { conversationId: message.conversationId, senderType },
        };
        if (senderType === client_1.SenderType.CLIENT) {
            this.sse.broadcastToSupport(messageEvent);
            this.sse.broadcastToSupport(notificationEvent);
        }
        else {
            this.sse.sendToClient(clientId, messageEvent);
            this.sse.sendToClient(clientId, notificationEvent);
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        sse_connection_service_1.SseConnectionService])
], ChatService);
//# sourceMappingURL=chat.service.js.map