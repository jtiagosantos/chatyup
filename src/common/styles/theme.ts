import { extendTheme } from 'native-base';

export const theme = extendTheme({
  components: {
    Text: {
      baseStyle: () => ({
        fontFamily: 'Poppins_400Regular',
      }),
    },
  },
});
