const fs = require('fs');
const gmail = require('./service/gmail');
//const {google} = require('googleapis');

// Objectif : 
/* 
Lister les ID de tous les messages n'ayant pas le label "PROCESSED" (vour avec liam si autre moyen mieux)
Récupérer le texte d'un message en html
Liam s'occupe du reste
Changer le label d'un message en "PROCESSED"

*/

// Load client secrets from a local file.
fs.readFile('src/service/credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  gmail.authorize(JSON.parse(content), main);
});

async function main(oAuth2Client) {
  const messages = await gmail.listMessages(oAuth2Client, 'label:inbox');
  console.log('Messages:', messages);
  let num = 0;
  for(m in messages){
    const id = messages[m].id;
    console.log(id);
    const message = await gmail.getMessage(oAuth2Client,id);
    //console.log('Message:',message);
    const headers = message.data.payload.headers;
    //console.log(headers);
    var subject = "";
    var from = "";
    var date = "";
    var data = "";
    headers.forEach((elem) => {
      if(elem.name == "Subject"){
        subject = elem.value;
        console.log('subject:',subject);
      }
      if(elem.name == "From"){
        from = elem.value;
        console.log('from:',from);
      }
      if(elem.name == "Date"){
        date = elem.value;
        console.log('date:',date);
      }
    });
    if(message.data.payload.parts == undefined){
      if(message.data.payload.mimeType == 'text/html'){
        data = message.data.payload.body.data;
      }
      const txt = Buffer.from(data,'base64').toString('utf8');
      let n = from.split(' <')[0];
      if(n.includes('"')){
        n = n.split('"')[1];
      }
      console.log(`${n}.html`);
      fs.writeFile(`src/assets/newsletters/${n}${num}.html`, txt, (err) => {
        if (err) throw err;
      });
      const message2 = await gmail.editMessageLabel(oAuth2Client,id,[],['UNREAD']);
      //console.log(message2)
    }else{
      const parts = message.data.payload.parts;
      console.log(message.data.payload);
      parts.forEach((elem) => {
        if(elem.mimeType == "text/html"){
          data = elem.body.data;
          //console.log('data:',data);
        }
      });
      const txt = Buffer.from(data,'base64').toString('utf8');
      let n = from.split(' <')[0];
      if(n.includes('"')){
        n = n.split('"')[1];
      }
      console.log(`${n}.html`);
      fs.writeFile(`src/assets/newsletters/${n}${num}.html`, txt, (err) => {
        if (err) throw err;
      });
      const message2 = await gmail.editMessageLabel(oAuth2Client,id,[],['UNREAD']);
      //console.log(message2)
    }
    num += 1;
  }
}
