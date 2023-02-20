import firestore from '@react-native-firebase/firestore';
import type { ChatRoom } from '../../../modules/chat_room/types/chat-room.type';

type ChatRoomToFirestore = Pick<ChatRoom, 'name' | 'code'> & {
  userId: string;
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
}
