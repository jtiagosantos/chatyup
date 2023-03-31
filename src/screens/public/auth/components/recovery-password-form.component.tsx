import * as Linking from 'expo-linking';
import { Link, Flex, useToast } from 'native-base';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FindOneUserService } from '../../../../modules/user/services/find-one-user.service';

import { TextField, Button } from '../../../../common/components';

import { useLoading } from '../../../../common/hooks/use-loding.hook';

import { FC, useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';

const recoveryPasswordFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .email({ message: 'E-mail inválido' }),
});

type RecoveryPasswordFormData = z.infer<typeof recoveryPasswordFormSchema>;

type RecoveryPasswordFormProps = {
  onChangeToSignInForm: () => void;
};

export const RecoveryPasswordForm: FC<RecoveryPasswordFormProps> = ({
  onChangeToSignInForm,
}) => {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    reset,
    formState: { errors },
  } = useForm<RecoveryPasswordFormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(recoveryPasswordFormSchema),
  });
  const { isLoading, enableLoading, disableLoading } = useLoading();
  const [enableRecoveryPassword, setEnableRecoveryPassword] = useState(false);
  const userIdRef = useRef('');

  const onSubmit: SubmitHandler<RecoveryPasswordFormData> = async ({ email }) => {
    try {
      enableLoading();

      const user = await FindOneUserService.execute({ email });

      if (!user) {
        setError('email', { message: 'E-mail não cadastrado' });
        disableLoading();

        return;
      }

      userIdRef.current = user.id;
      setEnableRecoveryPassword(true);

      /* toast.closeAll();
      toast.show({
        title: 'Solicitação enviada',
        bgColor: 'success.900',
        mb: -5,
      }); */
      disableLoading();
    } finally {
      disableLoading();
    }
  };

  const handleChangeToSignInForm = () => {
    toast.closeAll();
    reset({ email: '' });
    clearErrors();
    onChangeToSignInForm();

    if (enableRecoveryPassword) setEnableRecoveryPassword(false);
  };

  const handleNavigationToRecoveryPasswordWebSite = () => {
    Linking.openURL(
      `https://chatyup-website.vercel.app/recovery-password/${userIdRef.current}`,
    );
  };

  return (
    <Flex>
      <TextField.Root isInvalid={!!errors.email} mb="32px">
        <TextField.Label>E-mail</TextField.Label>
        <TextField.Input
          control={control}
          name="email"
          keyboardType="email-address"
          placeholder="Digite seu e-mail"
          onEndEditing={handleSubmit(onSubmit)}
        />
        {!!errors.email && <TextField.Error>{errors.email.message}</TextField.Error>}
      </TextField.Root>
      <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
        Enviar
      </Button>
      <Flex align="center" mt="24px">
        <Link
          onPress={handleChangeToSignInForm}
          _text={{
            color: 'violet.800',
            fontSize: '14px',
            fontWeight: 'medium',
          }}>
          Acessar minha conta
        </Link>
      </Flex>
      {enableRecoveryPassword && (
        <Flex align="center" mt="24px">
          <Link
            onPress={handleNavigationToRecoveryPasswordWebSite}
            _text={{
              color: 'violet.800',
              fontSize: '14px',
              fontWeight: 'medium',
            }}>
            Alterar minha senha
          </Link>
        </Flex>
      )}
    </Flex>
  );
};
