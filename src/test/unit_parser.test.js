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

test("Extracting unsubscribe tag from data (simple)", () => {
  parser.read_newsletter("src/assets/newsletters/Gmail - GTC22 Event Recap.html", (data) => {
    parser.get_unsubscribe_tag(data, (value, overload) => {
        expect({val:value, o:overload}).toEqual({val:{
            name: 'Manage Preferences or Unsubscribe',
            link: '<a href="https://go.nvidianews.com/dc/M3tNI9WjhwgpWj9zFPExhuxrNf-XVLeUGu_PvT9R9VN2Cu-nQJ5svLx6prQkncWJNpWJ8r-h-y6YzqM2usbLNHF2JwroFWtwQVD4ayt6xTo0KdjkMuoKTw8K8A4c5VUYB8XHVUzTeH-E3sa8s9dkTBTsGIAK2uvOBMXrMuwn5tU=/MTU2LU9GTi03NDIAAAGDeT-T73G_ogtGASy58zh8cq10q1sW_lbcVjSMkp3EfrxRQTzTg9qe6fKGs-4H9dvKIZkQOOo=" style="font-family:&#39;DINPro-Regular&#39;,Helvetica,Arial,Sans-Serif;font-size:12px;color:#999999;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/dc/M3tNI9WjhwgpWj9zFPExhuxrNf-XVLeUGu_PvT9R9VN2Cu-nQJ5svLx6prQkncWJNpWJ8r-h-y6YzqM2usbLNHF2JwroFWtwQVD4ayt6xTo0KdjkMuoKTw8K8A4c5VUYB8XHVUzTeH-E3sa8s9dkTBTsGIAK2uvOBMXrMuwn5tU%3D/MTU2LU9GTi03NDIAAAGDeT-T73G_ogtGASy58zh8cq10q1sW_lbcVjSMkp3EfrxRQTzTg9qe6fKGs-4H9dvKIZkQOOo%3D&amp;source=gmail&amp;ust=1649142500769000&amp;usg=AOvVaw3u_ygM8VNzxN5lgov7x8d3">Manage Preferences or Unsubscribe</a>'
        }, o:1});
    });
  });
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
    parser.get_unsubscribe_tag(`<img></img>\n<p>If you want to unsubscribe, click below</p>\n<a href="https://link_name_here">here</a>\n<end></end>`, (value, overload) => {
        expect({val:value, o:overload}).toEqual({val:{
            name: 'here',
            link: '<a href="https://link_name_here">here</a>',
        }, o:1});
    });
});

test("BUG - unable to extract name of <a> tag", () => {
    parser.get_link_names(['<a href="https://tracking.lacompagniedesanimaux.com/u/un.php?par=alLL0wITAx_58199_1310_$sid$&amp;_esuh=_11_42bc1ec1813ae13948a5f6a1cb7a31c95dc82efa7bf972a57252f4fe15059c2f" class="m_4455360267491564153fc1 m_4455360267491564153fwn m_4455360267491564153tdn" style="font-weight:normal;text-decoration:none;color:#3c4858" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://tracking.lacompagniedesanimaux.com/u/un.php?par%3DalLL0wITAx_58199_1310_$sid$%26_esuh%3D_11_42bc1ec1813ae13948a5f6a1cb7a31c95dc82efa7bf972a57252f4fe15059c2f&amp;source=gmail&amp;ust=1649246760072000&amp;usg=AOvVaw3lp7uXtQnXAasD9O03A3cF"><font class="m_4455360267491564153ff m_4455360267491564153fc1 m_4455360267491564153tdu" style="font-family:Arial,Helvetica,sans-serif;color:#3c4858;text-decoration:underline;line-height:1.4">désinscrire</font></a>'], (value) => {
        expect(value).toEqual([{name:'désinscrire', link:'<a href="https://tracking.lacompagniedesanimaux.com/u/un.php?par=alLL0wITAx_58199_1310_$sid$&amp;_esuh=_11_42bc1ec1813ae13948a5f6a1cb7a31c95dc82efa7bf972a57252f4fe15059c2f" class="m_4455360267491564153fc1 m_4455360267491564153fwn m_4455360267491564153tdn" style="font-weight:normal;text-decoration:none;color:#3c4858" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://tracking.lacompagniedesanimaux.com/u/un.php?par%3DalLL0wITAx_58199_1310_$sid$%26_esuh%3D_11_42bc1ec1813ae13948a5f6a1cb7a31c95dc82efa7bf972a57252f4fe15059c2f&amp;source=gmail&amp;ust=1649246760072000&amp;usg=AOvVaw3lp7uXtQnXAasD9O03A3cF"><font class="m_4455360267491564153ff m_4455360267491564153fc1 m_4455360267491564153tdu" style="font-family:Arial,Helvetica,sans-serif;color:#3c4858;text-decoration:underline;line-height:1.4">désinscrire</font></a>'}])
    });
});

