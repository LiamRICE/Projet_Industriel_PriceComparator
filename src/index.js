const parser = require('./service/parser');

parser.read_newsletter("src/assets/newsletters/Gmail - GTC22 Event Recap.html", (data) => {
    parser.find_images(data, (images) => {
        //console.log(images);
    });
    parser.isolate_link_tags(data, (links) => {
        console.log("\n\n\n\n\n\n");
        parser.get_link_names(links, (tags) => {
            console.log(tags);
        });
    });
});
