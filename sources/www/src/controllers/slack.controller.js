const token= "xoxp-835473819876-837792425767-838148967462-a6d016a4d8b66f07baf85eeb865406e9"
const {
  WebClient
}=require("@slack/web-api");

const web = new WebClient(token);

export async function getLastMessage(req,res){
  /*let users = await web.users.list();
  console.log(users);*/
  let msg = await web.conversations.history({
    channel:"CQKDXQWS0",
    limit : 4,
  });
  res.json({

"msg3": msg.messages[3].username+": "+msg.messages[3].text,
"msg2": msg.messages[2].username+": "+msg.messages[2].text,
"msg1": msg.messages[1].username+": "+msg.messages[1].text,
"msg0": msg.messages[0].username+": "+msg.messages[0].text
  })
  console.log(msg);
}
export async function putMessage(req,res){
  let users = await web.users.list();
  var user=users.members[0].name;
  const {message}= req.body;
  (async () => {
    const res = await web.chat.postMessage({username:"mrejebsf", link_names:true, channel: "CQKDXQWS0", text: message });
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);

    console.log(res);
  })();
  res.json({
    "name":user
  })
}
