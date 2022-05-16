const parser = require('./service/parser');
const image = require('./service/image');
const gmail = require('./service/gmail');
const service = require('./service/service');
const Mutex = require('async-mutex').Mutex;
const fs = require('fs');
const {google} = require('googleapis');
const { syncBuiltinESMExports } = require('module');
/*
fs.readFile('src/service/credentials.json', (err, content) => {
    const credentials = JSON.parse(content)
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    gmail.getNewToken(oAuth2Client, () => {
        console.log("New token acquired.");
    });
});
*/

/*
fs.readdir("src/assets/newsletters", (err, files) => {
    files.forEach(file => {
        let company = file.split(".htm")[0]
        parser.parse_newsletter(`src/assets/newsletters/${file}`, company, (data) => {
            let string_data = JSON.stringify(data, null, 1);

            file = file.split(".htm")[0];
            fs.writeFile(`src/assets/output/${file}.txt`, string_data, (err) => {
                if (err) throw err;
            });

            image.to_data(data, (ret) => {
                //console.log(ret);
            });
        });
    });
});
*/
/*
let mutex = new Mutex();

async function downloadAll(){
    console.log("Fetching...");
    gmail.getAllEmails((res) => {
        console.log("Parsing...");
        res.forEach((email) => {
            email.company = email.company.replaceAll(" ", "_");
            email.company = email.company.replaceAll("/", "");
            email.company = email.company.replaceAll(".", "");
            parser.parse_newsletter(email.data, email.company, (data) => {
                for(tag in data.unsubscription){
                    if(data.unsubscription[tag].link != undefined){
                        parser.get_link_details([data.unsubscription[tag].link], (newLink) => {
                            if(newLink[0] == undefined){
                                console.log(`ERROR : ${email.company}`);
                            }else{
                                let unsubscribe_tag = newLink[0].link;
                                email.data = email.data.replaceAll(unsubscribe_tag, "");
                            }
                        });
                    }else{
                        parser.get_link_details([data.unsubscription[tag].link], (newLink) => {
                            if(newLink[0] == undefined){
                                console.log(`ERROR : ${email.company}`);
                            }else{
                                let unsubscribe_tag = newLink[0].link;
                                email.data = email.data.replaceAll(unsubscribe_tag, "");
                            }
                        });
                    }
                }
                console.log(email.company);
                uploadImages(data).then((newImageLinks) => {
                    for(link in newImageLinks){
                        email.data = email.data.replace(newImageLinks[link].oldLink, newImageLinks[link].newLink);
                    }

                    image.get_unique_ID((id) => {
                        const filename = `src/assets/newsletters/${email.company}${Math.floor(id)}.html`;
                        console.log(filename);
                        fs.writeFile(filename, email.data, (err) => {
                            if (err) console.log(`Write : failed - ${err}`);
                        });
                    });
                }).catch((err) => console.log(err));
            });
        });
    });
}

async function uploadImages(data){
    return new Promise(async (resolve, reject) => {
        var newImageLinks = [];
        const release = await mutex.acquire();
        image.to_data(data, (formattedData) => {
            try{
                formattedData.forEach((imageData, index) => {
                    if(imageData == undefined){
                        if (index == formattedData.length-1) {
                            release();
                            resolve(newImageLinks);
                        };
                    }else{
                        let linkObject = {
                            oldLink : imageData.image_url,
                            newLink : imageData.image_url,
                        }
                        image.get_image(imageData).then((newLink) => {
                            linkObject.newLink = newLink;
                            console.log(linkObject.newLink);
                            newImageLinks.push(linkObject);
                            //console.log(`LINK GENERATED : ${newLink}`);
                            if (index == formattedData.length-1) {
                                release();
                                resolve(newImageLinks);
                            };
                        }).catch((err) => {
                            //console.log(`ERROR : ${err}`);
                            if (index == formattedData.length-1) {
                                release();
                                resolve(newImageLinks);
                            };
                        });
                    }
                });
            }catch(err){
                console.log("UPLOAD FAILED !")
                release();
                resolve(newImageLinks);
            }
        });
    });
}
*/

service.downloadAll();