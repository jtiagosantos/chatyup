import { useNavigation } from '@react-navigation/native';
import { Box, Text, Flex, Button as NBButton } from 'native-base';
import { NotePencil } from 'phosphor-react-native';

import { Button, Output } from '../../../common/components';

import { useUser } from '../../../common/hooks/use-user.hook';

import UserProfileImage from '../../../common/assets/user-profile.svg';

export const MyProfileScreen = () => {
  const { navigate } = useNavigation();
  const { user, signOut } = useUser();

  const handleNavigationToEditProfileScreen = () => {
    navigate('editProfile');
  };

  return (
    <Box flex={1} bgColor="gray.900" p="24px">
      <Flex flexDir="row" align="center" justify="space-between">
        <Text color="gray.400" fontSize="16px" fontWeight="medium">
          Olá, {user?.firstName}!
        </Text>
        <Button maxW="110px" h="36px" onPress={handleNavigationToEditProfileScreen}>
          Editar perfil
        </Button>
      </Flex>
      <Flex
        align="center"
        justify="center"
        w="100px"
        h="100px"
        bgColor="gray.700"
        borderRadius="50px"
        mx="auto"
        mt="32px"
        position="relative">
        <NBButton
          p={0}
          w="26px"
          h="26px"
          bgColor="violet.800"
          borderRadius="5px"
          position="absolute"
          top={0}
          right={0}
          _pressed={{
            opacity: 0.6,
          }}>
          <NotePencil size={20} color="#fafafa" />
        </NBButton>
        <UserProfileImage />
      </Flex>
      <Box mt="24px" mb="16px">
        <Output.Root>
          <Output.Label>Primeiro nome</Output.Label>
          <Output.Value>{user?.firstName}</Output.Value>
        </Output.Root>
        <Output.Root mt="16px">
          <Output.Label>Nome de usuário</Output.Label>
          <Output.Value>{user?.username}</Output.Value>
        </Output.Root>
        <Output.Root mt="16px">
          <Output.Label>E-mail</Output.Label>
          <Output.Value>{user?.email}</Output.Value>
        </Output.Root>
      </Box>
      <Button w="30px" variant="ghost" onPress={signOut}>
        Sair
      </Button>
    </Box>
  );
};
