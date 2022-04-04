const fs = require('fs');

function read_newsletter(filename, callback){
    console.log("Method start!");
    fs.readFile(filename, (err, data) => {
        if (err) {
            console.log("Method error!");
        }
        console.log("Method end!");
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

module.exports = {
    read_newsletter,
    find_images,
}
