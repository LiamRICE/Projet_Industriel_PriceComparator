const fs = require('fs');
const parser = require('./parser');
const image = require('./image');
const gmail = require('./gmail');

/**
 * download all emails
 * foreach email
 *   isolate relevant information
 *   replace unsubscribe link
 *   foreach image
 *     upload image and get link
 *     replace link in email
 *   write down image
 */

async function downloadAll(){
    console.log("Fetching...");
    gmail.getAllEmails((res) => {
        console.log(res.length);
        console.log("Parsing...");
        for(mail in res){
            let email = res[mail];
            parser.parse_newsletter(email.data, email.company, (data) => {
                image.to_data(data, (formattedData) => {
                    var newImageLinks = [];
                    var promise = new Promise((resolve, reject) => {
                        try{
                            for(imageData in formattedData){
                                if(formattedData[imageData] == undefined){
                                    if (imageData == formattedData.length-1) {
                                        console.log(`Finished Image Upload : ${mail}`);
                                        resolve();
                                    };
                                }else{
                                    let linkObject = {
                                        oldLink : formattedData[imageData].image_url,
                                        newLink : formattedData[imageData].image_url,
                                    }
                                    image.get_image(formattedData[imageData]).then((newLink) => {
                                        linkObject.newLink = newLink;
                                        newImageLinks.push(linkObject);
                                        //console.log(`LINK GENERATED : ${newLink}`);
                                        if (imageData == formattedData.length-1) {
                                            console.log(`Finished Image Upload : ${mail}`);
                                            resolve();
                                        };
                                    }).catch((err) => {
                                        //console.log(`ERROR : ${err}`);
                                        if (imageData == formattedData.length-1) {
                                            console.log(`Finished Image Upload : ${mail}`);
                                            resolve();
                                        };
                                    });
                                }
                            }
                        }catch(err){
                            console.log("UPLOAD FAILED !")
                            resolve();
                            reject(err);
                        }
                    });
                    promise.then(() => {
                        console.log(`Replacement : ${mail}`);
                        var nPromise = new Promise((resolve, reject) => {
                            try{
                                let i = 0;
                                let j = 0;
                                for(tag in data.unsubscription){
                                    parser.get_link_details([data.unsubscription[tag].link], (newLink) => {
                                        let unsubscribe_tag = newLink[0].link;
                                        //console.log(`UNSUBSCRIPTION : ${unsubscribe_tag} => nothing`);
                                        email.data = email.data.replaceAll(unsubscribe_tag, "");
                                        i = tag;
                                        if (j == newImageLinks.length-1 && i == data.unsubscription.length-1) {
                                            resolve();
                                        }
                                    });
                                }
                                for(link in newImageLinks){
                                    //console.log(`${link} : ${newImageLinks[link].oldLink} => ${newImageLinks[link].newLink}`);
                                    email.data = email.data.replace(newImageLinks[link].oldLink, newImageLinks[link].newLink);
                                    j = link;
                                    if (j == newImageLinks.length-1 && i == data.unsubscription.length-1) {
                                        resolve();
                                    }
                                }
                            }catch(err){
                                resolve();
                                reject(err);
                            }
                        }).catch((err) => {console.log("UPLOAD FAILED !");});
                        nPromise.then(() => {
                            image.get_unique_ID((id) => {
                                email.company.replaceAll(" ", "_");
                                email.company.replaceAll("/", "");
                                const filename = `src/assets/output/${email.company}${id}.html`;
                                console.log(filename);
                                fs.writeFile(filename, email.data, (err) => {
                                    if (err) console.log(`Write : failed - ${err}`);
                                });
                            });
                        }).catch((err) => {console.log("REPLACEMENT FAILED !");});
                    });
                });
            });
        }
    });
}

downloadAll();
