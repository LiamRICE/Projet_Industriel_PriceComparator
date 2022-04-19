const image = require('../service/image');

data = {
    origin: "Company Name",
    images: [
        {
            image: '<img className="mancake_src" src="image/src.png"></img>',
            source: "image/src.png"
        }
    ]
}
test("Formatting data for image upload", () => {
    image.to_data(data, (ret) => {
        expect(ret).toEqual([
            {
                company_name: "Company Name",
                image_url: "image/src.png"
            }
        ]);
    });
});
