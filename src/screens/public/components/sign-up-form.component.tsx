import { useState } from 'react';
import { Link, Flex } from 'native-base';

import { TextField, Button } from '../../../common/components';

import type { FC } from 'react';

type SignUpFormProps = {
  onChangeToSignInForm: () => void;
};

export const SignUpForm: FC<SignUpFormProps> = ({ onChangeToSignInForm }) => {
  const [formStep, setFormStep] = useState<1 | 2>(1);

  const isFirstStep = formStep === 1;
  const isSecondStep = formStep === 2;

  const handleNextFormStep = () => {
    setFormStep(2);
  };

  const handlePreviousFormStep = () => {
    setFormStep(1);
  };

  return (
    <Flex>
      {isFirstStep && (
        <>
          <TextField.Root>
            <TextField.Label>E-mail</TextField.Label>
            <TextField.Input placeholder="Digite seu e-mail" />
          </TextField.Root>
          <TextField.Root mt="16px" mb="32px">
            <TextField.Label>Senha</TextField.Label>
            <TextField.Input placeholder="Digite sua senha" />
          </TextField.Root>
          <Button onPress={handleNextFormStep}>Continuar</Button>
          <Flex align="center" mt="24px">
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
      )}
      {isSecondStep && (
        <>
          <TextField.Root>
            <TextField.Label>Primeiro nome</TextField.Label>
            <TextField.Input placeholder="Digite seu primeiro nome" />
          </TextField.Root>
          <TextField.Root mt="16px" mb="32px">
            <TextField.Label>Nome de usuário</TextField.Label>
            <TextField.Input placeholder="Digite seu nome de usuário" />
          </TextField.Root>
          <Button>Criar conta</Button>
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
