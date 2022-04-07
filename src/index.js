const parser = require('./service/parser');
const fs = require('fs');

parser.parse_newsletter("src/assets/newsletters/Gmail - GTC22 Event Recap.html", (images, tags, tag) => {
    data = "[\n";
    for(i in images){
        data += `\t{\n\t\timage:${images[i].image},\n\t\tsource:${images[i].source}\n\t},\n`;
    }
    data += "],\n[\n";
    for(i in tags){
        data += `\t{\n\t\tlink:${tags[i].link},\n\t\ttag:${tags[i].tag}\n\t},\n`;
    }
    data += "],\n";
    if(tag != undefined){
        data += `{\n\tname:${tag.name},\n\tlink:${tag.link}\n}\n`;
    }else{
        console.log("ERROR - did not find unsubscribe tag (output-NVIDIA)");
    }

    fs.writeFile('src/assets/output/output-NVIDIA.txt', data, (err) => {
        if (err) throw err;
    })
});

parser.parse_newsletter("src/assets/newsletters/Gmail - Sélection spéciale de produits pour volailles !.html", (images, tags, tag) => {
    data = "[\n";
    for(i in images){
        data += `\t{\n\t\timage:${images[i].image},\n\t\tsource:${images[i].source}\n\t},\n`;
    }
    data += "],\n[\n";
    for(i in tags){
        data += `\t{\n\t\tlink:${tags[i].link},\n\t\ttag:${tags[i].tag}\n\t},\n`;
    }
    data += "],\n";
    if(tag != undefined){
        data += `{\n\tname:${tag.name},\n\tlink:${tag.link}\n}\n`;
    }else{
        console.log("ERROR - did not find unsubscribe tag (output-CdA)");
    }

    fs.writeFile('src/assets/output/output-CdA.txt', data, (err) => {
        if (err) throw err;
    })
});

parser.parse_newsletter("src/assets/newsletters/Gmail - ACC, Exprimez votre créativité, où que vous soyez.html", (images, tags, tag) => {
    data = "[\n";
    for(i in images){
        data += `\t{\n\t\timage:${images[i].image},\n\t\tsource:${images[i].source}\n\t},\n`;
    }
    data += "],\n[\n";
    for(i in tags){
        data += `\t{\n\t\tlink:${tags[i].link},\n\t\ttag:${tags[i].tag}\n\t},\n`;
    }
    data += "],\n";
    if(tag != undefined){
        data += `{\n\tname:${tag.name},\n\tlink:${tag.link}\n}\n`;
    }else{
        console.log("ERROR - did not find unsubscribe tag (output-ACC)");
    }

    fs.writeFile('src/assets/output/output-ACC.txt', data, (err) => {
        if (err) throw err;
    })
});

parser.parse_newsletter("src/assets/newsletters/Gmail - CdA, les chats.html", (images, tags, tag) => {
    data = "[\n";
    for(i in images){
        data += `\t{\n\t\timage:${images[i].image},\n\t\tsource:${images[i].source}\n\t},\n`;
    }
    data += "],\n[\n";
    for(i in tags){
        data += `\t{\n\t\tlink:${tags[i].link},\n\t\ttag:${tags[i].tag}\n\t},\n`;
    }
    data += "],\n";
    if(tag != undefined){
        data += `{\n\tname:${tag.name},\n\tlink:${tag.link}\n}\n`;
    }else{
        console.log("ERROR - did not find unsubscribe tag (output-CdA-cats)");
    }

    fs.writeFile('src/assets/output/output-CdA-cats.txt', data, (err) => {
        if (err) throw err;
    })
});

parser.parse_newsletter("src/assets/newsletters/Gmail - Introducing_ _StandPartners Only_ from Fiddlershop.html", (images, tags, tag) => {
    data = "[\n";
    for(i in images){
        data += `\t{\n\t\timage:${images[i].image},\n\t\tsource:${images[i].source}\n\t},\n`;
    }
    data += "],\n[\n";
    for(i in tags){
        data += `\t{\n\t\tlink:${tags[i].link},\n\t\ttag:${tags[i].tag}\n\t},\n`;
    }
    data += "],\n";
    if(tag != undefined){
        data += `{\n\tname:${tag.name},\n\tlink:${tag.link}\n}\n`;
    }else{
        console.log("ERROR - did not find unsubscribe tag (output-FdS)");
    }

    fs.writeFile('src/assets/output/output-FdS.txt', data, (err) => {
        if (err) throw err;
    })
});
