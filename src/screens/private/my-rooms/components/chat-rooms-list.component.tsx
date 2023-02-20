import { FlatList } from 'react-native';
import { Flex, Text, Box, Button, useTheme } from 'native-base';
import { CopySimple } from 'phosphor-react-native';

import { useDimensions } from '../../../../common/hooks/use-dimensions.hook';

import type { FC } from 'react';
import type { ChatRoom } from '../../../../modules/chat_room/types/chat-room.type';

type ChatRoomsListProps = {
  chatRooms: ChatRoom[];
};

export const ChatRoomsList: FC<ChatRoomsListProps> = ({ chatRooms }) => {
  const { colors } = useTheme();
  const { width } = useDimensions();

  return (
    <Flex flex={1} align="center" mt="32px">
      <FlatList<ChatRoom>
        data={chatRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { name, code } }) => (
          <Flex
            flexDir="row"
            align="center"
            justify="space-between"
            h="40px"
            bgColor="gray.800"
            borderRadius="5px"
            pl="12px">
            <Text
              w={`${width - 24 * 2 - 60}px`}
              color="gray.400"
              fontSize="14px"
              numberOfLines={1}>
              {name}
            </Text>
            <Button
              w="44px"
              h="40px"
              bgColor="violet.800"
              borderTopLeftRadius="0"
              borderBottomLeftRadius="0"
              _pressed={{
                opacity: 0.6,
              }}>
              <CopySimple size={22} color={colors.white} />
            </Button>
          </Flex>
        )}
        ItemSeparatorComponent={() => <Box h="16px" />}
        contentContainerStyle={{
          minWidth: '100%',
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      />
    </Flex>
  );
};
