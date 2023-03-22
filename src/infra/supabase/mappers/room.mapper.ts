import type { Room } from '../../../modules/rooms/types/room.type';

type RoomToDatabase = Omit<Room, 'id' | 'deletedAt'> & {
  ownerId: string;
};

export type RoomFromDatabase = {
  id: string;
  name: string;
  code: string;
  deleted_at: Date | null;
  created_at: Date;
};

export class RoomMapper {
  public static toDatabase(data: RoomToDatabase) {
    return {
      name: data.name,
      code: data.code,
      owner_id: data.ownerId,
    };
  }

  public static toDomain(data: RoomFromDatabase): Room {
    return {
      id: data.id,
      name: data.name,
      code: data.code,
      deletedAt: data.deleted_at,
      createdAt: data.created_at,
    };
  }
}
