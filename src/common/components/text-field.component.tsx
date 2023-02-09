import { Text, Input, FormControl } from 'native-base';

import type { FC } from 'react';
import type { IFormControlProps, ITextProps, IInputProps } from 'native-base';

const TextFieldRoot: FC<IFormControlProps> = ({ children, ...props }) => {
  return <FormControl {...props}>{children}</FormControl>;
};

const TextFieldLabel: FC<ITextProps> = ({ children, ...props }) => {
  return (
    <FormControl.Label>
      <Text color="gray.300" fontSize="14px" mb="2px" {...props}>
        {children}
      </Text>
    </FormControl.Label>
  );
};

const TextFieldInput: FC<IInputProps> = ({ ...props }) => {
  return (
    <Input
      bgColor="gray.800"
      borderColor="transparent"
      fontSize="16px"
      color="white"
      borderWidth="2px"
      borderRadius="5px"
      _focus={{
        borderColor: 'violet.800',
      }}
      _invalid={{
        borderColor: 'red.500',
      }}
      placeholderTextColor="gray.500"
      {...props}
    />
  );
};

export const TextField = {
  Root: TextFieldRoot,
  Label: TextFieldLabel,
  Input: TextFieldInput,
};
