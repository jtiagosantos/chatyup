import { Link, Flex } from 'native-base';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { SignInService } from '../../../modules/user/services/sign-in.service';
import { FindOneUserService } from '../../../modules/user/services/find-one-user.service';

import { TextField, Button } from '../../../common/components';

import { useLoading } from '../../../common/hooks/use-loding.hook';

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
  const { isLoading, enableLoading, disableLoading } = useLoading();

  const onSubmit: SubmitHandler<SignInFormData> = async ({ email, password }) => {
    try {
      enableLoading();
      await SignInService.execute({ email, password });
      const user = await FindOneUserService.execute({ email });
      clearFormFields();
      console.log(user);
    } catch (error: any) {
      if (error?.code) {
        const { code } = error;

        if (code === 'auth/user-not-found') {
          setError('email', { message: 'E-mail não cadastrado' });
        } else if (code === 'auth/wrong-password') {
          setError('password', { message: 'Senha inválida' });
        }
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
          placeholder="Digite sua senha"
        />
        {!!errors.password && (
          <TextField.Error>{errors.password.message}</TextField.Error>
        )}
      </TextField.Root>
      <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
        Entrar
      </Button>
      <Flex align="center" mt="24px">
        <Link
          onPress={handleChangeToRecoveryPasswordForm}
          _text={{
            color: 'violet.800',
            fontSize: '14px',
            fontWeight: 'medium',
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
            fontWeight: 'medium',
          }}>
          Criar uma conta
        </Link>
      </Flex>
    </Flex>
  );
};
