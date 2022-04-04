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
    for(line in lines){
        images.push("<img"+lines[line]+"/>");
    }
    callback(images);
}

function clear_subtag(tag){
    console.log("\n\n\n");
    split = tag.split("<");
    next = "";
    if(split[0] == ""){
        for(let s=1; s<split.length; s++){
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

function isolate_link_tags(data, callback){
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

module.exports = {
    read_newsletter,
    find_images,
    isolate_link_tags,
    get_link_names,
    clean_link_tag,
}
