import { useEffect } from 'react';
import { Flex, Text } from 'native-base';
import { MotiView, useAnimationState } from 'moti';

import { useSplash } from '../../../common/hooks/use-splash.hook';

import ChatRoomIcon from '../../../common/assets/chat-room.svg';

export const SplashScreen = () => {
  const { setAppToReady } = useSplash();

  const titleAnimationState = useAnimationState({
    from: {
      opacity: 0,
      marginTop: -400,
    },
    to: {
      opacity: 1,
      marginTop: 0,
    },
  });
  const iconAnimationState = useAnimationState({
    from: {
      opacity: 0,
      marginBottom: -400,
    },
    to: {
      opacity: 1,
      marginBottom: 0,
    },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAppToReady();
    }, 2900);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Flex flex={1} flexDir="row" align="center" justify="center" bgColor="gray.900">
      <MotiView
        state={titleAnimationState}
        transition={{
          type: 'spring',
          delay: 400,
          damping: 8,
        }}>
        <Text color="gray.50" fontSize="24px" fontWeight="extrabold" mr="8px">
          ChatYup
        </Text>
      </MotiView>
      <MotiView
        state={iconAnimationState}
        transition={{
          type: 'spring',
          delay: 400,
          damping: 8,
        }}>
        <ChatRoomIcon />
      </MotiView>
    </Flex>
  );
};
