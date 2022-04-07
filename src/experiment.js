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
    parser.get_unsubscribe_tag(data, (selected, count) => {
      console.log(selected);
    });
  });
