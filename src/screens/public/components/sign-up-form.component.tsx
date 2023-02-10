import { useState, useEffect } from 'react';
import { Link, Flex } from 'native-base';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { TextField, Button } from '../../../common/components';

import type { FC } from 'react';

const signUpFirstStepFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .email({ message: 'E-mail inválido' })
    .trim(),
  password: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .min(6, { message: 'Mínimo de 6 caracteres' })
    .trim(),
});

const signUpSecondStepFormSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/, { message: 'Nome inválido' })
    .trim(),
  username: z.string().min(1, { message: 'Campo obrigatório' }).trim(),
});

type SignUpFormData = z.infer<typeof signUpFirstStepFormSchema> &
  z.infer<typeof signUpSecondStepFormSchema>;

type SignUpFormProps = {
  onChangeToSignInForm: () => void;
};

export const SignUpForm: FC<SignUpFormProps> = ({ onChangeToSignInForm }) => {
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const isFirstStep = formStep === 1;
  const isSecondStep = formStep === 2;
  const resolver = isFirstStep ? signUpFirstStepFormSchema : signUpSecondStepFormSchema;

  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
      first_name: '',
      username: '',
    },
    resolver: zodResolver(resolver),
  });

  const handleNextFormStep = () => {
    setFormStep(2);
  };

  const handlePreviousFormStep = () => {
    setFormStep(1);
  };

  const onSubmit = () => {
    if (isFirstStep) {
      handleNextFormStep();
      return;
    }

    console.log(getValues());
  };

  const handleChangeToSignInForm = () => {
    clearErrors();
    onChangeToSignInForm();
  };

  useEffect(() => {
    reset((formValues) => ({ ...formValues }), { keepValues: true, keepErrors: true });
  }, [formStep]);

  return (
    <Flex>
      {isFirstStep && (
        <>
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
          <Button onPress={handleSubmit(onSubmit)}>Continuar</Button>
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
        </>
      )}
      {isSecondStep && (
        <>
          <TextField.Root isInvalid={!!errors.first_name}>
            <TextField.Label>Primeiro nome</TextField.Label>
            <TextField.Input
              control={control}
              name="first_name"
              placeholder="Digite seu primeiro nome"
            />
            {!!errors.first_name && (
              <TextField.Error>{errors.first_name.message}</TextField.Error>
            )}
          </TextField.Root>
          <TextField.Root isInvalid={!!errors.username} mt="16px" mb="32px">
            <TextField.Label>Nome de usuário</TextField.Label>
            <TextField.Input
              control={control}
              name="username"
              placeholder="Digite seu nome de usuário"
            />
            {!!errors.username && (
              <TextField.Error>{errors.username.message}</TextField.Error>
            )}
          </TextField.Root>
          <Button onPress={handleSubmit(onSubmit)}>Criar conta</Button>
          <Flex align="center" mt="24px">
            <Link
              onPress={handlePreviousFormStep}
              _text={{
                color: 'violet.800',
                fontSize: '14px',
                fontWeight: 'medium',
              }}>
              Voltar para a etapa anterior
            </Link>
          </Flex>
        </>
      )}
    </Flex>
  );
};
