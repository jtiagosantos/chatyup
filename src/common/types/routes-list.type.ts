import type { ChatRoom } from '../../modules/chat_room/types/chat-room.type';

export type RoutesList = {
  auth: undefined;
  splash: undefined;
  home: undefined;
  chatRoom: undefined;
  chat: {
    chatRoomId: string;
    code: string;
  };
  myRooms: undefined;
  chatRoomInfo: {
    chatRoom: ChatRoom;
    onUpdateChatRooms: () => Promise<void>;
  };
  myProfile: undefined;
  editProfile: undefined;
};
