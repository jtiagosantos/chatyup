import firestore from '@react-native-firebase/firestore';
import { ECollections } from '../../../infra/firebase/enums/collections.enum';

export class SoftDeleteOneChatRoomService {
  public static async execute(chatRoomId: string) {
    const dateNow = firestore.Timestamp.now();

    await firestore().collection(ECollections.CHAT_ROOMS).doc(chatRoomId).update({
      deleted_at: dateNow,
    });
  }
}
