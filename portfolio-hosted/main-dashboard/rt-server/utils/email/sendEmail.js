

// Global transporter
// Adandoned the idea of using nodemailer alone - constant failure blocked 
// apparently by Render or even cloudlare - adding Resend Service - http
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const transporter = {
    sendMail: async (options) => {
        return await resend.emails.send({
            from: 'Portfolio <contact@illustrates.dev>',
            //contoller data
            to: options.to,
            subject: options.subject,
            text:options.text,
            reply_to: options.replyTo
        })
    }

};

