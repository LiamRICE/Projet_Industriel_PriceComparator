const parser = require('./service/parser');
const image = require('./service/image');
const fs = require('fs');

fs.readdir("src/assets/newsletters", (err, files) => {
    files.forEach(file => {
        let company = file.split(".htm")[0]
        parser.parse_newsletter(`src/assets/newsletters/${file}`, company, (data) => {
            let string_data = JSON.stringify(data, null, 1);

            file = file.split(".htm")[0];
            fs.writeFile(`src/assets/output/${file}.txt`, string_data, (err) => {
                if (err) throw err;
            });

            image.to_data(data, (ret) => {
                //console.log(ret);
            });
        });
    });
});

/*

*/
