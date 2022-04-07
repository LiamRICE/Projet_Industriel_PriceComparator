const parser = require('./service/parser');
const fs = require('fs');

const dictionary = [
    "unsubscrib",
    "désinscri",
    "desinscri",
    "désabon",
    "desabon",
]

parser.read_newsletter("src/assets/newsletters/Gmail - Introducing_ _StandPartners Only_ from Fiddlershop.html", (data) => {
    let lines = data.split("\n");
    let selected_lines = [];
    for(line in lines){
        for(word in dictionary){
            if(lines[line].includes(dictionary[word])){
                selected_lines.push(lines[line]);
            }
        }
    }
    let links = []
    for(line in selected_lines){
        parser.get_link_tags(selected_lines[line], (link) => {
            links.push(link);
        });
    }
    console.log(links);
});
