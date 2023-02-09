import { Text, Button as NBButton } from 'native-base';

import type { FC, PropsWithChildren } from 'react';
import type { IButtonProps } from 'native-base';

type ButtonProps = Omit<IButtonProps, 'children'>;

export const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, ...props }) => {
  return (
    <NBButton
      w="full"
      h="46px"
      bgColor="violet.800"
      _pressed={{
        opacity: 0.6,
      }}
      {...props}>
      <Text color="gray.50" fontSize="16px" fontWeight="medium">
        {children}
      </Text>
    </NBButton>
  );
};
