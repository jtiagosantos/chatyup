import auth from '@react-native-firebase/auth';

type SignInInput = {
  email: string;
  password: string;
};

export class SignInService {
  public static async execute(input: SignInInput) {
    const { email, password } = input;
    await auth().signInWithEmailAndPassword(email, password);
  }
}
