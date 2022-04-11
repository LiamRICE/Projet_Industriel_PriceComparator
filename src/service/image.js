import axios from 'axios';

export async function get_image(image_data_list) {
    let id = get_unique_ID(image_data_list.size());
    for(image_data in image_data_list){
        let image_type = "newsletter_images";
        let account_name = image_data_list[image_data].company_name;
        let image_url = image_data_list[image_data.image_url];
        let product_id = id + image_data;
        return new Promise((resolve, reject) => {
            try {
                const url = `185.63.174.6:9600/image/${image_type}/${account_name}/${image_url}/${product_id}`;
                const config = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                };
                axios.get(url, config).then((result) => {
                    resolve(result.data);
                });
            } catch (err) {
                reject(err);
            }
        });
    }
}

function get_unique_ID(num_images){
    fs.readFile('src/assets/data/state.txt', (read) => {
        let number = parseInt(read);
        let num = number + num_images;
        fs.writeFile('src/assets/data/state.txt', num, (err) => {
            if (err) throw err;
        })
        return number;
    })
}