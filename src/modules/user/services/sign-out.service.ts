import auth from '@react-native-firebase/auth';

export class SignOutService {
  public static async execute() {
    return auth().signOut();
  }
}
