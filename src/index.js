const parser = require('./service/parser');

parser.parse_newsletter("src/assets/newsletters/Gmail - GTC22 Event Recap.html", (images, tags, tag) => {
    console.log(images);
    console.log(tags);
    console.log(tag);
});
