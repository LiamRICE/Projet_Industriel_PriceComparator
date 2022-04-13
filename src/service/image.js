const axios = require('axios');
const fs = require('fs');

async function get_image(image_data_list) {
    return_value = [];
    let i = 1;

    return new Promise((resolve, reject) => {
        //let id = get_unique_ID(image_data_list.length);
        for(let image_data=3; image_data<image_data_list.length; image_data++){
            let data = {
                image_type : "newsletter_images",
                account_name : image_data_list[image_data].company_name,
                image_url : encodeURIComponent(image_data_list[image_data].image_url),
                product_id : image_data,
            }
            console.log(`Pushing ${data.product_id}`);

            get_uploaded_image_link(data).then((res, err) => {
                if(err){
                    reject(err);
                }else{
                    console.log(`Push ${data.product_id} complete (${i})`);
                    return_value.push(res);
                    i += 1;
                }
            })
        }
        while(i<=image_data_list.length){
            //console.log(`While loop : ${i}`);
            if(i == image_data_list.length){
                resolve(return_value);
            }
        }
    });
}

async function get_uploaded_image_link(data){
    return new Promise((resolve, reject) => {
        let image_type = data.image_type;
        let account_name = data.company_name;
        let image_url = data.image_url;
        let product_id = data.image_data;

        try {
            const url = `http://185.63.174.6:9600/image/${image_type}/${account_name}/${image_url}/${product_id}`;
            const config = {
                method: 'GET',
            };
            console.log(`Axios GET ${data.product_id}`);
            axios.get(url, config).then((result, err) => {
                if(err){
                    reject(err);
                }else{
                    console.log(`Resolving Axios GET ${data.product_id}`);
                    resolve(result.data);
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}

function get_unique_ID(num_images){
    fs.readFile('src/assets/data/state.txt', (read) => {
        //console.log("Read = "+read);
        let number = parseInt(read);
        //console.log("Number = "+number);
        let num = number + num_images;
        fs.writeFile('src/assets/data/state.txt', num, (err) => {
            if (err) throw err;
        })
        return number;
    })
}

module.exports = {
    get_image,
}