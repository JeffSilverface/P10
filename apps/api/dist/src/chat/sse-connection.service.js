"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SseConnectionService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let SseConnectionService = class SseConnectionService {
    clientStreams = new Map();
    supportStreams = new Set();
    registerClient(clientId) {
        const subject = new rxjs_1.Subject();
        const existing = this.clientStreams.get(clientId) ?? new Set();
        existing.add(subject);
        this.clientStreams.set(clientId, existing);
        return subject;
    }
    unregisterClient(clientId, subject) {
        const existing = this.clientStreams.get(clientId);
        if (!existing)
            return;
        existing.delete(subject);
        if (existing.size === 0) {
            this.clientStreams.delete(clientId);
        }
    }
    registerSupport() {
        const subject = new rxjs_1.Subject();
        this.supportStreams.add(subject);
        return subject;
    }
    unregisterSupport(subject) {
        this.supportStreams.delete(subject);
    }
    sendToClient(clientId, event) {
        const subjects = this.clientStreams.get(clientId);
        if (!subjects)
            return;
        for (const subject of subjects) {
            subject.next({ type: event.type, data: event.data });
        }
    }
    broadcastToSupport(event) {
        for (const subject of this.supportStreams) {
            subject.next({ type: event.type, data: event.data });
        }
    }
};
exports.SseConnectionService = SseConnectionService;
exports.SseConnectionService = SseConnectionService = __decorate([
    (0, common_1.Injectable)()
], SseConnectionService);
//# sourceMappingURL=sse-connection.service.js.map