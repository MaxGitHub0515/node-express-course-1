
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODE_MAILER_EMAIL_USER,
        pass: process.env.NODE_MAILER_EMAIL_PASS
    }
})


const mailOptions = {
    from: process.env.NODE_MAILER_EMAIL_USER,
    to: process.env.NODE_MAILER_EMAIL_USER_TO,
    subject: "Successfully LoggedIn to portfolio-hosted Service !"
}


// add the follwoing func:
    
/* and add that a user is succefuly signed up 
add logout inside settings!!!
add loading animation for ui pls - partially done - 404 misbehaving - how to fix - add createVrowserRouter()
Show a loading spinner while the app navigates to a new route.
Hide the spinner once the new component has loaded/rendered.
Sends an email notification to your Gmail whenever a user logs in or logs out.
Stores login/logout records in your backend with details like timestamp and status.
Fetches these records and shows them as logs in your UI.
model 
nodemailer 
controller 
route like api/v1/logs  and populate the nfetch it from frontend
*/