import { Flex, Button, Image } from 'native-base';
import { NotePencil } from 'phosphor-react-native';

import UserProfileImage from '../../../../common/assets/user-profile.svg';

import type { FC } from 'react';
import type { IFlexProps, IButtonProps } from 'native-base';

const AvatarRoot: FC<IFlexProps> = ({ children, ...props }) => {
  return (
    <Flex
      align="center"
      justify="center"
      borderWidth="2px"
      borderColor="violet.800"
      p="4px"
      borderRadius="full"
      position="relative"
      {...props}>
      {children}
    </Flex>
  );
};

const AvatarEditButton: FC<IButtonProps> = (props) => {
  return (
    <Button
      p={0}
      w="26px"
      h="26px"
      bgColor="violet.800"
      borderRadius="5px"
      position="absolute"
      top={0}
      right={0}
      zIndex={3}
      _pressed={{
        opacity: 0.6,
      }}
      {...props}>
      <NotePencil size={20} color="#fafafa" />
    </Button>
  );
};

type AvatarImageProps = {
  uri: string;
};

const AvatarImage: FC<AvatarImageProps> = ({ uri }) => {
  if (!uri) return <UserProfileImage />;

  return (
    <Image source={{ uri }} width="full" height="full" borderRadius="full" alt={uri} />
  );
};

export const Avatar = {
  Root: AvatarRoot,
  EditButton: AvatarEditButton,
  Image: AvatarImage,
};
