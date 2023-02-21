import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import type { ChatRoom } from '../../../modules/chat_room/types/chat-room.type';

type ChatRoomToFirestore = Pick<ChatRoom, 'name' | 'code'> & {
  userId: string;
};

export type ChatRoomFromFirestore = {
  id: string;
  name: string;
  code: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
};

export class ChatRoomMapper {
  public static toFirestore(chatRoom: ChatRoomToFirestore) {
    const dateNow = firestore.Timestamp.now();

    return {
      user_id: chatRoom.userId,
      name: chatRoom.name,
      code: chatRoom.code,
      created_at: dateNow,
      updated_at: dateNow,
    };
  }

  public static toDomain(chatRoom: ChatRoomFromFirestore): ChatRoom {
    return {
      id: chatRoom.id,
      name: chatRoom.name,
      code: chatRoom.code,
      createdAt: chatRoom.created_at.toDate(),
    };
  }
}
