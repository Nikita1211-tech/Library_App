const nodemailer = require("nodemailer");

function otpSender(email: string, otp: number) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "nicky121102@gmail.com",
      pass: "iaqt usik abhf sjwx",
    },
  });
  async function main() {
    const info = await transporter.sendMail({
      from: "nicky121102@gmail.com",
      to: email,
      subject: "OTP",
      text: "Hello world?",
      html: `Your OTP is ${otp}`,
    });

    console.log("Message sent: %s", info.messageId);
  }
  main().catch(console.error);
}
export { otpSender };
