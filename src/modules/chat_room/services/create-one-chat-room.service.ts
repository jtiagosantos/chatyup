import firestore from '@react-native-firebase/firestore';
import { ChatRoomMapper } from '../../../infra/firebase/mappers/chat-room.mapper';
import { ECollections } from '../../../infra/firebase/enums/collections.enum';
import type { ChatRoom } from '../types/chat-room.type';

type CreateOneChatRoomInput = Pick<ChatRoom, 'name' | 'code'> & {
  userId: string;
};

export class CreateOneChatRoomService {
  public static async execute(input: CreateOneChatRoomInput) {
    const formattedChatRoom = ChatRoomMapper.toFirestore(input);

    await firestore().collection(ECollections.CHAT_ROOMS).add(formattedChatRoom);
  }
}
