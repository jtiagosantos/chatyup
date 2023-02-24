import { useEffect, useState } from 'react';
import { Box, Flex, Text, useDisclose, Modal, Spinner } from 'native-base';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { CreateOneChatRoomService } from '../../../modules/chat_room/services/create-one-chat-room.service';
import { FindManyChatRoomsService } from '../../../modules/chat_room/services/find-many-chat-rooms.service';

import { Button, TextField } from '../../../common/components';
import { ChatRoomsList } from './components/chat-rooms-list.component';

import { useUser } from '../../../common/hooks/use-user.hook';
import { useLoading } from '../../../common/hooks/use-loding.hook';

import { generateRoomCode } from '../../../common/utils/generate-room-code.util';

import type { SubmitHandler } from 'react-hook-form';
import type { ChatRoom } from '../../../modules/chat_room/types/chat-room.type';

const createRoomFormSchema = z.object({
  room_name: z.string().min(1, { message: 'Campo obrigatório' }),
});

type CreateRoomFormData = z.infer<typeof createRoomFormSchema>;

export const MyRoomsScreen = () => {
  const { user } = useUser();
  const createChatRoomLoadingState = useLoading();
  const fetchChatRoomsLoadingState = useLoading();
  const { isOpen, onOpen, onClose } = useDisclose();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRoomFormData>({
    defaultValues: {
      room_name: '',
    },
    resolver: zodResolver(createRoomFormSchema),
  });
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const userHasSomeChatRoom = !!chatRooms.length;

  const onSubmit: SubmitHandler<CreateRoomFormData> = async (data) => {
    try {
      createChatRoomLoadingState.enableLoading();

      const code = generateRoomCode();
      const userId = user!.id;
      const name = data.room_name;

      await CreateOneChatRoomService.execute({ name, code, userId });

      createChatRoomLoadingState.disableLoading();
      onClose();
      reset({ room_name: '' });

      setChatRooms([]);
      updateChatRoomsState();
    } finally {
      createChatRoomLoadingState.disableLoading();
    }
  };

  const updateChatRoomsState = async () => {
    setChatRooms([]);

    fetchChatRoomsLoadingState.enableLoading();

    const data = await fetchChatRooms();
    setChatRooms(data);

    fetchChatRoomsLoadingState.disableLoading();
  };

  const fetchChatRooms = async () => {
    return FindManyChatRoomsService.execute({ userId: user!.id });
  };

  useEffect(() => {
    fetchChatRoomsLoadingState.enableLoading();
    fetchChatRooms()
      .then((data) => {
        setChatRooms(data);
        fetchChatRoomsLoadingState.disableLoading();
      })
      .finally(() => {
        fetchChatRoomsLoadingState.disableLoading();
      });
  }, []);

  return (
    <>
      <Box flex={1} bgColor="gray.900" p="24px" pb="0">
        <Flex flexDir="row" align="center" justify="space-between">
          <Text color="gray.400" fontSize="16px" fontWeight="medium">
            Salas criadas ({chatRooms.length})
          </Text>
          <Button maxW="95px" h="36px" onPress={onOpen}>
            Criar sala
          </Button>
        </Flex>
        {!userHasSomeChatRoom && (
          <Flex flex={1} align="center" justify="center" maxW="185px" mx="auto">
            {fetchChatRoomsLoadingState.isLoading && (
              <Spinner size="lg" color="violet.800" />
            )}
            {!fetchChatRoomsLoadingState.isLoading && !isOpen && (
              <Text
                color="gray.500"
                fontSize="16px"
                fontWeight="light"
                textAlign="center"
                lineHeight="24px">
                Suas salas criadas serão listadas aqui
              </Text>
            )}
          </Flex>
        )}
        {userHasSomeChatRoom && (
          <ChatRoomsList chatRooms={chatRooms} onUpdateChatRooms={updateChatRoomsState} />
        )}
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        _overlay={{
          animationPreset: 'slide',
        }}>
        <Modal.Content bgColor="gray.900">
          <Modal.Body>
            <TextField.Root isInvalid={!!errors.room_name}>
              <TextField.Label>Nome da sala</TextField.Label>
              <TextField.Input name="room_name" control={control} />
              {!!errors.room_name && (
                <TextField.Error>{errors.room_name.message}</TextField.Error>
              )}
            </TextField.Root>
            <Button
              mt="16px"
              onPress={handleSubmit(onSubmit)}
              isLoading={createChatRoomLoadingState.isLoading}>
              Criar
            </Button>
            <Button variant="ghost" mt="16px" h="30px" onPress={onClose}>
              Cancelar
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
