import bcrypt from 'react-native-bcrypt';
import isaac from 'isaac';

bcrypt.setRandomFallback((length: number) => {
  const buf = new Uint8Array(length);

  return buf.map(() => Math.floor(isaac.random() * 256)) as unknown as number[];
});
