import { createRequire } from 'module'
const require = createRequire(import.meta.url);

const nodemailer = require("nodemailer");

export async function sendEmail(req,res){
  console.log("hello");
  const {reciever,subject,content}= req.body;
  console.log(req.body);
  // async..await is not allowed in global scope, must use a wrapper
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      secure:true,
      port:465,
      proxy: 'http://localhost:8000/',
      auth: {
          user: '',
          pass: ''
      },

  });
  transporter.verify((err, success) => {
    if (err) console.error(err);
    console.log('Your config is correct');
});
  console.log("proceding");
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from:"moncefrejeb1996@gmail.com", // sender address
    to: reciever, // list of receivers
    subject: subject, // Subject line
    text:content // plain text body
  });
  console.log("proceding");

  res.json({
    "message":"Message sent"
  });
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
