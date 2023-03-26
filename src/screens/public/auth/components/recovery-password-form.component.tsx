import { Link, Flex, useToast } from 'native-base';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { TextField, Button } from '../../../../common/components';

import { useUser } from '../../../../common/hooks/use-user.hook';
import { useLoading } from '../../../../common/hooks/use-loding.hook';

import type { FC } from 'react';
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
  const { recoveryPassword } = useUser();
  const { isLoading, enableLoading, disableLoading } = useLoading();

  const onSubmit: SubmitHandler<RecoveryPasswordFormData> = async ({ email }) => {
    try {
      enableLoading();

      await recoveryPassword(email);

      toast.closeAll();
      toast.show({
        title: 'Solicitação enviada',
        bgColor: 'success.900',
        mb: -5,
      });
      disableLoading();
    } catch (error: any) {
      if (error?.code) {
        const { code } = error;

        /* if (code === EFirebaseErrors.USER_NOT_FOUND) {
          setError('email', { message: 'E-mail não cadastrado' });
        } */
      }
    } finally {
      disableLoading();
    }
  };

  const handleChangeToSignInForm = () => {
    toast.closeAll();
    reset({ email: '' });
    clearErrors();
    onChangeToSignInForm();
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
    </Flex>
  );
};
