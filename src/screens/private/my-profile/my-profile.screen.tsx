import { useNavigation } from '@react-navigation/native';
import { Box, Text, Flex, useDisclose } from 'native-base';

import { Button, Output } from '../../../common/components';
import { EditAvatar } from './components/edit-avatar.component';
import { Avatar } from './components/avatar.component';

import { useUser } from '../../../common/hooks/use-user.hook';

export const MyProfileScreen = () => {
  const { navigate } = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const { user, signOut } = useUser();

  const handleNavigationToEditProfileScreen = () => {
    navigate('editProfile');
  };

  return (
    <>
      <Box flex={1} bgColor="gray.900" p="24px">
        <Flex flexDir="row" align="center" justify="space-between">
          <Text color="gray.400" fontSize="16px" fontWeight="medium">
            Olá, {user?.firstName}!
          </Text>
          <Button maxW="110px" h="36px" onPress={handleNavigationToEditProfileScreen}>
            Editar perfil
          </Button>
        </Flex>
        <Avatar.Root w="110px" h="110px" mx="auto" mt="32px">
          <Avatar.EditButton onPress={onOpen} />
          <Avatar.Image uri={user?.avatarURL ?? ''} />
        </Avatar.Root>
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

      {isOpen && <EditAvatar isOpen={isOpen} onClose={onClose} />}
    </>
  );
};
