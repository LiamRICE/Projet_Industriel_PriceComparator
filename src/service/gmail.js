const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// Objectif : 
/* 
Lister les ID de tous les messages n'ayant pas le label "PROCESSED" (vour avec liam si autre moyen mieux)
Récupérer le texte d'un message en html
Liam s'occupe du reste
Changer le label d'un message en "PROCESSED"

*/

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.labels.list({
    userId: 'me',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const labels = res.data.labels;
    if (labels.length) {
      console.log('Labels:');
      labels.forEach((label) => {
        console.log(`- ${label.name} : ${label.id}`);
      });
    } else {
      console.log('No labels found.');
    }
  });
}

/**
 * Lists the messages from the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {String} query Parameters to filter the results.
 */
function listMessages(auth, query) {  
  return new Promise((resolve, reject) => {    
    const gmail = google.gmail({version: 'v1', auth});    
    gmail.users.messages.list(      
      {        
        userId: 'me',        
        q: query,      
      },(err, res) => {        
        if (err) {
          reject(err);          
          return;        
        }        
        if (!res.data.messages) {
          resolve([]);          
          return;        
        }
        resolve(res.data.messages);      
      }    
    );  
  })
;}

/**
 * Gets the message from the id
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {String} messageId message ID
 */
 function getMessage(auth, messageId) {  
  return new Promise((resolve, reject) => {    
    const gmail = google.gmail({version: 'v1', auth});    
    gmail.users.messages.get(      
      {        
        userId: 'me',        
        id: messageId,      
      },(err, res) => {        
        if (err) {
          reject(err);          
          return;        
        }        
        resolve(res);  
        return;    
      }    
    );  
  })
;}

/**
 * Replaces the label of a message
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {String} messageId message ID
 * @param {[String]} labelsToAdd List of labels to add
 * @param {[String]} labelsToRemove List of labels to remove
 */
function editMessageLabel(auth, messageId, labelsToAdd, labelsToRemove) {  
  return new Promise((resolve, reject) => {    
    const gmail = google.gmail({version: 'v1', auth});    
    gmail.users.messages.modify(      
      {        
        id: messageId,        
        userId: 'me',        
        resource: {          
          "addLabelIds": labelsToAdd,          
          "removeLabelIds": labelsToRemove       
        },      
      }, (err, res) => {        
        if (err) {
          reject(err);          
          return;        
        }                
        resolve(res);        
        return;      
      }    
    );  
  });
}

module.exports = {
    editMessageLabel,
    getMessage,
    listMessages,
    listLabels,
    getNewToken,
    authorize,
}

