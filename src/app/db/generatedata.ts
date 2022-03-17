import { Author } from "../evaluation/interfaces/author.interface";
import { Book } from "../evaluation/interfaces/book.interface";

const fs = require('fs');
const uuid = require('uuid');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

const data = fs.readFileSync('book.json', 'utf8');
const jsonFile = JSON.parse(data);
console.log(jsonFile.length);

const authorsName: string[] = [];
const boosk: Book[] = [];
jsonFile.forEach ((book: Book) => authorsName.push(book.author?.name ?? ''));

const lorem = new LoremIpsum()

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
    new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString();
}

function generateAuthorName() {
    const name1 = authorsName[Math.random() * authorsName.length - 1];
    const name2 = authorsName[Math.random() * authorsName.length - 1];
    const name3 = authorsName[Math.random() * authorsName.length - 1];
    return `${name1} - ${name2} - ${name3}`;
}

function pushAuthor() {
    const minRangeValue = 4000;
    const maxRangeValue = 12000;
    const totalNewAuthors = Math.floor(maxRangeValue + Math.random() * (maxRangeValue - minRangeValue + 1));
    const newAuthors = [];
    for (let i = 0; i < totalNewAuthors; ++i) {
        const author = generateAuthor();
        newAuthors.push(author);
    }
    return JSON.stringify(newAuthors);
}

fs.writeFileSync('book.json', pushAuthor());
