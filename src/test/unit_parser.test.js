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

test("", () => {
    parser.get_unsubscribe_tag([
        {
          name: 'NVIDIA Announces Hopper Architecture',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7mlRkzHySiYKI77FvwcLfOFjHpBR1_uCiRHm5PGi8cw0WriG29LLm3m67cfuQDdTc98=" id="m_8725908028413382607" style="text-decoration:none;color:#76b900" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7mlRkzHySiYKI77FvwcLfOFjHpBR1_uCiRHm5PGi8cw0WriG29LLm3m67cfuQDdTc98%3D&amp;source=gmail&amp;ust=1649142500768000&amp;usg=AOvVaw23hwbb4PFJ4gE-qp_yu7P2">NVIDIA Announces Hopper Architecture</a>'  
        },
        {
          name: 'LEARN MORE',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7mlRkzHySiYKI77FvwcLfOFjHpBR1_uCiRHm5PGi8cw0WriG29LLm3m67cfuQDdTc98=" style="display:inline-block;text-decoration:none;background-color:#76b900;color:#ffffff;padding:13px;border:0px solid #76b900" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7mlRkzHySiYKI77FvwcLfOFjHpBR1_uCiRHm5PGi8cw0WriG29LLm3m67cfuQDdTc98%3D&amp;source=gmail&amp;ust=1649142500768000&amp;usg=AOvVaw23hwbb4PFJ4gE-qp_yu7P2">LEARN MORE</a>'
        },
        {
          name: 'H100 Transformer Engine Supercharges AI Training',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7Rrg-1i2UGXyMNzHIeaF9jxtoEarHlMGwOgDdWxMwK_It2tJ5Ue1U0BhLAHfhFad92o=" id="m_8725908028413382607" style="text-decoration:none;color:#76b900" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7Rrg-1i2UGXyMNzHIeaF9jxtoEarHlMGwOgDdWxMwK_It2tJ5Ue1U0BhLAHfhFad92o%3D&amp;source=gmail&amp;ust=1649142500768000&amp;usg=AOvVaw3-bg6_E0gA8Yeyjz9YIaRR">H100 Transformer Engine Supercharges AI Training</a>'
        },
        {
          name: 'Learn More &gt;',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7Rrg-1i2UGXyMNzHIeaF9jxtoEarHlMGwOgDdWxMwK_It2tJ5Ue1U0BhLAHfhFad92o=" style="text-decoration:none;color:#76b900" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7Rrg-1i2UGXyMNzHIeaF9jxtoEarHlMGwOgDdWxMwK_It2tJ5Ue1U0BhLAHfhFad92o%3D&amp;source=gmail&amp;ust=1649142500768000&amp;usg=AOvVaw3-bg6_E0gA8Yeyjz9YIaRR">Learn More &gt;</a>'
        },
        {
          name: 'Hopper Architecture Accelerates Dynamic Programming ',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7SiUcrD4b51mkMGbM4XUUokGCQjmJ4enrKisK9cQAexTj4_y11eLFH_vaewEMTyeI9k=" style="color:#76b900;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7SiUcrD4b51mkMGbM4XUUokGCQjmJ4enrKisK9cQAexTj4_y11eLFH_vaewEMTyeI9k%3D&amp;source=gmail&amp;ust=1649142500768000&amp;usg=AOvVaw3jCqNzV7WEUqJap5pD1AAZ">Hopper Architecture Accelerates Dynamic Programming </a>'
        },
        {
          name: 'Learn More &gt;',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7SiUcrD4b51mkMGbM4XUUokGCQjmJ4enrKisK9cQAexTj4_y11eLFH_vaewEMTyeI9k=" style="text-decoration:none;color:#76b900" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7SiUcrD4b51mkMGbM4XUUokGCQjmJ4enrKisK9cQAexTj4_y11eLFH_vaewEMTyeI9k%3D&amp;source=gmail&amp;ust=1649142500768000&amp;usg=AOvVaw3jCqNzV7WEUqJap5pD1AAZ">Learn More &gt;</a>'
        },
        {
          name: 'NVIDIA Introduces Grace CPU Superchip',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T74mo6wHm-gyrxUbtvBoZfEyDcnd6vSHl1rxeJ8v8xtUogBQBLOxXO0OvEsBw_14Lh5g=" id="m_8725908028413382607" style="text-decoration:none;color:#76b900" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T74mo6wHm-gyrxUbtvBoZfEyDcnd6vSHl1rxeJ8v8xtUogBQBLOxXO0OvEsBw_14Lh5g%3D&amp;source=gmail&amp;ust=1649142500768000&amp;usg=AOvVaw2tPb0jOZQbzenAW1ErROJj">NVIDIA Introduces Grace CPU Superchip</a>' 
        },
        {
          name: 'Learn More &gt;',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T74mo6wHm-gyrxUbtvBoZfEyDcnd6vSHl1rxeJ8v8xtUogBQBLOxXO0OvEsBw_14Lh5g=" style="text-decoration:none;color:#76b900" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T74mo6wHm-gyrxUbtvBoZfEyDcnd6vSHl1rxeJ8v8xtUogBQBLOxXO0OvEsBw_14Lh5g%3D&amp;source=gmail&amp;ust=1649142500768000&amp;usg=AOvVaw2tPb0jOZQbzenAW1ErROJj">Learn More &gt;</a>'
        },
        {
          name: 'A New Digital Twin Platform for Scientific Computing',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7n0vFTWhEAr6AqrWiqxzHXr8hfGiSrAUNuJ_tC9lgtRthmF2M-rLE75DZBaC8rJ2vP4=" style="color:#76b900;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7n0vFTWhEAr6AqrWiqxzHXr8hfGiSrAUNuJ_tC9lgtRthmF2M-rLE75DZBaC8rJ2vP4%3D&amp;source=gmail&amp;ust=1649142500768000&amp;usg=AOvVaw2_9T93n7ulHP0kNFqgFLZL">A New Digital Twin Platform for Scientific Computing</a>'
        },
        {
          name: 'Learn More &gt;',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7n0vFTWhEAr6AqrWiqxzHXr8hfGiSrAUNuJ_tC9lgtRthmF2M-rLE75DZBaC8rJ2vP4=" style="text-decoration:none;color:#76b900" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7n0vFTWhEAr6AqrWiqxzHXr8hfGiSrAUNuJ_tC9lgtRthmF2M-rLE75DZBaC8rJ2vP4%3D&amp;source=gmail&amp;ust=1649142500768000&amp;usg=AOvVaw2_9T93n7ulHP0kNFqgFLZL">Learn More &gt;</a>'
        },
        {
          name: 'Siemens Gamesa Taps NVIDIA Digital Twin Platform for Scientific Computing',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7SiLLNKj9onfq0n4m39suRac_VhUAtkyW6g--6MEdyKBNFOmC_PdbTCB6QU9_YK1Wog=" id="m_8725908028413382607" style="text-decoration:none;color:#76b900" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7SiLLNKj9onfq0n4m39suRac_VhUAtkyW6g--6MEdyKBNFOmC_PdbTCB6QU9_YK1Wog%3D&amp;source=gmail&amp;ust=1649142500768000&amp;usg=AOvVaw22XOWrpccPi3t5eTaFfuD3">Siemens Gamesa Taps NVIDIA Digital Twin Platform for Scientific Computing</a>'
        },
        {
          name: 'Learn More &gt;',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7SiLLNKj9onfq0n4m39suRac_VhUAtkyW6g--6MEdyKBNFOmC_PdbTCB6QU9_YK1Wog=" style="text-decoration:none;color:#76b900" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7SiLLNKj9onfq0n4m39suRac_VhUAtkyW6g--6MEdyKBNFOmC_PdbTCB6QU9_YK1Wog%3D&amp;source=gmail&amp;ust=1649142500768000&amp;usg=AOvVaw22XOWrpccPi3t5eTaFfuD3">Learn More &gt;</a>'
        },
        {
          name: 'NVIDIA Unveils Onramp to Hybrid Quantum Computing',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7U9GBre2cWIPf1kIk-946yNRsYIQx05v5vfPpAObD_GFmopekp-P-E_lBOC0yOPVE3c=" style="color:#76b900;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7U9GBre2cWIPf1kIk-946yNRsYIQx05v5vfPpAObD_GFmopekp-P-E_lBOC0yOPVE3c%3D&amp;source=gmail&amp;ust=1649142500769000&amp;usg=AOvVaw0fDL6pcFi5F9NW6po15a1U">NVIDIA Unveils Onramp to Hybrid Quantum Computing</a>'
        },
        {
          name: 'Learn More &gt;',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7U9GBre2cWIPf1kIk-946yNRsYIQx05v5vfPpAObD_GFmopekp-P-E_lBOC0yOPVE3c=" style="text-decoration:none;color:#76b900" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7U9GBre2cWIPf1kIk-946yNRsYIQx05v5vfPpAObD_GFmopekp-P-E_lBOC0yOPVE3c%3D&amp;source=gmail&amp;ust=1649142500769000&amp;usg=AOvVaw0fDL6pcFi5F9NW6po15a1U">Learn More &gt;</a>'
        },
        {
          name: 'Privacy Centre',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T761zgmEQf4WE2IrZLAiprwCGKw5828KubkzE4eAmN-IdryYM2rAYl4-vWONIJqvWYss=" style="font-family:&#39;DINPro-Regular&#39;,Helvetica,Arial,Sans-Serif;font-size:12px;color:#999999;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T761zgmEQf4WE2IrZLAiprwCGKw5828KubkzE4eAmN-IdryYM2rAYl4-vWONIJqvWYss%3D&amp;source=gmail&amp;ust=1649142500769000&amp;usg=AOvVaw0wATL6oxUiwN0tJVGVMsKZ">Privacy Centre</a>'
        },
        {
          name: 'Manage Preferences or Unsubscribe',
          link: '<a href="https://go.nvidianews.com/dc/M3tNI9WjhwgpWj9zFPExhuxrNf-XVLeUGu_PvT9R9VN2Cu-nQJ5svLx6prQkncWJNpWJ8r-h-y6YzqM2usbLNHF2JwroFWtwQVD4ayt6xTo0KdjkMuoKTw8K8A4c5VUYB8XHVUzTeH-E3sa8s9dkTBTsGIAK2uvOBMXrMuwn5tU=/MTU2LU9GTi03NDIAAAGDeT-T73G_ogtGASy58zh8cq10q1sW_lbcVjSMkp3EfrxRQTzTg9qe6fKGs-4H9dvKIZkQOOo=" style="font-family:&#39;DINPro-Regular&#39;,Helvetica,Arial,Sans-Serif;font-size:12px;color:#999999;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/dc/M3tNI9WjhwgpWj9zFPExhuxrNf-XVLeUGu_PvT9R9VN2Cu-nQJ5svLx6prQkncWJNpWJ8r-h-y6YzqM2usbLNHF2JwroFWtwQVD4ayt6xTo0KdjkMuoKTw8K8A4c5VUYB8XHVUzTeH-E3sa8s9dkTBTsGIAK2uvOBMXrMuwn5tU%3D/MTU2LU9GTi03NDIAAAGDeT-T73G_ogtGASy58zh8cq10q1sW_lbcVjSMkp3EfrxRQTzTg9qe6fKGs-4H9dvKIZkQOOo%3D&amp;source=gmail&amp;ust=1649142500769000&amp;usg=AOvVaw3u_ygM8VNzxN5lgov7x8d3">Manage Preferences or Unsubscribe</a>'
        },
        {
          name: 'Contact Us',
          link: '<a href="https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7Rlku5ZkGG8gGlSre6yqFy-gZeDTPBWxlTtSgq0mhiyHrXThwv9J7ej00RgoeMSoyRk=" style="color:#999999;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/MTU2LU9GTi03NDIAAAGDeT-T7Rlku5ZkGG8gGlSre6yqFy-gZeDTPBWxlTtSgq0mhiyHrXThwv9J7ej00RgoeMSoyRk%3D&amp;source=gmail&amp;ust=1649142500769000&amp;usg=AOvVaw0MqyrA2LBAWhO768RTu4wr">Contact Us</a>'
        },
        {
          name: 'View Online',
          link: '<a href="https://info.nvidia.com/index.php/email/emailWebview?mkt_tok=MTU2LU9GTi03NDIAAAGDeT-T7xZHAO5JwoS87Qz9JhDZChAw3fWy1jmMOnqWOdYQY8pA6ggUsUzLFftfTCww8J8_ljsKuVjCElSlZnUN4q_irLs4_1fIPFhUjzYzwJoLqHOSUA&amp;md_id=103045" style="color:#999999;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://info.nvidia.com/index.php/email/emailWebview?mkt_tok%3DMTU2LU9GTi03NDIAAAGDeT-T7xZHAO5JwoS87Qz9JhDZChAw3fWy1jmMOnqWOdYQY8pA6ggUsUzLFftfTCww8J8_ljsKuVjCElSlZnUN4q_irLs4_1fIPFhUjzYzwJoLqHOSUA%26md_id%3D103045&amp;source=gmail&amp;ust=1649142500769000&amp;usg=AOvVaw2TxKabEstqITAUGsKQ_k4-">View Online</a>'
        }
      ], (value, overload) => {
        expect({val:value, o:overload}).toEqual({val:{
            name: 'Manage Preferences or Unsubscribe',
            link: '<a href="https://go.nvidianews.com/dc/M3tNI9WjhwgpWj9zFPExhuxrNf-XVLeUGu_PvT9R9VN2Cu-nQJ5svLx6prQkncWJNpWJ8r-h-y6YzqM2usbLNHF2JwroFWtwQVD4ayt6xTo0KdjkMuoKTw8K8A4c5VUYB8XHVUzTeH-E3sa8s9dkTBTsGIAK2uvOBMXrMuwn5tU=/MTU2LU9GTi03NDIAAAGDeT-T73G_ogtGASy58zh8cq10q1sW_lbcVjSMkp3EfrxRQTzTg9qe6fKGs-4H9dvKIZkQOOo=" style="font-family:&#39;DINPro-Regular&#39;,Helvetica,Arial,Sans-Serif;font-size:12px;color:#999999;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://go.nvidianews.com/dc/M3tNI9WjhwgpWj9zFPExhuxrNf-XVLeUGu_PvT9R9VN2Cu-nQJ5svLx6prQkncWJNpWJ8r-h-y6YzqM2usbLNHF2JwroFWtwQVD4ayt6xTo0KdjkMuoKTw8K8A4c5VUYB8XHVUzTeH-E3sa8s9dkTBTsGIAK2uvOBMXrMuwn5tU%3D/MTU2LU9GTi03NDIAAAGDeT-T73G_ogtGASy58zh8cq10q1sW_lbcVjSMkp3EfrxRQTzTg9qe6fKGs-4H9dvKIZkQOOo%3D&amp;source=gmail&amp;ust=1649142500769000&amp;usg=AOvVaw3u_ygM8VNzxN5lgov7x8d3">Manage Preferences or Unsubscribe</a>'
        }, o:1});
    });
});

