import { Text, Button as NBButton } from 'native-base';

import type { FC, PropsWithChildren } from 'react';
import type { IButtonProps } from 'native-base';

type ButtonProps = Omit<IButtonProps, 'children'>;

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  variant,
  ...props
}) => {
  const isGhostButton = variant === 'ghost';

  return (
    <NBButton
      w="full"
      h="46px"
      bgColor={isGhostButton ? 'transparent' : 'violet.800'}
      p="0"
      _pressed={{
        opacity: 0.6,
      }}
      {...props}>
      <Text
        color={isGhostButton ? 'violet.800' : 'gray.50'}
        fontSize="16px"
        fontWeight="medium">
        {children}
      </Text>
    </NBButton>
  );
};
