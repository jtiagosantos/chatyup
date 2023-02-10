import { Link, Flex } from 'native-base';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { TextField, Button } from '../../../common/components';

import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

const recoveryPasswordFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'E-mail inválido' })
    .min(1, { message: 'Campo obrigatório' }),
});

type RecoveryPasswordFormData = z.infer<typeof recoveryPasswordFormSchema>;

type RecoveryPasswordFormProps = {
  onChangeToSignInForm: () => void;
};

export const RecoveryPasswordForm: FC<RecoveryPasswordFormProps> = ({
  onChangeToSignInForm,
}) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<RecoveryPasswordFormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(recoveryPasswordFormSchema),
  });

  const onSubmit: SubmitHandler<RecoveryPasswordFormData> = ({ email }) => {
    console.log(email);
  };

  const handleChangeToSignInForm = () => {
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
      <Button onPress={handleSubmit(onSubmit)}>Enviar</Button>
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
