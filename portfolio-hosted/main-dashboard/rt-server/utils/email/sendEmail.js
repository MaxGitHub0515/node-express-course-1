

// Global transporter

import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    port: 456,
    secure: true, //enable ssl
    auth: {
        user: process.env.NODE_MAILER_EMAIL_USER,
        pass: process.env.NODE_MAILER_EMAIL_PASS
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
});

