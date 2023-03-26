import { Image, Box, Flex, Text } from 'native-base';

import { useDimensions } from '../../../../common/hooks/use-dimensions.hook';

import UserProfileImage from '../../../../common/assets/user-profile.svg';

import type { FC } from 'react';

type MessageProps = {
  ownerAvatarURL: string;
  ownerName: string;
  content: string;
  createdAt: string;
};

export const MessageCard: FC<MessageProps> = ({
  ownerAvatarURL,
  ownerName,
  content,
  createdAt,
}) => {
  const { width } = useDimensions();

  return (
    <Flex
      w="full"
      flexDir="row"
      bgColor="gray.800"
      borderRadius="5px"
      p="6px 6px 6px"
      mb="12px">
      <Flex
        w="30px"
        h="30px"
        p="1px"
        align="center"
        justify="center"
        borderRadius="full"
        borderWidth="1px"
        borderColor="violet.800">
        {ownerAvatarURL ? (
          <Image
            source={{ uri: ownerAvatarURL }}
            width="full"
            height="full"
            borderRadius="full"
            alt={ownerName}
          />
        ) : (
          <UserProfileImage width={24} />
        )}
      </Flex>
      <Box ml="10px">
        <Flex
          w={`${width - 48 - 30 - 12 - 10}px`}
          flexDir="row"
          align="center"
          justify="space-between">
          <Text color="gray.400" fontSize="14px" fontWeight="medium" mt="-5px">
            {ownerName}
          </Text>
          <Text color="gray.500" fontSize="12px">
            {createdAt}
          </Text>
        </Flex>
        <Text
          maxW={`${width - 48 - 30 - 12 - 10}px`}
          w="full"
          color="gray.500"
          fontSize="14px"
          mt="4px">
          {content}
        </Text>
      </Box>
    </Flex>
  );
};
