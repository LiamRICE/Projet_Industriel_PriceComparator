const parser = require('./service/parser');
const image = require('./service/image');
const fs = require('fs');

// TODO - make data an array of image_data (like below) with the correct information.
let data1 = {
  company_name: "Nvidia",
  image_url: "https://ci5.googleusercontent.com/proxy/A5orN-QdXXvb3dNlSCHmmkrRW5904qntUEzaxuVy9jOBNlI0e0hBq3DIC_XFMsSrL16gLOSMEQnAtcVei52hRiSIOoqSTIgau6ot=s0-d-e1-ft#https://info.nvidia.com/rs/156-OFN-742/images/spacer.gif",
};
let data2 = {
  company_name: "Nvidia",
  image_url: "https://ci3.googleusercontent.com/proxy/rKDtFTQ5yrz_GyIZJDkZecyT6IJzl1GP0V0GeZCfnKU5-AEogf-QQ9EfuODTMhhEX9Xk4V6w4DfiNlYdnsVcN8Hn-s68KgkcyRkXG92whzZuNCWPhoWDFRSR5pFOHuB1Y-Z0WAMD=s0-d-e1-ft#https://info.nvidia.com/rs/156-OFN-742/images/hpc-quantum-computing-organic-600.jpg",
};
let data3 = {
  company_name: "Nvidia",
  image_url: "https://ci3.googleusercontent.com/proxy/dlzwH2QfVxApw-BGN2zUhGaHzD4QedvItZ8foKF5gN2gXkQ2yzwjaK016-wb5gj4FNEd-FVpIVaYuzHCq_W9NhZ-Va2JrqXo1RN2xiTAtnx7yMVvgpDtVVUdvhHK=s0-d-e1-ft#https://info.nvidianews.com/rs/nvidia/images/nv-social_icons-gaming-fb.png",
};
let data = [data1, data2, data3];

let link = image.get_image(data);
console.log(link);

fs.writeFile('src/assets/output/image-links.txt', link, (err) => {
    if (err) throw err;
})

