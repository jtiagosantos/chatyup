import { Image, Box, Flex, Text } from 'native-base';

import { useDimensions } from '../../../../common/hooks/use-dimensions.hook';

import type { FC } from 'react';

type MessageProps = {
  avatarURL: string;
  author: string;
  text: string;
};

export const Message: FC<MessageProps> = ({ avatarURL, author, text }) => {
  const { width } = useDimensions();

  return (
    <Flex
      w="full"
      flexDir="row"
      bgColor="gray.800"
      borderRadius="5px"
      p="6px 6px 6px"
      mb="12px">
      <Flex w="30px" h="30px" align="center" justify="center" borderRadius="full">
        <Image
          source={{ uri: avatarURL }}
          width="full"
          height="full"
          borderRadius="full"
          alt={author}
        />
      </Flex>
      <Box ml="10px">
        <Text color="gray.400" fontSize="14px" fontWeight="medium" mt="-5px">
          {author}
        </Text>
        <Text
          maxW={`${width - 48 - 30 - 12 - 10}px`}
          w="full"
          color="gray.500"
          fontSize="14px"
          mt="2px">
          {text}
        </Text>
      </Box>
    </Flex>
  );
};
