const parser = require('./service/parser');
const image = require('./service/image');
const fs = require('fs').promises;

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



