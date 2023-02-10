import { forwardRef, ForwardRefRenderFunction } from 'react';
import { TextInput } from 'react-native';
import { Text, Input, FormControl } from 'native-base';
import { Controller } from 'react-hook-form';

import type { FC, PropsWithChildren } from 'react';
import type { IFormControlProps, ITextProps, IInputProps } from 'native-base';
import type { Control } from 'react-hook-form';

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

type TextFieldInputProps = IInputProps & {
  control: Control<any>;
  name: string;
};

const TextFieldInputComponent: ForwardRefRenderFunction<
  typeof TextInput,
  TextFieldInputProps
> = ({ control, name, ...props }, ref) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Input
          value={value}
          onChangeText={onChange}
          ref={ref as any}
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
      )}
    />
  );
};

const TextFieldInput = forwardRef(TextFieldInputComponent);

const TextFieldError: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <FormControl.ErrorMessage>{children}</FormControl.ErrorMessage>;
};

export const TextField = {
  Root: TextFieldRoot,
  Label: TextFieldLabel,
  Input: TextFieldInput,
  Error: TextFieldError,
};
