import nodemailer from 'nodemailer';
import 'dotenv/config'

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    },
    from: process.env.EMAIL_USERNAME
});

export interface EmailInterface{
    email: string,
    username: string,
    subscriptionName: string,
    chargeAmount: number
}

export async function sendEmailTo(userEmail: EmailInterface){
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: userEmail.email,
        subject: "Subscription notification",
        text: "Subscription renewal email alert",
        html: getHtmlEmail(userEmail.subscriptionName, userEmail.chargeAmount, userEmail.username)
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err)
        } else {
            console.log('Email sent');
        }
    });
}

function getHtmlEmail(subscriptionName: string, subscriptionAmount: number, user: string): string{
    return(
        `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Subscription alert email</title>
        <style>body{margin:0;padding:0;}.wrapper{width:100%;background-color:#cccccc;table-layout:fixed;padding-bottom:60px;}.table{background-color:#E8DDD6;width:100%;max-width:600px;border-spacing:0;font-family:'Lucida Sans Regular','Lucida Grande','Lucida Sans Unicode',Geneva,Verdana,sans-serif;color:#0E1C36;}.logo{width:180px;max-width:100%;}td{padding:0;}.header{text-align:center;background-color:#FFF3EB;}.footer{background-color:#0E1C36;color:#FFF3EB;text-align:center;height:80px;}.footer-text{
        font-size:15px;}a{text-decoration:none;color:#17BEBB;}.content{padding:20px;}h1{font-size:20px;}span{font-weight:bold;}.amount-text{color:#17BEBB;}
        </style>
        </head>
        <body><center class="wrapper">
        <table class="table"><tr class="header"><td style="padding:20px 60px"> <img class="logo" src="https://imgtr.ee/images/2023/09/17/e4b926c06cb5ba75f7143170a6fcbc5f.png" title="logo-image" alt="logo-image"/>
        </td></tr><tr><td class="content"><h1> Hi ${user} </h1><p class="text">Your subscription <span class="subscription-title">${subscriptionName}</span> will be renewed tommorrow and you will be charged <span class="amount-text">${subscriptionAmount}</span>. Don't forget to cancel subscription if you only wanted to try it out. Have a nice day! </p>
        </td></tr><tr class="footer"><td><p class="footer-text">Manage your subscriptions on our website. Visit <a href="http://localhost:5173/home/" target="subscription">SubscriptionMaster</a></p>
        </td></tr></table></center>
        </body>
        </html>`
    ) 
}