import auth from '@react-native-firebase/auth';

export class UpdateOneUserToAuthService {
  public static async execute(email: string) {
    return auth().currentUser?.updateEmail(email);
  }
}
