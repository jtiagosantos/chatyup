import { Link, Flex } from 'native-base';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { TextField, Button } from '../../../common/components';

import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

const signFormSchema = z.object({
  email: z.string().min(1, { message: 'Campo obrigatório' }),
  password: z.string().min(1, { message: 'Campo obrigatório' }),
});

type SignInFormData = z.infer<typeof signFormSchema>;

type SignInFormProps = {
  onChangeToSignUpForm: () => void;
};

export const SignInForm: FC<SignInFormProps> = ({ onChangeToSignUpForm }) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signFormSchema),
  });

  const onSubmit: SubmitHandler<SignInFormData> = ({ email, password }) => {
    console.log(email, password);
  };

  const handleChangeToSignUpForm = () => {
    clearErrors();
    onChangeToSignUpForm();
  };

  return (
    <Flex>
      <TextField.Root isInvalid={!!errors.email}>
        <TextField.Label>E-mail</TextField.Label>
        <TextField.Input control={control} name="email" placeholder="Digite seu e-mail" />
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
      <Button onPress={handleSubmit(onSubmit)}>Entrar</Button>
      <Flex align="center" mt="24px">
        <Link
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
