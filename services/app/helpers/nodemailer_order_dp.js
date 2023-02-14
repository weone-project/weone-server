const nodemailer = require('nodemailer')

function sendEmailOrderDp(email, product, paymentStatus, totalPrice) {
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
        subject: `Thanks for your order!`,
        text: `Here's your payment details:`,
        html: `<h1>Payment details</h1> <br/> 
        <p>Product name: ${product}</p> <br/>
        <p>Payment status: ${paymentStatus}</p> <br/>
        <p>Total: ${totalPrice}</p>`,
        // attachments: [{
        //     filename: 'thank-you.jpg',
        //     path: __dirname+'/thank-you.jpg',
        //     cid: 'thank-you'
        // }]
    }

    transporter.sendMail(details, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('KEKIRIM!!!');
        }
    })
}

module.exports = sendEmailOrderDp