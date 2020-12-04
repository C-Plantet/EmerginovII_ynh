import { createRequire } from 'module'
const require = createRequire(import.meta.url);

const accountSid = 'ACd6d506454a4dd8ad756513b1eba9983c';
const authToken = 'a29e726be0912641452a6c70adb41382';

export async function sendSMS(req,res){
  const {phoneNumber,sms}= req.body;
  const client = require('twilio')(accountSid,authToken);

  client.validationRequests
  .create({friendlyName: 'My Home', phoneNumber: phoneNumber})
  .then(validation_request => console.log(validation_request.friendlyName));
 client.messages
    .create({
       body: sms,
       from: '+15106940839',
       to: phoneNumber
     })
    .then(message => console.log(message.sid));

    res.json({
      "message":"sms sent !"
    })

}
