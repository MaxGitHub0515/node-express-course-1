

// Global transporter

import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    pool: true, 
    host: 'smtp.gmail.com',
    // port: 465,
    port: 587, // cloud standard
    secure: false, //crucial for port 587 - secure
    maxConnections: 1,
    rateLimit: 1, 
    rateDelta: 2000, // 1 email per 2 sec in a qeue
    auth: {
        user: process.env.NODE_MAILER_EMAIL_USER,
        pass: process.env.NODE_MAILER_EMAIL_PASS
    },
    family: 4, // force the IPV4 instead of possible failure of IPV6
    tls: {
        rejectUnauthorized: false 
    },
    connectionTimeout: 30000,
    logger: true,
    debug: true
});

