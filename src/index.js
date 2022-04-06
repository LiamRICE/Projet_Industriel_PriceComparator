const parser = require('./service/parser');

parser.read_newsletter("src/assets/newsletters/Gmail - Sélection spéciale de produits pour volailles !.html", (data) => {
    parser.find_images(data, (images) => {
        parser.get_image_list_sources(images, (sources) => {
            //console.log(sources);
        })
    });
    parser.get_link_tags(data, (links) => {
        //console.log(links);
        parser.get_link_names(links, (tags) => {
            console.log(tags);
        });
        parser.get_link_details(links, (tag_details) => {
            //console.log(tag_details);
        });
    });
});
