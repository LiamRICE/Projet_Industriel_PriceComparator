const gmail = require('./service/gmail');
const fs = require('fs');
const {google} = require('googleapis');

fs.readFile('src/service/credentials.json', (err, content) => {
    const credentials = JSON.parse(content)
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    gmail.getNewToken(oAuth2Client, () => {
        console.log("New token acquired.");
    });
});