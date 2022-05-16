const fs = require('fs');
const parser = require('./parser');
const image = require('./image');
const gmail = require('./gmail');
const Mutex = require('async-mutex').Mutex;

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

module.exports = {
    downloadAll,
}