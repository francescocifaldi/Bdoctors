const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "8b4e7f44c1b200",
      pass: "7f14af6ad75b3a",
    },
  });

export default function Contact() {

    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
          to: "bar@example.com, baz@example.com", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      } 
      main().catch(console.error);


  return (
<>
</>
)
}