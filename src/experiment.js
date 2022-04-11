const parser = require('./service/parser');
const image = require('./service/image');
const fs = require('fs');

// TODO - make data an array of image_data (like below) with the correct information.
data = {
  company_name: "Nvidia",
  image_url: "https://ci5.googleusercontent.com/proxy/A5orN-QdXXvb3dNlSCHmmkrRW5904qntUEzaxuVy9jOBNlI0e0hBq3DIC_XFMsSrL16gLOSMEQnAtcVei52hRiSIOoqSTIgau6ot=s0-d-e1-ft#https://info.nvidia.com/rs/156-OFN-742/images/spacer.gif",
}
let link = image.getImage(data);
console.log(link);

fs.writeFile('src/assets/output/image-links.txt', link, (err) => {
    if (err) throw err;
})

