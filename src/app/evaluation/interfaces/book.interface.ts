import { Author } from "./author.interface";

export interface Book {
    id: string | undefined,
    title: string | undefined,
    description: string | undefined,
    year: number | undefined,
    idAuthor: string | undefined,
    author: Author | undefined,
    published: boolean | undefined,
    registeredDate: string | undefined,
}
