const fs = require('fs');

function read_newsletter(filename, callback){
    fs.readFile(filename, (err, data) => {
        if (err) throw err;
        callback(data.toString());
    });
}

function find_images(data, callback){
    let split_data = data.split("<img");
    let lines = [];
    for(group in split_data){
        let line = split_data[group].split(">")[0]
        lines.push(line);
    }
    let images = [];
    for(let line=1; line<lines.length; line++){
        images.push("<img"+lines[line]+"/>");
    }
    callback(images);
}

function get_image_source(data){
    let p0_src = "";
    if(data.includes("src =")){
        p0_src = data.split("src =")[1];
    }else if(data.includes("src=")){
        p0_src = data.split("src=")[1];
    }else{
        console.log("GET_IMAGE_SOURCE ERROR = UNKNOWN IMAGE SOURCE LINK !")
    }
    let source = p0_src.split(`"`)[1];
    return source;
}

function get_image_list_sources(images, callback){
    let sources = [];
    for(image in images){
        sources.push({
            image: images[image],
            source: get_image_source(images[image]),
        });
    }
    callback(sources);
}

function clear_subtag(tag){
    if(tag[0] == '<'){
        split = tag.split("<");
        next = "";
        if(split[0] == ""){
            for(let s=1; s<split.length; s++){
                next = next + split[s];
                if(s < split.length-1){
                    next = next + "<";
                }
            }
        }else{
            for(let s=0; s<split.length; s++){
                next = next + split[s];
                if(s < split.length-1){
                    next = next + "<";
                }
            }
        }
        
        split = next.split(">");
        next = "";
        for(let s=1; s<split.length; s++){
            next = next + split[s];
            if(s < split.length-1){
                next = next + ">";
            }
        }
        return next;
    } else {
        return tag.split("<")[0];
    }
}

function clean_link_tag(tag){
    a = tag.split("<a")[1];
    na = a.split(">");
    nota = "";
    for(let x=1; x<na.length; x++){
        nota = nota + na[x] + ">";
    }
    tagNotA = nota.split("</a")[0];

    clean = false;
    while(!clean){
        if(!tagNotA.includes("<")){
            clean = true;
        }else{
            tagNotA = clear_subtag(tagNotA);
        }
    }
    return tagNotA;
}

function get_link_tags(data, callback){
    isolating = data.split('<a');
    links = [];
    for(l in isolating){
        if(l>0){
            links.push("<a"+isolating[l].split("</a>")[0]+"</a>");
        }
    }
    callback(links);
}

function get_link_names(data, callback){
    tags = [];
    for(link in data){
        let n = clean_link_tag(data[link]);
        if(n != ""){
            tags.push({
                name: n,
                link: data[link],
            });
        }
    }
    callback(tags);
}

function get_link_details(data, callback){
    tags = [];
    for(d in data){
        tags.push({
            link: get_link_source(data[d]),
            tag: data[d],
        });
    }
    callback(tags);
}

function get_link_source(data){
    let p0_src = "";
    if(data.includes("href =")){
        p0_src = data.split("href =")[1];
    }else if(data.includes("href=")){
        p0_src = data.split("href=")[1];
    }else{
        console.log("GET_LINK_SOURCE ERROR = UNKNOWN LINK HREF !")
    }
    let source = p0_src.split(`"`)[1];
    return source;
}

module.exports = {
    read_newsletter,
    find_images,
    get_link_tags,
    get_link_names,
    clean_link_tag,
    get_image_list_sources,
    get_link_details,
}
