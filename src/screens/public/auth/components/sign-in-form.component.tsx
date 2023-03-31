import { Link, Flex, Text } from 'native-base';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { TextField, Button } from '../../../../common/components';

import { useUser } from '../../../../common/hooks/use-user.hook';
import { useLoading } from '../../../../common/hooks/use-loding.hook';

import { EmailNotFoundError } from '../../../../modules/user/errors/email-not-found.error';
import { InvalidPasswordError } from '../../../../modules/user/errors/invalid-password.error';

import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

const signFormSchema = z.object({
  email: z.string().min(1, { message: 'Campo obrigatório' }),
  password: z.string().min(1, { message: 'Campo obrigatório' }),
});

type SignInFormData = z.infer<typeof signFormSchema>;

type SignInFormProps = {
  onChangeToSignUpForm: () => void;
  onChangeToRecoveryPasswordForm: () => void;
};

export const SignInForm: FC<SignInFormProps> = ({
  onChangeToSignUpForm,
  onChangeToRecoveryPasswordForm,
}) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    reset,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signFormSchema),
  });
  const { signIn, saveUserToState, saveUserToStorage } = useUser();
  const { isLoading, enableLoading, disableLoading } = useLoading();

  const onSubmit: SubmitHandler<SignInFormData> = async ({ email, password }) => {
    try {
      enableLoading();
      const user = await signIn({ email, password });

      delete user.password;

      await saveUserToStorage({ ...user });
      saveUserToState({ ...user });

      clearFormFields();
    } catch (error) {
      if (error instanceof EmailNotFoundError) {
        setError('email', { message: error.message });
      }

      if (error instanceof InvalidPasswordError) {
        setError('password', { message: error.message });
      }
    } finally {
      disableLoading();
    }
  };

  const handleChangeToSignUpForm = () => {
    clearErrors();
    clearFormFields();
    onChangeToSignUpForm();
  };

  const handleChangeToRecoveryPasswordForm = () => {
    clearErrors();
    clearFormFields();
    onChangeToRecoveryPasswordForm();
  };

  const clearFormFields = () => {
    reset({
      email: '',
      password: '',
    });
  };

  return (
    <Flex>
      <TextField.Root isInvalid={!!errors.email}>
        <TextField.Label>E-mail</TextField.Label>
        <TextField.Input
          control={control}
          name="email"
          keyboardType="email-address"
          placeholder="Digite seu e-mail"
        />
        {!!errors.email && <TextField.Error>{errors.email.message}</TextField.Error>}
      </TextField.Root>
      <TextField.Root isInvalid={!!errors.password} mt="16px" mb="32px">
        <TextField.Label>Senha</TextField.Label>
        <TextField.Input
          control={control}
          name="password"
          type="password"
          placeholder="Digite sua senha"
          onSubmitEditing={handleSubmit(onSubmit)}
        />
        {!!errors.password && (
          <TextField.Error>{errors.password.message}</TextField.Error>
        )}
      </TextField.Root>
      <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
        <Text fontFamily="Poppins_500Medium">Entrar</Text>
      </Button>
      <Flex align="center" mt="24px">
        <Link
          onPress={handleChangeToRecoveryPasswordForm}
          _text={{
            color: 'violet.800',
            fontSize: '14px',
            fontFamily: 'Poppins_500Medium',
          }}>
          Esqueci a senha
        </Link>
      </Flex>
      <Flex align="center" mt="16px">
        <Link
          onPress={handleChangeToSignUpForm}
          _text={{
            color: 'violet.800',
            fontSize: '14px',
            fontFamily: 'Poppins_500Medium',
          }}>
          Criar uma conta
        </Link>
      </Flex>
    </Flex>
  );
};
