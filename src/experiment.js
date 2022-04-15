const parser = require('./service/parser');
const image = require('./service/image');
const fs = require('fs');

/*
let data1 = {
  company_name: "Nvidia",
  image_url: "https://ci3.googleusercontent.com/proxy/caQNF0ETo6SDE_zrscoKYKBxlMhqef8ioOVq41uwMV8u3JkKYQYrC3GeG5MLbJWptC1bpDyluJ2SdPSgM9Y8CBpn-DG2X9eenL-I0zUucU7TdzKCs35gviT11tlq5L0hOUK6=s0-d-e1-ft#https://info.nvidia.com/rs/156-OFN-742/images/newsletter-hopper-announcement.jpg",
};

image.get_image(data1).then((data, err) => {
  if(err){
    err.message();
  }else{
    let res = data;

    fs.writeFile('src/assets/output/image-links.txt', res, (err) => {
        if (err) throw err;
    });
  }
});
*/

