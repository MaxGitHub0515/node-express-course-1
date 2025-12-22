
import { transporter } from "../utils/email/sendEmail.js";
import schemaJoi from "../utils/validators/contact-validator.js"
import BadRequestError from "../errors/bad-request.js";
import { StatusCodes } from "http-status-codes";
// Contact Page Mailer

export default async function sendEmailContact(req, res) {
    // to validate and sanatize we use a bit smarter way to do so
    // const {email, subject, message } = req.body;
    console.log("USER:", process.env.NODE_MAILER_EMAIL_USER);
    console.log("PASS EXISTS:", !!process.env.NODE_MAILER_EMAIL_PASS);
    console.log("TO_ADDRESS:", process.env.NODE_MAILER_EMAIL_USER_TO);
    
    const {error, value } = schemaJoi.validate(req.body);
    if (error) {
        // Pass the specific Joi error to your middleware
        throw new BadRequestError(error.details[0].message);
    }
    const {email, subject, message} = value;

    const mailOptions = {
      from: process.env.NODE_MAILER_EMAIL_USER,
      to: process.env.NODE_MAILER_EMAIL_USER_TO,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Message from ${email}:\n\n${message}`
    }
    try {
      await transporter.sendMail(mailOptions);
      
      return res.status(StatusCodes.OK).json({
        status: 'success',
        msg: "Email was sent Successfuly"
      })
    } catch (error) {
      console.error("Nodemailer Error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: error.message,
      stack: error.stack
      
    });
       
    }

}

