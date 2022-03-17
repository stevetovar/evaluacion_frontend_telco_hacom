import { Book } from "../evaluation/interfaces/book.interface";
// const  Book = require("../evaluation/interfaces/book.interface");

const fs = require('fs');
const uuid = require('uuid');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

const data = fs.readFileSync('book.json', 'utf8');
const jsonFile: Book[] = JSON.parse(data);
console.log(jsonFile.length);

// const boosk: Book[] = [];
let authors: string[] = [];
jsonFile.forEach((obj: Book) => authors.push(obj.author?.name ?? ''));
authors = authors.filter(name => name);

const lorem = new LoremIpsum();

function generateAuthor() {
    return {
        id: uuid.v4(),
        title: lorem.generateWords(Math.floor(2 + Math.random() * 3)),
        year: generateRandomDate(),
        description: lorem.generateWords(Math.floor(4 + Math.random() * 11)),
        published: true,
        "author": {
            id: uuid.v4(),
            name: generateAuthorName(),
            genre: Math.random() > 0.5 ? 'female' : 'male',
        }
    }
}

function generateRandomDate() {
    return new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString();
}

function generateAuthorName() {
    const name1 = authors[Math.floor(Math.random() * authors.length - 1)];
    const name2 = authors[Math.floor(Math.random() * authors.length - 1)];
    const name3 = authors[Math.floor(Math.random() * authors.length - 1)];
    return `${name1} - ${name2} - ${name3}`;
}

function pushAuthor() {
    // const minRangeValue = 4000;
    // const maxRangeValue = 12000;
    const minRangeValue = 14;
    const maxRangeValue = 35;
    const totalNewAuthors = Math.floor(maxRangeValue + Math.random() * (maxRangeValue - minRangeValue + 1));
    const newAuthors = [];
    for (let i = 0; i < totalNewAuthors; ++i) {
        const author = generateAuthor();
        newAuthors.push(author);
    }
    return JSON.stringify(newAuthors);
}

fs.writeFileSync('book.json', pushAuthor());
