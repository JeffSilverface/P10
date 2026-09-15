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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const chat_service_1 = require("./chat.service");
const sse_connection_service_1 = require("./sse-connection.service");
const create_conversation_dto_1 = require("./dto/create-conversation.dto");
const send_message_dto_1 = require("./dto/send-message.dto");
let ChatController = class ChatController {
    chatService;
    sse;
    constructor(chatService, sse) {
        this.chatService = chatService;
        this.sse = sse;
    }
    streamClient(clientId) {
        const subject = this.sse.registerClient(clientId);
        return new rxjs_1.Observable((subscriber) => {
            const subscription = subject.subscribe(subscriber);
            return () => {
                subscription.unsubscribe();
                this.sse.unregisterClient(clientId, subject);
            };
        });
    }
    streamSupport() {
        const subject = this.sse.registerSupport();
        return new rxjs_1.Observable((subscriber) => {
            const subscription = subject.subscribe(subscriber);
            return () => {
                subscription.unsubscribe();
                this.sse.unregisterSupport(subject);
            };
        });
    }
    createConversation(dto) {
        return this.chatService.createConversation(dto);
    }
    getMessages(id) {
        return this.chatService.getMessages(id);
    }
    sendMessage(dto) {
        return this.chatService.sendMessage(dto);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Sse)('stream/client/:clientId'),
    __param(0, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], ChatController.prototype, "streamClient", null);
__decorate([
    (0, common_1.Sse)('stream/support'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], ChatController.prototype, "streamSupport", null);
__decorate([
    (0, common_1.Post)('conversations'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_conversation_dto_1.CreateConversationDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "createConversation", null);
__decorate([
    (0, common_1.Get)('conversations/:id/messages'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)('messages'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_message_dto_1.SendMessageDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "sendMessage", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        sse_connection_service_1.SseConnectionService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map