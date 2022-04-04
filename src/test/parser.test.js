const parser = require('../service/parser');

test("Extracting name of link from <a> tag", () => {
    expect(parser.clean_link_tag(`<a href="https://roxanetissot-violoniste.herokuapp.com"><img/>Fun</a>`)).toEqual("Fun");
});
/* TODO - finish test suite
test("Getting list of images", () => {
    parser.read_newsletter("")
});
*/