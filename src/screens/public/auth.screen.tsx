import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, Text, Flex } from 'native-base';
import { useAnimationState, MotiView } from 'moti';

import { SignInForm } from './components/sign-in-form.component';
import { SignUpForm } from './components/sign-up-form.component';

import { useDimensions } from '../../common/hooks/use-dimensions.hook';

import Logo from '../../common/assets/logo.svg';

export const AuthScreen = () => {
  const { height, width } = useDimensions();
  const [selectedForm, setSelectedForm] = useState<'signIn' | 'signUp'>('signIn');

  const isSignInFormSelected = selectedForm === 'signIn';
  const isSignUpFormSelected = selectedForm === 'signUp';
  const signInFormAnimationState = useAnimationState({
    from: {
      translateX: 0,
      opacity: 1,
    },
    to: {
      translateX: -width,
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

  const handleChangeToSignUpForm = () => {
    signInFormAnimationState.transitionTo('to');
    signUpFormAnimationState.transitionTo('to');
    setSelectedForm('signUp');
  };

  const handleChangeToSignInForm = () => {
    signInFormAnimationState.transitionTo('from');
    signUpFormAnimationState.transitionTo('from');
    setSelectedForm('signIn');
  };

  useEffect(() => {
    signInFormAnimationState.transitionTo('from');
    signUpFormAnimationState.transitionTo('from');
  }, []);

  return (
    <Box h={`${height}px`} flex={1} p="24px" pt="32px" pb={0} bgColor="gray.900">
      <Box maxW="250px">
        <Logo />
        <Text color="gray.400" fontSize="16px" fontWeight="light">
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
              position: isSignUpFormSelected ? 'absolute' : 'relative',
            }}>
            <SignInForm onChangeToSignUpForm={handleChangeToSignUpForm} />
          </MotiView>
          <MotiView
            transition={{
              type: 'timing',
              duration: 1000,
            }}
            state={signUpFormAnimationState}
            style={{
              width: '100%',
              position: isSignInFormSelected ? 'absolute' : 'relative',
            }}>
            <SignUpForm onChangeToSignInForm={handleChangeToSignInForm} />
          </MotiView>
        </Flex>
      </ScrollView>
    </Box>
  );
};
