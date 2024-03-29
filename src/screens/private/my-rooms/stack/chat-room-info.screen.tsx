import { LogBox } from 'react-native';
import { Box, Flex, Modal, useDisclose, Text } from 'native-base';

import { SoftDeleteOneRoomService } from '../../../../modules/rooms/services/soft-delete-one-room.service';

import { Header, Button, Output } from '../../../../common/components';

import { useLoading } from '../../../../common/hooks/use-loding.hook';

import { formatDate } from '../../../../common/utils/format-date.util';

import type { FC } from 'react';
import type { ScreenProps } from '../../../../common/types/screen-props.type';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export const ChatRoomInfoScreen: FC<ScreenProps<'chatRoomInfo'>> = ({
  route,
  navigation: { goBack },
}) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { isLoading, enableLoading, disableLoading } = useLoading();

  const {
    params: { chatRoom, onUpdateChatRooms },
  } = route;
  const formattedDate = formatDate(chatRoom.createdAt);

  const handleDeleteChatRoom = async () => {
    try {
      enableLoading();

      await SoftDeleteOneRoomService.execute({ roomId: chatRoom.id });
      await onUpdateChatRooms();

      disableLoading();
      goBack();
    } finally {
      disableLoading();
    }
  };

  return (
    <>
      <Box flex={1} bgColor="gray.900">
        <Header title="Informações da sala" />
        <Flex flex={1} p="24px">
          <Output.Root>
            <Output.Label>Nome</Output.Label>
            <Output.Value>{chatRoom.name}</Output.Value>
          </Output.Root>
          <Output.Root mt="16px">
            <Output.Label>Código</Output.Label>
            <Output.Value enableCopy successTextWhenCopying="Código copiado com sucesso">
              {chatRoom.code}
            </Output.Value>
          </Output.Root>
          <Output.Root mt="16px">
            <Output.Label>Data de criação</Output.Label>
            <Output.Value>{formattedDate}</Output.Value>
          </Output.Root>
          <Button mt="24px" onPress={onOpen}>
            <Text fontFamily="Poppins_500Medium">Deletar sala</Text>
          </Button>
        </Flex>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        _overlay={{
          animationPreset: 'slide',
        }}>
        <Modal.Content bgColor="gray.900">
          <Modal.Body>
            <Text color="gray.300" fontSize="16px">
              Você deseja deletar esta sala?
            </Text>
            <Text color="gray.500" fontSize="14px" fontFamily="Poppins_300Light" mt="6px">
              * Depois de confirmada, esta ação não pode ser desfeita.
            </Text>
            <Button mt="16px" onPress={handleDeleteChatRoom} isLoading={isLoading}>
              <Text fontFamily="Poppins_500Medium">Confirmar</Text>
            </Button>
            <Button variant="ghost" mt="16px" h="30px" onPress={onClose}>
              <Text fontFamily="Poppins_500Medium">Cancelar</Text>
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