test("BUG - finding unsubscribe link with name not in the list", () => {
  parser.read_newsletter("src/assets/newsletters/Gmail - Introducing_ _StandPartners Only_ from Fiddlershop.html", (data) => {
    parser.get_unsubscribe_tag(data, (selected, count) => {
      let result = {
        name: 'click here',
        link: '<a href="https://trk.klclick2.com/ls/click?upn=jYznF3wmw7b7qd3Df3FaN06TBGftL7ui7KXxlOSEKEIm1EDDMXCoJ55Pi9LClaLdKOTtvA-2FkSBESsyOX4QYGvy9-2FsPaQFKh7NrOt1qCd04vloRrtc1Tb-2BeuvxJ-2F0HlVw-2FIvOY20x0XogD2rW7zfUMUNIqng2tdO48uzv3LzDHn8h18uNqRbRJ3Eci71DJGKIJHa9inQadlp4nAQ1AX4NkA-3D-3DG2hp_eoE8RVDj3oAU5KR-2B-2BlnjveTKNYrb3ukeW5ivVaoAYI0AyBwUJ5K2-2FbA5mzpoGWYRnGxKEalkosn3r34jU-2BfT0htJBGS-2BavXw0E-2BZEO7l-2Br51-2FtnTxtxVGZApKugIl1-2FVcsEEncdztOx-2BrhfwPJKo8DJHmiGsx-2B-2BpjRQY7wCKwRR5VDkpZHg-2FdoNbkvVhDneFWY7HuYyFsyp5RYx9B5OGZgMmUkY-2BZrMEu7G2NFm1hwqyWInS-2BPFpZcLJVjJmgDzMgsgo25E7-2B288Xsp8zsbbSRQkdJT2-2BB4uD2ueb9mA6MXhdYlx-2FSxOUL-2Fwws83K6hBg7ihcqEWDScj9YsosB0FF2-2FLwfAd8S0izHX3DrDmNkOKbu6rt3edIoH3niRYMWC3FOojhsHxYG-2BjIAuiYOu5Ig-3D-3D" style="color:#015045;font-weight:normal;text-decoration:none;word-wrap:break-word" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://trk.klclick2.com/ls/click?upn%3DjYznF3wmw7b7qd3Df3FaN06TBGftL7ui7KXxlOSEKEIm1EDDMXCoJ55Pi9LClaLdKOTtvA-2FkSBESsyOX4QYGvy9-2FsPaQFKh7NrOt1qCd04vloRrtc1Tb-2BeuvxJ-2F0HlVw-2FIvOY20x0XogD2rW7zfUMUNIqng2tdO48uzv3LzDHn8h18uNqRbRJ3Eci71DJGKIJHa9inQadlp4nAQ1AX4NkA-3D-3DG2hp_eoE8RVDj3oAU5KR-2B-2BlnjveTKNYrb3ukeW5ivVaoAYI0AyBwUJ5K2-2FbA5mzpoGWYRnGxKEalkosn3r34jU-2BfT0htJBGS-2BavXw0E-2BZEO7l-2Br51-2FtnTxtxVGZApKugIl1-2FVcsEEncdztOx-2BrhfwPJKo8DJHmiGsx-2B-2BpjRQY7wCKwRR5VDkpZHg-2FdoNbkvVhDneFWY7HuYyFsyp5RYx9B5OGZgMmUkY-2BZrMEu7G2NFm1hwqyWInS-2BPFpZcLJVjJmgDzMgsgo25E7-2B288Xsp8zsbbSRQkdJT2-2BB4uD2ueb9mA6MXhdYlx-2FSxOUL-2Fwws83K6hBg7ihcqEWDScj9YsosB0FF2-2FLwfAd8S0izHX3DrDmNkOKbu6rt3edIoH3niRYMWC3FOojhsHxYG-2BjIAuiYOu5Ig-3D-3D&amp;source=gmail&amp;ust=1649403822207000&amp;usg=AOvVaw3QVCauiE9XFA4yWm6kv3Dt">click here</a>'
      };
      expect(selected).toEqual(result);
    });
  });
});


