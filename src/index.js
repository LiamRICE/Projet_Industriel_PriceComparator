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

// TODO - move main function (and rename it) to gmail service.

// Load client secrets from a local file.
fs.readFile('src/service/credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  gmail.authorize(JSON.parse(content), gmail.fetchAll).then((res, rej) => {
    console.log(`${res.length} emails downloaded.`)
  });
});

