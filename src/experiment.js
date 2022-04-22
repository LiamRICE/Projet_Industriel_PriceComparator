const parser = require('./service/parser');
const image = require('./service/image');
const fs = require('fs').promises;

parser.parse_newsletter(`src/assets/newsletters/Polytech Montpellier88.html`, "Polytech Montpellier", (data) => {
  let string_data = JSON.stringify(data, null, 1);
  fs.writeFile(`src/assets/output/Polytech Montpellier88.txt`, string_data, (err) => {
    if (err) throw err;
  });

  image.to_data(data, (ret) => {
    //console.log(ret);
  });
});

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



