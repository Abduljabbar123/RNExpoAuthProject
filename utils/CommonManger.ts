import { Dimensions } from "react-native";

export default class CommonDataManager {
  static shared: CommonDataManager;
  selector: any = null;
  dispatch: any = null;
  isFoldableDevice: boolean = Dimensions.get("window").width > 500;

  static getSharedInstance() {
    if (CommonDataManager.shared == null) {
      CommonDataManager.shared = new CommonDataManager();
    }
    return CommonDataManager.shared;
  }

  setReduxReducer = (select: any, dispatc: any) => {
    this.selector = select;
    this.dispatch = dispatc;
  };

  emailValidator = (email: any) => {
    let validEmailRegex = /^[\w.+/-]{1,25}@[\w-]{1,24}\.\w{2,10}$/i;
    return validEmailRegex.test(email);
  };

  isEmailValid = (email: string) => {
    if (!email) {
      return false;
    }
    let validEmailRegex = /^[\w.+/-]{1,25}@[\w-]{1,24}\.\w{2,10}$/i;
    return validEmailRegex.test(email.trim());
  };

  isPasswordValid = (password: string) => {
    return password?.trim()?.length >= 8;
  };

  focusNextField = (inputRef: any) => {
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  };

  isConPasswordValid = (password: string, confirmPassword: string) => {
    const trimmedPassword = password.trim();
    return trimmedPassword.length >= 8 && trimmedPassword === confirmPassword.trim();
  };

  serializeUser = (user: any) => ({
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    lastLoginAt: user.metadata?.lastSignInTime || null,
    creationTime: user.metadata?.creationTime || null,
    providerData: user.providerData.map(
      ({ providerId, uid, displayName, email, photoURL }: any) => ({
        providerId,
        uid,
        displayName: displayName || null,
        email: email || null,
        photoURL: photoURL || null,
      })
    ),
  });
}
