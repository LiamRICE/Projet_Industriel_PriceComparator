const parser = require('./service/parser');

parser.read_newsletter("src/assets/newsletters/Gmail - GTC22 Event Recap.html", (data) => {
    parser.find_images(data, (images) => {
        console.log(images);
    })
});
