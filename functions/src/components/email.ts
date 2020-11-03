import * as nodemailer from "nodemailer";
import { AuthenticationTypeOAuth2 } from "nodemailer/lib/smtp-connection";
import { GMAIL } from "../env";
// async..await is not allowed in global scope, must use a wrapper

export async function sendMail({
  subject = "",
  text = "",
  html,
}: {
  subject: string;
  text: string;
  html?: string;
}): Promise<nodemailer.SentMessageInfo | undefined> {
  try {
    const auth: AuthenticationTypeOAuth2 = {
      type: "OAuth2",
      expires: 3600,
      user: GMAIL.user,
      clientId: GMAIL.clientid,
      clientSecret: GMAIL.clientsecret,
      refreshToken: GMAIL.refreshtoken,
      accessToken: GMAIL.accesstoken,
    };
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth,
    });
    const info = await transporter.sendMail({
      from: {
        name: "자동메일",
        address: "swain@parti.coop",
      },
      to: ["advocacy@sc.or.kr"],
      // to: ["swain@parti.coop"],
      subject,
      text,
      html,
    });
    transporter.close();
    return info;
  } catch (error) {
    console.error(error.message);
  }
  return undefined;
}
