import { Author } from "../evaluation/interfaces/author.interface";
// const  Book = require("../evaluation/interfaces/book.interface");

const uuid = require('uuid');
const hash = require('object-hash');
const fs = require('fs');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

const data = fs.readFileSync('book.json', 'utf8');
const jsonFile: Author[] = JSON.parse(data);
console.log(jsonFile.length);

// const boosk: Book[] = [];
let authors: string[] = [];
jsonFile.forEach((obj: Author) => authors.push(obj.name ?? ''));
authors = authors.filter(name => name);

const lorem = new LoremIpsum();

function generateBook() {
    const authorName = generateAuthorName();
    return {
        id: uuid.v4().replaceAll('-', ''),
        title: lorem.generateWords(Math.floor(2 + Math.random() * 3)),
        year: generateRandomDate(),
        description: lorem.generateWords(Math.floor(4 + Math.random() * 11)),
        published: true,
        "author": {
            id: hash(authorName),
            name: authorName,
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

function generateDB() {
    // const minRangeValue = 4000;
    // const maxRangeValue = 12000;
    const minRangeValue = 14;
    const maxRangeValue = 35;
    const totalNewBooks = Math.floor(maxRangeValue + Math.random() * (maxRangeValue - minRangeValue + 1));
    const newBooks = [];
    for (let i = 0; i < totalNewBooks; ++i) {
        const book = generateBook();
        newBooks.push(book);
    }
    return JSON.stringify({
        books: newBooks,
        authors: authors,
    });
}

fs.writeFileSync('book.json', generateDB());
