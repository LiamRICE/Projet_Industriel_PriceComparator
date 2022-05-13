const parser = require('./service/parser');
const image = require('./service/image');
const fs = require('fs').promises;

/*
var promise = new Promise((resolve, reject) => {
  if(true){
    resolve("Success.");
  }else{
    reject("Failed");
  }
});

promise.then((res) => {
  console.log(`Completed : ${res}`);
}).catch((err) => {
  console.log(err);
})

image_data = {
  company_name:"France24",
  image_url:"data:image/png;base64,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",
}
image.get_image(image_data).then((res) => {console.log(res);}).catch((err) => {console.log(err);});
*/
/*
parser.read_newsletter(`src/assets/output/Carrefourfr1506120426188446.html`, (source) => {
  parser.parse_newsletter(source, "Warhammer+", (data) => {
    let string_data = JSON.stringify(data, null, 1);
    for(tag in data.unsubscription){
      parser.get_link_details([data.unsubscription[tag].link], (newLink) => {
          let unsubscribe_link = newLink[0].link;
          let newFile = source.replaceAll(unsubscribe_link, "");
          fs.writeFile(`src/assets/newsletters/carrefour.html`, newFile, (err) => {
            if (err) throw err;
          });
          //console.log(`UNSUBSCRIPTION : ${unsubscribe_tag} => nothing`);
      });
    }
    fs.writeFile(`src/assets/newsletters/carrefour.txt`, string_data, (err) => {
      if (err) throw err;
    });

    image.to_data(data, (ret) => {
      //console.log(ret);
    });
  });
});
*/
/*
async function process(parsed_data){
  for(d in parsed_data){
    image.get_image(parsed_data[d]).then((data, err) => {
      data = data+'\n';
      if(err){
        err.message();
      }else{
        try {
          fs.appendFile('nvidia-output.txt', data);
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
}

parser.parse_newsletter("src/assets/newsletters/Gmail - GTC22 Event Recap.html", (data) => {
  image.to_data(data, (parsed_data) => process(parsed_data));
});
*/


parser.get_link_details(['<a href="https://links.email1.carrefour.fr/els/v2/qjL7S0R8KGS97/cjJvcENwbjZTNWdNYmRObndYUTNKc2hJMFpteUxnVXRRZHdNYk9jVFVyb2dNVlU1Ums4R28wczhlVW85aFpwREZxUXJZZnIzUzQ1TllJYWJLMkNJVUhHQkM0ZEZjeC9vczRrdHhMNU9GUnM9S0/ZW53Z1NNWHNHVlRPWUNiRGFVSW8wZUVYdTBqdkhjZVA1SktONWRUYXlad25HclFWK3pFL01CZkNMSDhPOTcwalo1MzVhOS9pRjJRNG1hRFdDV0x3OEFuN2lmKzJiUTNiUHcwRkpqa2JRTVRKajNxZEJsRXBRbWowdmhpTDByVVg5YngraXZuTlVsN0F5QUpQMUIwYjNKei9GNmFuWjFzK1VmQ2lXVW80VThWZkVhVmM2QkVWZ0UrNXNNcUNzS1d3S0" name="URL_DESABO" style="text-decoration:underline;color:#1e5bc6;" target="_blank" >suivez ce lien</a>'], (newLink) => {
  console.log(newLink[0].link);
});

let va = "La companie des animaux".replaceAll(" ", "_");
console.log(va);
