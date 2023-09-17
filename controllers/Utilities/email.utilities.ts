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
        `<!DOCTYPE html>
        <!--[if lt IE 7]>
        <html class="no-js lt-ie9 lt-ie8 lt-ie7">
        <![endif]-->
        <!--[if IE 7]>
        <html class="no-js lt-ie9 lt-ie8">
        <![endif]-->
        <!--[if IE 8]>
        <html class="no-js lt-ie9">
        <![endif]-->
        <!--[if gt IE 8]>
        <html class="no-js">
        <![endif]-->
        <html>
        <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>:root{font-size:1vw;color:#0E1C36;}body{margin:0;padding:0;}.main-div{width:100%;font-family:'Lucida Sans','Lucida Sans Regular','Lucida Grande','Lucida Sans Unicode',Geneva,Verdana,sans-serif;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:#E8DDD6;}.logo{width:30%;margin-top:3rem;margin-bottom:3rem;}header{background-color:#FFF3EB;width:100%;display:flex;justify-content:center;}.header-text{font-size:4rem;}.text{font-size:3rem;}
        .content-container{padding:3rem;width:80%;}footer{background-color:#0E1C36;height:10vh;width:100%;margin:0;display:flex;justify-content:center;align-items:center;font-size:2rem;}.footer-text{color:#FFF3EB}a{text-decoration:none;color:#17BEBB;}.subscription-title{font-weight:bold;}.amount-text{color:#17BEBB;font-weight:bold;}
        </style>
        </head>
        <body><div class="main-div">
        <header> <img class="logo" src="https://imgtr.ee/images/2023/09/17/e4b926c06cb5ba75f7143170a6fcbc5f.png"/>
        </header><div class="content-container"><h1 class="header-text">Hi ${user},</h1><p class="text">Your subscription <span class="subscription-title">${subscriptionName.toUpperCase()}</span> will be renewed tommorrow and you will be charged <span class="amount-text">${subscriptionAmount}</span>. Don't forget to cancel subscription if you only wanted to try it out. Have a nice day!</p></div><footer><p class="footer-text">Manage your subscriptions on our website. Visit
        <a href="http://localhost:5173/home/" target="subscription">SubscriptionMaster</a></p></footer></div>
        </body>
        </html>`
    )
        
}