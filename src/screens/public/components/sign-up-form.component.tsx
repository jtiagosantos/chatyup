import { Link, Flex } from 'native-base';

import { TextField, Button } from '../../../common/components';

import type { FC } from 'react';

type SignUpFormProps = {
  onChangeToSignInForm: () => void;
};

export const SignUpForm: FC<SignUpFormProps> = ({ onChangeToSignInForm }) => {
  return (
    <>
      <TextField.Root>
        <TextField.Label>Primeiro nome</TextField.Label>
        <TextField.Input placeholder="Digite seu primeiro nome" />
      </TextField.Root>
      <TextField.Root mt="16px">
        <TextField.Label>Nome de usuário</TextField.Label>
        <TextField.Input placeholder="Digite seu nome de usuário" />
      </TextField.Root>
      <TextField.Root mt="16px">
        <TextField.Label>E-mail</TextField.Label>
        <TextField.Input placeholder="Digite seu e-mail" />
      </TextField.Root>
      <TextField.Root mt="16px" mb="32px">
        <TextField.Label>Senha</TextField.Label>
        <TextField.Input placeholder="Digite sua senha" />
      </TextField.Root>
      <Button>Criar conta</Button>
      <Flex align="center" mt="16px">
        <Link
          onPress={onChangeToSignInForm}
          _text={{
            color: 'violet.800',
            fontSize: '14px',
            fontWeight: 'medium',
          }}>
          Acessar minha conta
        </Link>
      </Flex>
    </>
  );
};
