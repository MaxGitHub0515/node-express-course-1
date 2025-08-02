

// newsettler logic

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODE_MAILER_EMAIL_USER,
        pass: process.env.NODE_MAILER_EMAIL_PASS
    }
})

export default async function sendEmail(req, res) {
    const {username} = req.body;
      if (!username) {
        return res.status(400).json({ success: false, message: "Missing username in nodemailer" });
  }

const mailOptions = {
    from: process.env.NODE_MAILER_EMAIL_USER,
    to: process.env.NODE_MAILER_EMAIL_USER_TO,
    subject: `${username} Successfully LoggedIn to portfolio-hosted Service !`,
    html: `
        <div style="max-width: 600px; margin: auto; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f9f9f9; padding: 30px; border-radius: 10px; color: #333;">
            <div style="text-align: center; margin-bottom: 20px;">
            <div role="heading" aria-level="1" style="color: #4CAF50; font-size: 24px; font-weight: bold; margin: 0;">
                Login Successful
            </div>
            <p style="font-size: 16px; margin: 10px 0 0;">Welcome back to your portfolio service</p>
            </div>

            <div style="padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
            <p style="font-size: 15px; line-height: 1.6;">
                Hi there,<br><br>
                We're letting you know that your account was just accessed. If this was you, there's nothing else you need to do.
            </p>

            <a href="https://www.illustrates.info/auth/login" style="display: inline-block; margin: 20px 0; padding: 12px 24px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Go to Dashboard
            </a>

            <p style="font-size: 13px; color: #888;">If you did not log in, please secure your account immediately.</p>
            </div>

            <footer style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} Your Portfolio Inc. All rights reserved.
            </footer>
        </div>`
};

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return res.status(200).json({ success: true, message: "Email sent successfully." });
    } catch (error) {
        console.error("Error sending email:", error);
         return res.status(500).json({ success: false, message: "Email sending failed.", error: error.message });
    }
}