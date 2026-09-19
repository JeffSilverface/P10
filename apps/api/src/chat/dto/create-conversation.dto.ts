import { SenderType } from '../../../generated/prisma/client';

export class CreateConversationDto {
  clientId!: string;
  reservationId?: string;
  initiatedBy!: SenderType;
}
