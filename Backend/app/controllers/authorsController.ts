import { Request, Response } from 'express';
import db from '../../database/db'

//Get Method (all of them)
export const getAuthors = async (req: Request, res: Response): Promise<void> => {
    try{
        const [rows] = await db.execute('SELECT * FROM authors');
        res.json(rows);
    } catch (err){
        console.error(err);
        res.status(500).json({ message: 'Error fetching authors' });
    }
};
//Get Method by Id
export const getAuthorsById = async (req: Request, res: Response): Promise<void> => {
    try{
        const { id } = req.params;
        const [rows]: any = await db.execute('SELECT * FROM authors WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Author not found' });
            return;
        }
        res.json(rows[0]);
    } catch (err){
        console.error(err);
        res.status(500).json({ message: 'Error fetching author' });
    }
};

//Create Method
export const createAuthors = async (req: Request, res: Response): Promise<void> => {
    const { name, authorPicture, biography, birthdate, deceaseDate } = req.body;
    try{
        const [result]: any = await db.execute(`
            INSERT INTO authors (
                name, 
                author_picture, 
                biography, 
                birthdate, 
                decease_date 
                ) 
            VALUES (?,?,?,?,?)`, [
                name, 
                authorPicture||null, 
                biography||null, 
                birthdate || null, 
                deceaseDate || null
            ]
        );
        res.status(201).json({ message: 'Author created', authorId: result.insertId });
    } catch (err) {
        console.error('Error executing query: ' + err);
        res.status(500).json({ message: 'Error creating author' });
    }
};

//Delete Method by id
export const deleteAuthors = async (req: Request, res: Response): Promise<void> =>{
    const { id } = req.params;
    try{
        const [result]: any = await db.execute('DELETE FROM authors WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Author not found' });
            return;
        }
        res.status(200).json({ message: 'Author deleted' });
    } catch (err) {
        console.error('Error executing query: ' + err);
        res.status(500).json({ message: 'Error deleting author' });
    }
};

//Put Method by id
export const updateAuthors = async (req: Request, res: Response): Promise<void> =>{
    const { id } = req.params;
    const { name, authorPicture, biography, birthdate, deceaseDate } = req.body;
    try{
        const [result]: any = await db.execute(`
            UPDATE authors SET 
                name = ?, 
                author_picture = ?, 
                biography = ?, 
                birthdate = ?, 
                decease_date = ?
            WHERE id = ?`, [
                name, 
                authorPicture, 
                biography, 
                birthdate, 
                deceaseDate, 
                id
            ]
        );
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Author not found' });
            return;
        }
        res.status(200).json({ message: 'Author updated' });
    } catch (err) {
        console.error('Error executing query: ' + err);
        res.status(500).json({ message: 'Error updating author' });
    }
};