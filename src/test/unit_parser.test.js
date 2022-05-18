const parser = require('../service/parser');

// UNIT TESTS

test("Extracting name of link from <a> tag (simple)", () => {
    expect(parser.clean_link_tag(`<a href="https://roxanetissot-violoniste.herokuapp.com">Fun</a>`)).toEqual("Fun");
});

test("Extracting name of link from <a> tag (w/ subtags)", () => {
    expect(parser.clean_link_tag(`<a href="https://roxanetissot-violoniste.herokuapp.com"><div className="mixsrc"><img src="image/src"></img></div></a>`)).toEqual("");
});

test("Extracting link of <a> tag (simple)", () => {
    parser.get_link_details([`<a href="https://roxanetissot-violoniste.herokuapp.com">Fun</a>`], (value) => {
        expect(value).toEqual([ { link: 'https://roxanetissot-violoniste.herokuapp.com', tag: '<a href="https://roxanetissot-violoniste.herokuapp.com">Fun</a>' } ]);
    })
});

test("Extracting link of <a> tag (complex, prev_href)", () => {
    parser.get_link_details([`<a className="mancake_href" href="https://roxanetissot-violoniste.herokuapp.com">Fun</a>`], (value) => {
        expect(value).toEqual([ { link: 'https://roxanetissot-violoniste.herokuapp.com', tag: '<a className="mancake_href" href="https://roxanetissot-violoniste.herokuapp.com">Fun</a>' } ]);
    })
});

test("Extracting link of <a> tag (complex, )", () => {
    parser.get_link_details([`<a className="mancake_href" href="https://roxanetissot-violoniste.herokuapp.com">Fun</a>`], (value) => {
        expect(value).toEqual([ { link: 'https://roxanetissot-violoniste.herokuapp.com', tag: '<a className="mancake_href" href="https://roxanetissot-violoniste.herokuapp.com">Fun</a>' } ]);
    })
});

test("Extracting source of image tag (simple)", () => {
    parser.get_image_list_sources([`<img src="image_link"></img>`], (value) => {
        expect(value).toEqual([ { image: '<img src="image_link"></img>', source: 'image_link' } ]);
    })
});

test("Extracting source of image tag (simple, spaced_src)", () => {
    parser.get_image_list_sources([`<img src = "image_link"></img>`], (value) => {
        expect(value).toEqual([ { image: '<img src = "image_link"></img>', source: 'image_link' } ]);
    })
});

test("Extracting source of image tag (complex, succ_src)", () => {
    parser.get_image_list_sources([`<img src="image_link" className="mancake_src"></img>`], (value) => {
        expect(value).toEqual([ { image: '<img src="image_link" className="mancake_src"></img>', source: 'image_link' } ]);
    })
});

test("Extracting source of image tag (complex, prev_src)", () => {
    parser.get_image_list_sources([`<img className="mancake_src" src="image_link"></img>`], (value) => {
        expect(value).toEqual([ { image: '<img className="mancake_src" src="image_link"></img>', source: 'image_link' } ]);
    })
});

test("Extracting unsubscribe tag from data (complex, single line)", () => {
    parser.get_unsubscribe_tag(`<img></img>\n<p>If you want to unsubscribe, <a href="https://link_name_here">click here</a></p>\n<end></end>`, (value, overload) => {
        expect({val:value, o:overload}).toEqual({val:{
            name: 'click here',
            link: '<a href="https://link_name_here">click here</a>',
        }, o:1});
    });
});

test("Extracting unsubscribe tag from data (complex, multi-line)", () => {
    parser.get_unsubscribe_tag(`<img></img>\n<p>If you want to unsubscribe, click below</p>\n<a href="https://link_name_here">here</a>\n<end><a href="https://yet_another_link"></a></end>`, (value, overload) => {
        expect({val:value, o:overload}).toEqual({val:{
            link: '<a href="https://link_name_here">here</a>',
            name: 'here',
        }, o:1});
    });
});

test("BUG", () => {
    parser.find_images('<doctype>\n\n\n</doctype><img alt="Adobe Creative Cloud" src="https://landing.adobe.com/dam/global/images/creative-cloud.icon.240x234.png" width="30" height="30" border="0" hspace="0" vspace="0" style="display:block; vertical-align:top;" />\n<a></a>', (images) => {
        expect(images).toEqual(['<img alt="Adobe Creative Cloud" src="https://landing.adobe.com/dam/global/images/creative-cloud.icon.240x234.png" width="30" height="30" border="0" hspace="0" vspace="0" style="display:block; vertical-align:top;" />']);
    });
});

test("BUG - unable to extract name of <a> tag", () => {
    parser.get_link_names(['<a href="https://tracking.lacompagniedesanimaux.com/u/un.php?par=alLL0wITAx_58199_1310_$sid$&amp;_esuh=_11_42bc1ec1813ae13948a5f6a1cb7a31c95dc82efa7bf972a57252f4fe15059c2f" class="m_4455360267491564153fc1 m_4455360267491564153fwn m_4455360267491564153tdn" style="font-weight:normal;text-decoration:none;color:#3c4858" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://tracking.lacompagniedesanimaux.com/u/un.php?par%3DalLL0wITAx_58199_1310_$sid$%26_esuh%3D_11_42bc1ec1813ae13948a5f6a1cb7a31c95dc82efa7bf972a57252f4fe15059c2f&amp;source=gmail&amp;ust=1649246760072000&amp;usg=AOvVaw3lp7uXtQnXAasD9O03A3cF"><font class="m_4455360267491564153ff m_4455360267491564153fc1 m_4455360267491564153tdu" style="font-family:Arial,Helvetica,sans-serif;color:#3c4858;text-decoration:underline;line-height:1.4">désinscrire</font></a>'], (value) => {
        expect(value).toEqual([{name:'désinscrire', link:'<a href="https://tracking.lacompagniedesanimaux.com/u/un.php?par=alLL0wITAx_58199_1310_$sid$&amp;_esuh=_11_42bc1ec1813ae13948a5f6a1cb7a31c95dc82efa7bf972a57252f4fe15059c2f" class="m_4455360267491564153fc1 m_4455360267491564153fwn m_4455360267491564153tdn" style="font-weight:normal;text-decoration:none;color:#3c4858" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://tracking.lacompagniedesanimaux.com/u/un.php?par%3DalLL0wITAx_58199_1310_$sid$%26_esuh%3D_11_42bc1ec1813ae13948a5f6a1cb7a31c95dc82efa7bf972a57252f4fe15059c2f&amp;source=gmail&amp;ust=1649246760072000&amp;usg=AOvVaw3lp7uXtQnXAasD9O03A3cF"><font class="m_4455360267491564153ff m_4455360267491564153fc1 m_4455360267491564153tdu" style="font-family:Arial,Helvetica,sans-serif;color:#3c4858;text-decoration:underline;line-height:1.4">désinscrire</font></a>'}])
    });
});



