import { EKindMessage } from '../../../modules/messages/enums/kind-message.enum';
import type { Message } from '../../../modules/messages/types/message.type';

type MessageToDatabase = Omit<Message, 'id' | 'deletedAt' | 'createdAt'> & {
  ownerId: string;
  roomId: string;
};

type MessageFromDatabase = {
  id: string;
  kind: keyof typeof EKindMessage;
  content: string;
  deleted_at: Date | null;
  created_at: Date;
};

export class MessageMapper {
  public static toDatabase(data: MessageToDatabase) {
    return {
      kind: data.kind,
      content: data.content,
      owner_id: data.ownerId,
      room_id: data.roomId,
    };
  }

  public static toDomain(data: MessageFromDatabase): Message {
    return {
      id: data.id,
      kind: data.kind,
      content: data.content,
      createdAt: data.created_at,
      deletedAt: data.deleted_at,
    };
  }
}
