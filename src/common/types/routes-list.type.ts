import type { Room } from '../../modules/rooms/types/room.type';

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
    chatRoom: Room;
    onUpdateChatRooms: () => Promise<void>;
  };
  myProfile: undefined;
  editProfile: undefined;
};
