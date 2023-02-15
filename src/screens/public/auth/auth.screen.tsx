import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, Text, Flex } from 'native-base';
import { useAnimationState, MotiView } from 'moti';

import { SignInForm } from './components/sign-in-form.component';
import { SignUpForm } from './components/sign-up-form.component';
import { RecoveryPasswordForm } from './components/recovery-password-form.component';

import { useDimensions } from '../../../common/hooks/use-dimensions.hook';

import Logo from '../../../common/assets/logo.svg';

type SelectedForm = 'signIn' | 'signUp' | 'recoveryPassword';

export const AuthScreen = () => {
  const { height, width } = useDimensions();
  const [selectedForm, setSelectedForm] = useState<SelectedForm>('signIn');

  const isSignInFormSelected = selectedForm === 'signIn';
  const isSignUpFormSelected = selectedForm === 'signUp';
  const isRecoveryPasswordFormSelected = selectedForm === 'recoveryPassword';

  const signInFormAnimationState = useAnimationState({
    from: {
      translateX: 0,
      opacity: 1,
    },
    toSignUp: {
      translateX: -width,
      opacity: 0,
    },
    toRecoveryPassword: {
      translateX: width,
      opacity: 0,
    },
  });
  const signUpFormAnimationState = useAnimationState({
    from: {
      translateX: width,
      opacity: 0,
    },
    to: {
      translateX: 0,
      opacity: 1,
    },
  });
  const recoveryPasswordFormAnimationState = useAnimationState({
    from: {
      translateX: -width,
      opacity: 0,
    },
    to: {
      translateX: 0,
      opacity: 1,
    },
  });

  const handleChangeToSignUpForm = () => {
    signInFormAnimationState.transitionTo('toSignUp');
    signUpFormAnimationState.transitionTo('to');
    setSelectedForm('signUp');
  };

  const handleChangeToSignInForm = (origin: 'signUp' | 'recoveryPassword') => {
    if (origin === 'signUp') {
      signUpFormAnimationState.transitionTo('from');
    }
    if (origin === 'recoveryPassword') {
      recoveryPasswordFormAnimationState.transitionTo('from');
    }
    signInFormAnimationState.transitionTo('from');
    setSelectedForm('signIn');
  };

  const handleChangeToRecoveryPasswordForm = () => {
    signInFormAnimationState.transitionTo('toRecoveryPassword');
    recoveryPasswordFormAnimationState.transitionTo('to');
    setSelectedForm('recoveryPassword');
  };

  useEffect(() => {
    signInFormAnimationState.transitionTo('from');
    signUpFormAnimationState.transitionTo('from');
    recoveryPasswordFormAnimationState.transitionTo('from');
  }, []);

  return (
    <Box h={`${height}px`} flex={1} p="24px" pt="32px" pb={0} bgColor="gray.900">
      <Box maxW="250px">
        <Logo />
        <Text color="gray.500" fontSize="16px">
          Converse com os seus amigos de forma simples e rápida
        </Text>
      </Box>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Flex minH="350px" position="relative" mt="88px" mb="24px">
          <MotiView
            transition={{
              type: 'timing',
              duration: 1000,
            }}
            state={signInFormAnimationState}
            style={{
              width: '100%',
              position: isSignInFormSelected ? 'relative' : 'absolute',
            }}>
            <SignInForm
              onChangeToSignUpForm={handleChangeToSignUpForm}
              onChangeToRecoveryPasswordForm={handleChangeToRecoveryPasswordForm}
            />
          </MotiView>
          <MotiView
            transition={{
              type: 'timing',
              duration: 1000,
            }}
            state={signUpFormAnimationState}
            style={{
              width: '100%',
              position: isSignUpFormSelected ? 'relative' : 'absolute',
            }}>
            <SignUpForm onChangeToSignInForm={() => handleChangeToSignInForm('signUp')} />
          </MotiView>
          <MotiView
            transition={{
              type: 'timing',
              duration: 1000,
            }}
            state={recoveryPasswordFormAnimationState}
            style={{
              width: '100%',
              position: isRecoveryPasswordFormSelected ? 'relative' : 'absolute',
            }}>
            <RecoveryPasswordForm
              onChangeToSignInForm={() => handleChangeToSignInForm('recoveryPassword')}
            />
          </MotiView>
        </Flex>
      </ScrollView>
    </Box>
  );
};
