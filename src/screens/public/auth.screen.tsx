import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, Text } from 'native-base';

import { SignInForm } from './components/sign-in-form.component';
import { SignUpForm } from './components/sign-up-form.component';

import { useDimensions } from '../../common/hooks/use-dimensions.hook';

import Logo from '../../common/assets/logo.svg';

export const AuthScreen = () => {
  const { height } = useDimensions();
  const [selectedForm, setSelectedForm] = useState<'signIn' | 'signUp'>('signIn');

  return (
    <Box h={`${height}px`} flex={1} p="24px" pt="32px" pb={0} bgColor="gray.900">
      <Box maxW="250px">
        <Logo />
        <Text color="gray.400" fontSize="16px" fontWeight="light">
          Converse com os seus amigos de forma simples e rápida{' '}
        </Text>
      </Box>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box mt="80px" mb="24px">
          {selectedForm === 'signIn' ? (
            <SignInForm onChangeToSignUpForm={() => setSelectedForm('signUp')} />
          ) : (
            <SignUpForm onChangeToSignInForm={() => setSelectedForm('signIn')} />
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};
