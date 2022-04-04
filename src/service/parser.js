const fs = require('fs');

function parse_newsletter(filename){
    fs.readFile(filename, (err, data) => {
        if (err) throw err;
        console.log(data.toString());
    })
}

parse_newsletter("src/assets/newsletters/Gmail - GTC22 Event Recap.html");