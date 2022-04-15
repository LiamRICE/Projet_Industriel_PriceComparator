const parser = require('./service/parser');
const image = require('./service/image');
const fs = require('fs');

parser.parse_newsletter("src/assets/newsletters/Gmail - GTC22 Event Recap.html", (data) => {
    //console.log(data);

    image.to_data(data, (ret) => {
        //console.log(ret);
    });
});

