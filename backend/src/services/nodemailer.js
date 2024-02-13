const nodemailer = require('nodemailer');

function otpSender(email, otp) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "nikita.codestore@gmail.com",
            pass: "prdd tzek dvnt cvxd",
        },
    });
    async function main() {
        const info = await transporter.sendMail({
            from: 'nikita.codestore@gmail.com',
            to: email,
            subject: "OTP",
            text: "Hello world?",
            html: `Your OTP is ${otp}`,
        });

        console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);
}
module.exports = otpSender;