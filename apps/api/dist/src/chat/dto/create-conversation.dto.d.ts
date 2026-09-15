import { SenderType } from '../../../generated/prisma/client';
export declare class CreateConversationDto {
    clientId: string;
    reservationId?: string;
    initiatedBy: SenderType;
}
