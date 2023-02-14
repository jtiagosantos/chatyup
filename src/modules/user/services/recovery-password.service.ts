import auth from '@react-native-firebase/auth';

export class RecoveryPasswordService {
  public static async execute(email: string) {
    await auth().sendPasswordResetEmail(email);
  }
}
