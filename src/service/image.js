const axios = require('axios');
const fs = require('fs');

/**
 * This function takes in image data, uploads it to the PriceComparator server and returns the solution in the resolve of a promise.
 * @param {image_data} image_data - a json object containing the company_name and image_url.
 * @returns a promise that resolves the new link to the object or rejects as an error.
 */
async function get_image(image_data){
    return new Promise((resolve, reject) => {
        get_unique_ID((id) => {
            try {
                const url = `http://185.63.174.6:9600/image/newsletter_images/${image_data.company_name}/${encodeURIComponent(image_data.image_url)}/${id}`;
                const config = {
                    method: 'GET',
                };
                console.log(url);
                console.log("GET request...");
                axios.get(url, config).then((result, err) => {
                    if(err){
                        reject(err);
                    }else{
                        console.log("Success!");
                        resolve(`https://img.pricecomparator.pro/${result.data}`);
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    });
}

/**
 * This function returns a unique ID for the PriceComparator image server.
 * @param {callback} callback - a unique number as an ID.
 */
function get_unique_ID(callback){
    fs.readFile('./src/assets/data/state.txt', (err, read) => {
        console.log("Read = "+read);
        let number = parseInt(read);
        console.log("Number = "+number);
        fs.writeFile('./src/assets/data/state.txt', number+1, (err) => {
            if (err) throw err;
            else callback(number);
        });
    });
}

/**
 * This function formats the data that comes out of the parser and modifies it to be usable to upload all the images.
 * @param {data} data - the output data of the image parser, a json object containing the origin company, the array of images, the array of tags and the unsubscription tag.
 * @param {callback} callback - a callback that provides as input an array of json objects containing the company name and image url.
 */
function to_data(data, callback){
    let ret = [];
    let done = [];
    for(d in data.images){
        let val = true;
        for(x in done){
            if(done[x] == data.images[d].source){
                val = false;
            }
        }
        if(val){
            ret.push({
                company_name: data.origin,
                image_url: data.images[d].source,
            });
            done.push(data.images[d].source);
        }
    }
    callback(ret);
}

module.exports = {
    get_image,
    get_unique_ID,
    to_data,
}