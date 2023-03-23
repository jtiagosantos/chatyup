import { EKindMessage } from '../enums/kind-message.enum';

export type Message = {
  id: string;
  kind: keyof typeof EKindMessage;
  content: string;
  deletedAt: Date | null;
  createdAt: string;
  user: {
    firstName: string;
    avatarURL: string;
  };
};
