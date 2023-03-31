import { TouchableOpacity } from 'react-native';
import { Flex, Text, Factory } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { CaretLeft } from 'phosphor-react-native';

import type { FC } from 'react';

type HeaderProps = {
  title: string;
};

export const Header: FC<HeaderProps> = ({ title }) => {
  const { goBack } = useNavigation();

  const FactoryTouchableOpacity = Factory(TouchableOpacity);

  return (
    <Flex
      w="full"
      h="46px"
      flexDir="row"
      align="center"
      justify="center"
      bgColor="gray.800"
      position="relative">
      <FactoryTouchableOpacity
        activeOpacity={0.6}
        position="absolute"
        left="24px"
        top="25%"
        onPress={goBack}>
        <CaretLeft size={22} color="#A1A1AA" />
      </FactoryTouchableOpacity>
      <Text color="gray.400" fontSize="16px" fontFamily="Poppins_500Medium">
        {title}
      </Text>
    </Flex>
  );
};
