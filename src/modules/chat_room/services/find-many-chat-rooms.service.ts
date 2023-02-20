import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ECollections } from '../../../infra/firebase/enums/collections.enum';
import type { ChatRoom } from '../types/chat-room.type';

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
      const { name, code } = doc.data();
      const chatRoom: ChatRoom = {
        id: doc.id,
        name,
        code,
      };
      chatRooms.push(chatRoom);
    });

    return chatRooms;
  }
}
