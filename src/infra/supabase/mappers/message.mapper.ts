import dayjs from 'dayjs';
import { EKindMessage } from '../../../modules/messages/enums/kind-message.enum';
import type { Message } from '../../../modules/messages/types/message.type';

type MessageToDatabase = Omit<Message, 'id' | 'deletedAt' | 'createdAt'> & {
  ownerId: string;
  roomId: string;
};

export type MessageFromDatabase = {
  id: string;
  kind: keyof typeof EKindMessage;
  content: string;
  deleted_at: Date | null;
  created_at: Date;
  user: {
    first_name: string;
    avatar_url: string;
  };
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
    const formattedCreatedAt = dayjs(data.created_at).format('DD/MM/YYYY - hh[h]mm');

    return {
      id: data.id,
      kind: data.kind,
      content: data.content,
      createdAt: formattedCreatedAt,
      deletedAt: data.deleted_at,
      user: {
        firstName: data.user.first_name,
        avatarURL: data.user.avatar_url,
      },
    };
  }
}
