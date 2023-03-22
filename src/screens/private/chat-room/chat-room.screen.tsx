import { ScrollView } from 'react-native';
import { Box, Text } from 'native-base';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigation } from '@react-navigation/native';

import { FindOneRoomService } from '../../../modules/rooms/services/find-one-room.service';

import { TextField, Button } from '../../../common/components';

import { useDimensions } from '../../../common/hooks/use-dimensions.hook';
import { useLoading } from '../../../common/hooks/use-loding.hook';

import LogoImage from '../../../common/assets/logo.svg';

import type { SubmitHandler } from 'react-hook-form';

const chatRoomFormSchema = z.object({
  code: z.string().min(1, { message: 'Campo obrigatório' }),
});

type ChatRoomFormData = z.infer<typeof chatRoomFormSchema>;

export const ChatRoomScreen = () => {
  const { height } = useDimensions();
  const { isLoading, enableLoading, disableLoading } = useLoading();
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ChatRoomFormData>({
    defaultValues: {
      code: '',
    },
    resolver: zodResolver(chatRoomFormSchema),
  });

  const onSubmit: SubmitHandler<ChatRoomFormData> = async ({ code }) => {
    try {
      enableLoading();

      const room = await FindOneRoomService.execute({ code });

      if (!room) {
        setError('code', { message: 'Código inválido' });
        return;
      }
      reset();
      disableLoading();

      navigate('chat', {
        chatRoomId: room.id,
        code: room.code,
      });
    } finally {
      disableLoading();
    }
  };

  return (
    <Box h={`${height}px`} flex={1} p="24px" pt="32px" pb={0} bgColor="gray.900">
      <Box maxW="250px">
        <LogoImage />
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
                keyboardType="numeric"
                placeholder="Digite o código"
              />
              {!!errors.code && <TextField.Error>{errors.code.message}</TextField.Error>}
            </TextField.Root>
            <Button mt="16px" onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
              Entrar na sala
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
