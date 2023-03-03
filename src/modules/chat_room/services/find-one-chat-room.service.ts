import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ChatRoomMapper } from '../../../infra/firebase/mappers/chat-room.mapper';
import { ECollections } from '../../../infra/firebase/enums/collections.enum';

import type { ChatRoomFromFirestore } from '../../../infra/firebase/mappers/chat-room.mapper';

type FindOneChatRoomInput = {
  code: string;
};

export class FindOneChatRoomService {
  public static async execute({ code }: FindOneChatRoomInput) {
    let response: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>;

    if (code) {
      response = await firestore()
        .collection(ECollections.CHAT_ROOMS)
        .where('code', '==', code)
        .get();
    }

    const chatRoomsExists = !response!.empty;

    if (!chatRoomsExists) return null;

    const data = response!.docs?.[0]?.data();
    const chatRoomId = response!.docs?.[0]?.id;
    const chatRoom = {
      id: chatRoomId,
      ...data,
    } as ChatRoomFromFirestore;

    const formattedChatRoom = ChatRoomMapper.toDomain(chatRoom);

    return formattedChatRoom;
  }
}
