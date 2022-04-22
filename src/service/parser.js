const fs = require('fs');

const dictionary = [
    "unsubscrib",
    "subscri",
    "désinscri",
    "desinscri",
    "désabon",
    "desabon",
    "abonne",
]

/**
 * This function reads a newsletter html file and provides the contents as a string as an input to the callback function.
 * @param {string} filename - the path to the file to read.
 * @param {function} callback - the callback function executed and is provided the file's contents as input.
 */
function read_newsletter(filename, callback){
    fs.readFile(filename, (err, data) => {
        console.log(err);
        callback(data.toString());
    });
}

/**
 * This function isolates all of the image tags in a newsletter and returns them in an array.
 * @param {string} data - a string containing the html of a newsletter.
 * @param {function} callback - the callback function executed at the end and is provided an array of strings containing each an image tag as input.
 */
function find_images(data, callback){
    let split_data = data.split("<img");
    let lines = [];
    for(group in split_data){
        let line = split_data[group].split(">")[0]
        lines.push(line);
    }
    let images = [];
    for(let line=1; line<lines.length; line++){
        images.push("<img"+lines[line]+">");
    }
    callback(images);
}

/**
 * This function isolates the source of an image and returns it.
 * @param {string} data - a string of the image tag.
 * @returns source - a string containing the source of the image.
 */
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

/**
 * This function takes an array of image tags and returns an array of json objects containing the image tags and their sources.
 * @param {[string]} images - an array of image tags as strings.
 * @param {function} callback - a callback function with an array of image objects (containing the image tag and source) as an input.
 */
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

/**
 * This function takes an a link tag and removes a tag within that link tag (ex : <a><img></img></a> => <a></a>).
 * @param {string} tag - the link tag to be cleared.
 * @returns tag - the modified link tag.
 */
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

/**
 * This function takes a link tag and removes all subtags.
 * @param {string} tag - a link tag to be cleared.
 * @returns tag - the cleared link tag.
 */
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

/**
 * This function isolates all of the link tags in a newsletter.
 * @param {string} data - the newsletter's html code as a string.
 * @param {function} callback - the callback function that provides an array of strings containing the link tags as input.
 */
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

/**
 * This function isolates the names for an array of link tags.
 * @param {[string]} data - an array of link tags as strings
 * @param {function} callback - a callback with an array of json objects detailing each link tag (name and link) as an input.
 */
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

/**
 * This function gets the source of each link for an array of link tags.
 * @param {[string]} data - an array of link tags as strings.
 * @param {function} callback - a callback that provides an array of json objects detailing each link (link and tag) as an input.
 */
function get_link_details(data, callback){
    tags = [];
    for(d in data){
        let l = get_link_source(data[d]);
        if(l != null){
            tags.push({
                link: l,
                tag: data[d],
            });
        }
    }
    callback(tags);
}

/**
 * This function isolates the source of a link tag.
 * @param {string} data - a link tag as a string.
 * @returns name - the name of the link tag (empty string if that name is an image for instance).
 */
function get_link_source(data){
    let p0_src = "";
    if(data.includes("href =")){
        p0_src = data.split("href =")[1];
    }else if(data.includes("href=")){
        p0_src = data.split("href=")[1];
    }else if(!data.includes("href")){
        p0_src = null;
    }else{
        console.log("GET_LINK_SOURCE ERROR = UNKNOWN LINK HREF !\n"+data)
    }
    if(p0_src != null){
        let source = "";
        if(p0_src.includes(`"`)){
            source = p0_src.split(`"`)[1];
        }else{
            source = p0_src.split(`'`)[1];
        }
        return source;
    }else{
        return p0_src;
    }
}

/**
 * This function isolates the link tag from a newsletter.
 * @param {string} data - a string representation of the newsletter's html code.
 * @param {function} callback - a callback function which provides the unsubscribe tag as a json object (name, link) as input.
 */
function get_unsubscribe_tag(data, callback){
    get_link_tags(data, (links) => {
        get_link_names(links, (tags) => {
            let selected;
            let count = 0;
            for(tag in tags){
                for(val in dictionary){
                    if(tags[tag].name.toLowerCase().includes(dictionary[val])){
                        selected = tags[tag];
                        count += 1;
                    }
                }
            }
            if(count == 0){
                data = alt_get_unsubscribe_link(data);
                if(data != null){
                    for(tag in tags){
                        if(tags[tag].link == data.link){
                            selected = tags[tag];
                        }
                    }
                    count = data.overload;
                }else{
                    console.log("ERROR - unsubscribe link not found");
                }
            }
            callback(selected, count);
        });
    });
}

/**
 * This function is an alternative way to getting the unsubscribe tag.
 * @param {string} data - the newsletter's html code as a string.
 * @returns link - the unsubscribe link tag and the number of other possibilites found, or null.
 */
function alt_get_unsubscribe_link(data){
    let lines = data.split("\n");
    let selected_lines = [];
    for(line in lines){
        for(word in dictionary){
            if(lines[line].includes(dictionary[word])){
                if(lines[line].includes("<a")){
                    selected_lines.push(lines[line]);
                }else{
                    let done = false;
                    let x=line;
                    while(x<lines.length && !done){
                        if(lines[x].includes("<a")){
                            selected_lines.push(lines[x]);
                            done = true;
                        }
                        x++;
                    }
                }
            }
        }
    }
    let links = []
    for(line in selected_lines){
        get_link_tags(selected_lines[line], (link) => {
            links.push(link);
        });
    }
    if(links.length != 0){
        ret = {
            link: links[links.length-1],
            overload: links.length,
        }
        return ret;
    }else{
        return null;
    }
}

/**
 * This function isolates all the key information from a newsletter.
 * @param {string} src - the path to the file to read that contains the newsletter html code.
 * @param {function} callback - a callback that is called and provides a json object as input containing the origin company, the array of images, the array of tags and the unsubscription tag.
 */
function parse_newsletter(src, company, callback){
    let image_sources;
    let unsubscribe_tag;
    let tag_details;
    read_newsletter(src, (data) => {
        find_images(data, (images) => {
            get_image_list_sources(images, (sources) => {
                image_sources = sources;
                get_link_tags(data, (links) => {
                    get_unsubscribe_tag(data, (tag, overflow) => {
                        unsubscribe_tag = tag;
                        if(overflow > 1){
                            console.log(`ERROR : ${company} - more than one unsubscribe tag detected`);
                        }
                        get_link_details(links, (taging) => {
                            tag_details = taging;
                            let return_value = {
                                origin: company,
                                images: image_sources,
                                tags: tag_details,
                                unsubscription: unsubscribe_tag,
                            }
                            if(return_value.unsubscription == undefined){
                                console.log(company);
                            }
                            callback(return_value);
                        });
                    });
                });
            })
        });
    });
}

module.exports = {
    read_newsletter,
    find_images,
    get_link_tags,
    get_link_names,
    clean_link_tag,
    get_image_list_sources,
    get_link_details,
    get_unsubscribe_tag,
    parse_newsletter,
}
