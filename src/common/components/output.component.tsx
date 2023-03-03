import { Box, Flex, Text, Button, useTheme, useToast } from 'native-base';
import { CopySimple } from 'phosphor-react-native';

import { copyToClipboard } from '../utils/copy-to-clipboard.util';

import type { FC, PropsWithChildren } from 'react';
import type { IBoxProps, ITextProps } from 'native-base';

const OutputRoot: FC<IBoxProps> = ({ children, ...props }) => {
  return <Box {...props}>{children}</Box>;
};

const OutputLabel: FC<ITextProps> = ({ children, ...props }) => {
  return (
    <Text color="gray.400" fontSize="14px" mb="6px" {...props}>
      {children}
    </Text>
  );
};

type OutputValueProps = {
  enableCopy?: boolean;
  successTextWhenCopying?: string;
};

const OutputValue: FC<PropsWithChildren<OutputValueProps>> = ({
  children,
  enableCopy = false,
  successTextWhenCopying = '',
}) => {
  const { colors } = useTheme();
  const toast = useToast();

  const handleCopyTextToClipboard = async () => {
    const text = children as string;
    await copyToClipboard(text);

    toast.closeAll();
    toast.show({
      title: successTextWhenCopying,
      bgColor: 'success.900',
      duration: 2000,
      mb: -5,
    });
  };

  return (
    <Flex
      flexDir="row"
      align="center"
      justify="space-between"
      h="40px"
      bgColor="gray.700"
      borderRadius="5px">
      <Text color="gray.400" fontSize="14px" ml="12px">
        {children}
      </Text>
      {enableCopy && (
        <Button
          w="44px"
          h="40px"
          bgColor="violet.800"
          borderTopLeftRadius="0"
          borderBottomLeftRadius="0"
          _pressed={{
            opacity: 0.6,
          }}
          onPress={handleCopyTextToClipboard}>
          <CopySimple size={22} color={colors.white} />
        </Button>
      )}
    </Flex>
  );
};

export const Output = {
  Root: OutputRoot,
  Label: OutputLabel,
  Value: OutputValue,
};
