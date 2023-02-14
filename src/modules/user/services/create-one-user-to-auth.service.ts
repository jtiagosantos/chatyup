import auth from '@react-native-firebase/auth';

type CreateOneUserToAuthInput = {
  email: string;
  password: string;
};

export class CreateOneUserToAuthService {
  public static async execute(input: CreateOneUserToAuthInput) {
    const { email, password } = input;
    await auth().createUserWithEmailAndPassword(email, password);
  }
}
