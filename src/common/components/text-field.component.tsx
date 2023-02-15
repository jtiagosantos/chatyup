import { forwardRef, ForwardRefRenderFunction, useReducer } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { Text, Input, FormControl, Box } from 'native-base';
import { Eye, EyeSlash } from 'phosphor-react-native';
import { Controller } from 'react-hook-form';

import type { FC, PropsWithChildren } from 'react';
import type { IFormControlProps, ITextProps, IInputProps, Theme } from 'native-base';
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
> = ({ control, name, type, ...props }, ref) => {
  const [isPasswordVisible, togglePasswordVisible] = useReducer((state) => !state, false);

  const isPasswordField = type === 'password';
  const fieldType = isPasswordVisible ? 'text' : 'password';

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Box w="full" position="relative">
          <Input
            value={value}
            onChangeText={onChange}
            ref={ref as any}
            type={fieldType}
            w="full"
            bgColor="gray.800"
            borderColor="transparent"
            fontSize="16px"
            color="white"
            borderWidth="2px"
            borderRadius="5px"
            pr={isPasswordField ? '50px' : '12px'}
            _focus={{
              borderColor: 'violet.800',
            }}
            _invalid={{
              borderColor: 'red.500',
            }}
            placeholderTextColor="gray.500"
            {...props}
          />
          {isPasswordField && (
            <Box position="absolute" right="16px" top="25%">
              <TouchableOpacity activeOpacity={0.6} onPress={togglePasswordVisible}>
                {isPasswordVisible ? (
                  <EyeSlash size={22} color="#a1a1aa" />
                ) : (
                  <Eye size={22} color="#a1a1aa" />
                )}
              </TouchableOpacity>
            </Box>
          )}
        </Box>
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
