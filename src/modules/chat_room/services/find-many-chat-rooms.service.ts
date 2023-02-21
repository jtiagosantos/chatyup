import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ChatRoomMapper } from '../../../infra/firebase/mappers/chat-room.mapper';
import { ECollections } from '../../../infra/firebase/enums/collections.enum';

import type { ChatRoom } from '../types/chat-room.type';
import type { ChatRoomFromFirestore } from '../../../infra/firebase/mappers/chat-room.mapper';

type FindManyChatRoomsInput = {
  userId?: string;
};

export class FindManyChatRoomsService {
  public static async execute({ userId }: FindManyChatRoomsInput) {
    let response: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>;

    if (userId) {
      response = await firestore()
        .collection(ECollections.CHAT_ROOMS)
        .where('user_id', '==', userId)
        .orderBy('created_at', 'desc')
        .get();
    }

    const chatRoomsExist = !response!.empty;

    if (!chatRoomsExist) return [];

    const chatRooms: ChatRoom[] = [];

    response!.docs.forEach((doc) => {
      const { name, code, created_at } = doc.data();
      const chatRoom: ChatRoomFromFirestore = {
        id: doc.id,
        name,
        code,
        created_at,
      };
      const formattedChatRoom = ChatRoomMapper.toDomain(chatRoom);

      chatRooms.push(formattedChatRoom);
    });

    return chatRooms;
  }
}
