import { FlatList, Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Flex, useTheme, Divider } from 'native-base';
import { PaperPlaneRight } from 'phosphor-react-native';

import { Button, Output, TextField } from '../../../../common/components';
import { Message } from '../components/message.component';

import { useDimensions } from '../../../../common/hooks/use-dimensions.hook';

import type { FC } from 'react';
import type { ScreenProps } from '../../../../common/types/screen-props.type';
import type { SubmitHandler } from 'react-hook-form';

const chatFormSchema = z.object({
  message: z.string().min(1, { message: 'Campo obrigatório' }),
});

type ChatFormData = z.infer<typeof chatFormSchema>;

const messages = [
  {
    id: 1,
    avatarURL: 'https://github.com/jtiagosantos.png',
    author: 'jtiagosantos',
    text: 'E aí galera, beleza?',
  },
];

export const ChatScreen: FC<ScreenProps<'chat'>> = ({
  route,
  navigation: { goBack },
}) => {
  const { colors } = useTheme();
  const { width } = useDimensions();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ChatFormData>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(chatFormSchema),
  });

  const {
    params: { chatRoomId, code },
  } = route;

  const onSubmit: SubmitHandler<ChatFormData> = async ({ message }) => {
    console.log(message);
    Keyboard.dismiss();
    reset();
  };

  const handleLeaveTheRoom = () => {
    goBack();
  };

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
      <FlatList
        data={messages}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Message avatarURL={item.avatarURL} author={item.author} text={item.text} />
        )}
        inverted
        showsVerticalScrollIndicator={false}
      />
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
          />
        </TextField.Root>
        <Button w="50px" h="100%" isDisabled={!isDirty} onPress={handleSubmit(onSubmit)}>
          <PaperPlaneRight size={22} color={colors.white} />
        </Button>
      </Flex>
    </Box>
  );
};
