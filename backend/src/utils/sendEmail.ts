import resend from "../config/resend";
import { EMAIL_SENDER, NODE_ENV } from "../constants/env";

type Params = {
    to: string;
    subject: string;
    text: string;
    html: string;
}

const getFromEmail = () => 
    NODE_ENV === "mobile_postman" ? "onboarding@resend.dev" : EMAIL_SENDER;

const getToEmail = (to: string) => NODE_ENV === "mobile_postman" ? "delivered@resend.dev" : to;

    export const sendEmail =async ({ to, subject, text, html}: Params) => 
      await resend.emails.send({
        from: getFromEmail(),
        to: getToEmail(to),
        subject,
        text,
        html,
      })
