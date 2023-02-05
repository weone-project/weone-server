const nodemailer = require('nodemailer')

function sendEmail(email) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS
        },
        debug: true,
        logger: true
    })

    let details = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: `Congrats ${email}!`,
        text: "Your account already created, Please login to your with your details, and Enjoy!"
    }

    transporter.sendMail(details, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('KEKIRIM!!!');
        }
    })
}

module.exports = sendEmail