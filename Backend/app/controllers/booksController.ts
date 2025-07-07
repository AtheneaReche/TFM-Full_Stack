import { Request, Response } from 'express';
import db from '../../database/db'

//Get Method (all of them)
export const getBooks = async (req: Request, res: Response): Promise<void> => {
    try{
        const { author, publisher, genre } = req.query;
        let sql = `
                SELECT 
                books.id,
                books.name,
                books.book_cover,
                authors.name AS author,
                books.genre,
                books.publishing_year,
                publishers.name AS publisher,
                books.ISBN,
                books.description
            FROM books
            JOIN authors ON books.author = authors.id
            LEFT JOIN publishers ON books.publisher = publishers.id
        `;
        const conditions: string[] = [];
        const values: (string|number)[] = [];

        if (author) {
            conditions.push(`books.author = ?`);
            values.push(Number(author));
        }
        if (publisher) {
            conditions.push(`books.publisher = ?`);
            values.push(Number(publisher));
        }
        if (genre){
            conditions.push(`books.genre = ?`);
            values.push(genre.toString());
        }

        if (conditions.length > 0) {
            sql += ` WHERE ` + conditions.join(' AND ');
        }

        const [rows] = await db.execute(sql, values);
        res.status(200).json(rows);
    } catch (err){
        console.error(err);
        res.status(500).json({ message: 'Error fetching books' });
    }
};
//Get Method by Id
export const getBooksById = async (req: Request, res: Response): Promise<void> => {
    try{
        const { id } = req.params;
        const [rows]: any = await db.execute('SELECT * FROM books WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        res.status(200).json(rows[0]);
    } catch (err){
        console.error(err);
        res.status(500).json({ message: 'Error fetching Book' });
    }
};

//Create Method
export const createBooks = async (req: Request, res: Response): Promise<void> => {
    const { name, book_cover, author, genre, publishing_year, publisher, ISBN, description } = req.body;
    try{
        const [result]: any = await db.execute(`
                INSERT INTO books (
                name, 
                book_cover, 
                author, 
                genre, 
                publishing_year,
                publisher, 
                ISBN, 
                description) 
                VALUES (?,?,?,?,?,?,?,?)`, [
                    name, 
                    book_cover || null, 
                    author, 
                    genre || null, 
                    publishing_year || null, 
                    publisher || null, 
                    ISBN || null, 
                    description || null]
        );
        res.status(201).json({ message: 'Book created', bookId: result.insertId });
    } catch (err) {
        console.error('Error executing query: ' + err);
        res.status(500).json({ message: 'Error creating book' });
    }
};

//Delete Method by id
export const deleteBooks = async (req: Request, res: Response): Promise<void> =>{
    const { id } = req.params;
    try{
        const [result]: any = await db.execute('DELETE FROM books WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        res.status(200).json({ message: 'Book deleted' });
    } catch (err) {
        console.error('Error executing query: ' + err);
        res.status(500).json({ message: 'Error deleting book' });
    }
};

//Put Method by id
export const updateBooks = async (req: Request, res: Response): Promise<void> =>{
    const { id } = req.params;
    const { name, book_cover, author, genre, publishing_year, publisher, ISBN, description } = req.body;
    try{
        const [result]: any = await db.execute(`
                UPDATE books SET 
                name = ?, 
                book_cover = ?, 
                author = ?, 
                genre = ?, 
                publishing_year = ?, 
                publisher = ?, 
                ISBN = ?, 
                description = ? 
                WHERE id = ?`, [
                    name,
                    book_cover,
                    author,
                    genre,
                    publishing_year,
                    publisher,
                    ISBN,
                    description,
                    id
                ]
        );
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        res.status(200).json({ message: 'Book updated' });
    } catch (err) {
        console.error('Error executing query: ' + err);
        res.status(500).json({ message: 'Error updating book' });
    }
};