import { auth } from "../config/firebase";
import { DOMAIN } from "./options";

const currentUser = auth.currentUser;

export async function sendVerificationEmail() {
  const actionCodeSettings = {
    url: `${DOMAIN}/verification`,
    handleCodeInApp: true,
  };
  await currentUser
    ?.sendEmailVerification(actionCodeSettings)
    .catch(err => console.warn("Verification email error", err));
}

export function verificationGuard(component: JSX.Element[]) {
  const currentUser = auth.currentUser;
  if (currentUser?.isAnonymous || currentUser?.emailVerified) {
    return component[0];
  } else {
    return component[1];
  }
}
