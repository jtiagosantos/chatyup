import { Link, Flex } from 'native-base';

import { TextField, Button } from '../../../common/components';

import type { FC } from 'react';

type SignInFormProps = {
  onChangeToSignUpForm: () => void;
};

export const SignInForm: FC<SignInFormProps> = ({ onChangeToSignUpForm }) => {
  return (
    <>
      <TextField.Root>
        <TextField.Label>E-mail</TextField.Label>
        <TextField.Input placeholder="Digite seu e-mail" />
      </TextField.Root>
      <TextField.Root mt="16px" mb="32px">
        <TextField.Label>Senha</TextField.Label>
        <TextField.Input placeholder="Digite sua senha" />
      </TextField.Root>
      <Button>Entrar</Button>
      <Flex align="center" mt="16px">
        <Link
          onPress={onChangeToSignUpForm}
          _text={{
            color: 'violet.800',
            fontSize: '14px',
            fontWeight: 'medium',
          }}>
          Criar uma conta
        </Link>
      </Flex>
    </>
  );
};
