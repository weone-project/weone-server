const nodemailer = require('nodemailer')

function sendEmailRegister(email, transaction_details) {
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
        subject: `Thanks for register! ${email}!`,
        text: `Welcome and please anjoy our service! Thanks for trusting us for your special day.`,
        html: '<h1>Welcome and please enjoy our services!</h1><br/> <img src="cid:thank-you"/>',
        attachments: [{
            filename: 'thank-you.jpg',
            path: __dirname+'/thank-you.jpg',
            cid: 'thank-you'
        }]
    }

    transporter.sendMail(details, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('KEKIRIM!!!');
        }
    })
}

module.exports = sendEmailRegister