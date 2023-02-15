import { ScrollView } from 'react-native';
import { Box, Text } from 'native-base';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { TextField, Button } from '../../../common/components';

import { useDimensions } from '../../../common/hooks/use-dimensions.hook';

import Logo from '../../../common/assets/logo.svg';

import type { SubmitHandler } from 'react-hook-form';

const chatRoomFormSchema = z.object({
  code: z.string().min(1, { message: 'Campo obrigatório' }),
});

type ChatRoomFormData = z.infer<typeof chatRoomFormSchema>;

export const ChatRoomScreen = () => {
  const { height } = useDimensions();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChatRoomFormData>({
    defaultValues: {
      code: '',
    },
    resolver: zodResolver(chatRoomFormSchema),
  });

  const onSubmit: SubmitHandler<ChatRoomFormData> = ({ code }) => {
    console.log(code);
  };

  return (
    <Box h={`${height}px`} flex={1} p="24px" pt="32px" pb={0} bgColor="gray.900">
      <Box maxW="250px">
        <Logo />
        <Text color="gray.500" fontSize="16px">
          Converse com os seus amigos de forma simples e rápida
        </Text>
      </Box>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box w="full" mt="88px">
          <Text color="gray.400" fontSize="16px">
            Para entrar em uma sala de conversa com os seus amigos, insira o código da
            sala no campo abaixo
          </Text>
          <Box mt="24px">
            <TextField.Root isInvalid={!!errors.code}>
              <TextField.Label>Código da sala</TextField.Label>
              <TextField.Input
                control={control}
                name="code"
                placeholder="Digite o código"
              />
              {!!errors.code && <TextField.Error>{errors.code.message}</TextField.Error>}
            </TextField.Root>
            <Button mt="16px" onPress={handleSubmit(onSubmit)}>
              Entrar na sala
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
