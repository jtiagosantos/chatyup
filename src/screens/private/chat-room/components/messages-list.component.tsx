import { FlatList } from 'react-native';
import { useCallback, memo } from 'react';

import { MessageCard } from './message-card.component';

import type { FC } from 'react';
import type { Message } from '../../../../modules/messages/types/message.type';

type MessagesListProps = {
  messages: Message[];
};

export const MessagesListComponent: FC<MessagesListProps> = ({ messages }) => {
  const renderItem = useCallback(
    ({ item }: { item: Message }) => (
      <MessageCard
        ownerAvatarURL={item.user.avatarURL}
        ownerName={item.user.firstName}
        content={item.content}
        createdAt={item.createdAt}
      />
    ),
    [],
  );

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      inverted
      removeClippedSubviews
      showsVerticalScrollIndicator={false}
    />
  );
};

export const MessagesList = memo(MessagesListComponent, (prevProps, nextProps) =>
  Object.is(prevProps.messages, nextProps.messages),
);
