const parser = require('./service/parser');

parser.get_link_names(['<a href="https://tracking.lacompagniedesanimaux.com/u/un.php?par=alLL0wITAx_58199_1310_$sid$&amp;_esuh=_11_42bc1ec1813ae13948a5f6a1cb7a31c95dc82efa7bf972a57252f4fe15059c2f" class="m_4455360267491564153fc1 m_4455360267491564153fwn m_4455360267491564153tdn" style="font-weight:normal;text-decoration:none;color:#3c4858" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://tracking.lacompagniedesanimaux.com/u/un.php?par%3DalLL0wITAx_58199_1310_$sid$%26_esuh%3D_11_42bc1ec1813ae13948a5f6a1cb7a31c95dc82efa7bf972a57252f4fe15059c2f&amp;source=gmail&amp;ust=1649246760072000&amp;usg=AOvVaw3lp7uXtQnXAasD9O03A3cF"><font class="m_4455360267491564153ff m_4455360267491564153fc1 m_4455360267491564153tdu" style="font-family:Arial,Helvetica,sans-serif;color:#3c4858;text-decoration:underline;line-height:1.4">désinscrire</font></a>'], (value) => {
    console.log(value);
})
/*
parser.read_newsletter("src/assets/newsletters/Gmail - Sélection spéciale de produits pour volailles !.html", (data) => {
    parser.find_images(data, (images) => {
        parser.get_image_list_sources(images, (sources) => {
            //console.log(sources);
        })
    });
    parser.get_link_tags(data, (links) => {
        //console.log(links);
        parser.get_link_names(links, (tags) => {
            //console.log(tags);
        });
        parser.get_link_details(links, (tag_details) => {
            //console.log(tag_details);
        });
    });
});
*/