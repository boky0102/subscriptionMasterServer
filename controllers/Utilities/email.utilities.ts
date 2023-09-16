import nodemailer from 'nodemailer';
import 'dotenv/config'

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

export async function sendEmailTo(userEmail: string){
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: userEmail,
        subject: "Subscription notification",
        text: "Sent my first Node email"
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err)
        } else {
            console.log('Email sent');
        }
    })
}