test("BUG - unable to extract name of <a> tag", () => {
    parser.get_link_names(['<a href="https://tracking.lacompagniedesanimaux.com/u/un.php?par=alLL0wITAx_58199_1310_$sid$&amp;_esuh=_11_42bc1ec1813ae13948a5f6a1cb7a31c95dc82efa7bf972a57252f4fe15059c2f" class="m_4455360267491564153fc1 m_4455360267491564153fwn m_4455360267491564153tdn" style="font-weight:normal;text-decoration:none;color:#3c4858" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://tracking.lacompagniedesanimaux.com/u/un.php?par%3DalLL0wITAx_58199_1310_$sid$%26_esuh%3D_11_42bc1ec1813ae13948a5f6a1cb7a31c95dc82efa7bf972a57252f4fe15059c2f&amp;source=gmail&amp;ust=1649246760072000&amp;usg=AOvVaw3lp7uXtQnXAasD9O03A3cF"><font class="m_4455360267491564153ff m_4455360267491564153fc1 m_4455360267491564153tdu" style="font-family:Arial,Helvetica,sans-serif;color:#3c4858;text-decoration:underline;line-height:1.4">désinscrire</font></a>'], (value) => {
        expect(value).toEqual([{name:'désinscrire', link:'<a href="https://tracking.lacompagniedesanimaux.com/u/un.php?par=alLL0wITAx_58199_1310_$sid$&amp;_esuh=_11_42bc1ec1813ae13948a5f6a1cb7a31c95dc82efa7bf972a57252f4fe15059c2f" class="m_4455360267491564153fc1 m_4455360267491564153fwn m_4455360267491564153tdn" style="font-weight:normal;text-decoration:none;color:#3c4858" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=en-GB&amp;q=https://tracking.lacompagniedesanimaux.com/u/un.php?par%3DalLL0wITAx_58199_1310_$sid$%26_esuh%3D_11_42bc1ec1813ae13948a5f6a1cb7a31c95dc82efa7bf972a57252f4fe15059c2f&amp;source=gmail&amp;ust=1649246760072000&amp;usg=AOvVaw3lp7uXtQnXAasD9O03A3cF"><font class="m_4455360267491564153ff m_4455360267491564153fc1 m_4455360267491564153tdu" style="font-family:Arial,Helvetica,sans-serif;color:#3c4858;text-decoration:underline;line-height:1.4">désinscrire</font></a>'}])
    })
})


