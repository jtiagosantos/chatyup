import { useState, useEffect, useMemo } from 'react';
import { Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Flex, useTheme, Divider, Spinner, Text } from 'native-base';
import { PaperPlaneRight } from 'phosphor-react-native';
import { supabase } from '../../../../infra/supabase/client';

import { CreateOneMessageService } from '../../../../modules/messages/services/create-one-message.service';
import { FindManyMessagesService } from '../../../../modules/messages/services/find-many-messages.service';
import { FindOneMessageService } from '../../../../modules/messages/services/find-one-message.service';

import { Button, Output, TextField } from '../../../../common/components';
import { MessagesList } from '../components/messages-list.component';

import { useUser } from '../../../../common/hooks/use-user.hook';
import { useDimensions } from '../../../../common/hooks/use-dimensions.hook';
import { useLoading } from '../../../../common/hooks/use-loding.hook';

import type { FC } from 'react';
import type { ScreenProps } from '../../../../common/types/screen-props.type';
import type { SubmitHandler } from 'react-hook-form';
import type { Message } from '../../../../modules/messages/types/message.type';

const chatFormSchema = z.object({
  message: z.string().min(1, { message: 'Campo obrigatório' }),
});

type ChatFormData = z.infer<typeof chatFormSchema>;

export const ChatScreen: FC<ScreenProps<'chat'>> = ({
  route,
  navigation: { goBack },
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useUser();
  const { colors } = useTheme();
  const { width } = useDimensions();
  const sendMessageState = useLoading();
  const findMessagesState = useLoading();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<ChatFormData>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(chatFormSchema),
  });
  const channel = useMemo(() => supabase.channel(`room-${chatRoomId}`), []);

  const {
    params: { chatRoomId, code },
  } = route;
  const hasSomeMessage = !!messages.length;

  const onSubmit: SubmitHandler<ChatFormData> = async ({ message }) => {
    try {
      sendMessageState.enableLoading();
      Keyboard.dismiss();

      await CreateOneMessageService.execute({
        kind: 'TEXT',
        content: message,
        ownerId: user!.id,
        roomId: chatRoomId,
      });

      reset();
    } finally {
      sendMessageState.disableLoading();
    }
  };

  const handleLeaveTheRoom = () => {
    goBack();
  };

  const findRealTimeMessage = async (messageId: string) => {
    const newMessage = await FindOneMessageService.execute({
      messageId,
    });

    if (newMessage) {
      setMessages((currentMessages) => [newMessage, ...currentMessages]);
    }
  };

  useEffect(() => {
    findMessagesState.enableLoading();
    FindManyMessagesService.execute({ roomId: chatRoomId })
      .then((data) => {
        setMessages(data);
      })
      .finally(() => {
        findMessagesState.disableLoading();
      });
  }, []);

  useEffect(() => {
    const realTimeChanges = channel
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${chatRoomId}`,
        },
        (payload) => {
          findRealTimeMessage(payload.new.id);
        },
      )
      .subscribe();

    return () => {
      realTimeChanges.unsubscribe();
    };
  }, []);

  return (
    <Box flex={1} p="24px" bgColor="gray.900">
      <Flex w="full" flexDir="row" align="center" justify="space-between" mb="24px">
        <Output.Root w="160px">
          <Output.Value enableCopy successTextWhenCopying="Código copiado com sucesso">
            {code}
          </Output.Value>
        </Output.Root>
        <Button w="105px" h="100%" onPress={handleLeaveTheRoom}>
          Sair da sala
        </Button>
      </Flex>
      {!findMessagesState.isLoading ? (
        <>
          {hasSomeMessage && <MessagesList messages={messages} />}
          {!hasSomeMessage && (
            <Flex flex={1} align="center" justify="center" maxW="185px" mx="auto">
              <Text
                color="gray.500"
                fontSize="16px"
                fontWeight="light"
                textAlign="center"
                lineHeight="24px">
                As mensagens desta sala serão listadas aqui
              </Text>
            </Flex>
          )}
        </>
      ) : (
        <Flex flex={1} align="center" justify="center">
          <Spinner size="lg" color="violet.800" />
        </Flex>
      )}
      <Divider bgColor="gray.500" mb="16px" mt="24px" />
      <Flex
        maxW={`${width}px`}
        w="full"
        flexDir="row"
        align="center"
        justify="space-between">
        <TextField.Root maxW={`${width - 48 - 50 - 8}px`} w="full">
          <TextField.Input
            control={control}
            name="message"
            placeholder="Digite a sua mensagem"
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        </TextField.Root>
        <Button
          w="50px"
          h="100%"
          isDisabled={!isDirty}
          isLoading={sendMessageState.isLoading}
          onPress={handleSubmit(onSubmit)}>
          <PaperPlaneRight size={22} color={colors.white} />
        </Button>
      </Flex>
    </Box>
  );
};
