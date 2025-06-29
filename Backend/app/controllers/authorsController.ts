import { Request, Response } from 'express';
import db from '../../database/db'

//Get Method (all of them)
export const getAuthors = async (req: Request, res: Response): Promise<void> => {
    try{
        const [rows] = await db.execute('SELECT * FROM authors');
        res.json(rows);
    } catch (err){
        console.error(err);
        res.status(500).send('Error fetching authors ' + err)
    }
    res.status(200).send();
};
//Get Method by Id
export const getAuthorsById = async (req: Request, res: Response): Promise<void> => {
    try{
        const { id } = req.params;
        const author = await db.execute('SELECT * FROM authors WHERE id = ?', [id]);
        res.json(author);
    } catch (err){
        console.error(err);
        res.status(500).send('Error fetching authors ' + err)
    }
    res.status(200).send();
};

//Create Method
export const createAuthors = async (req: Request, res: Response): Promise<void> => {
    const { name, authorPicture, biography, birthdate, deceaseDate } = req.body;
    try{
        const [result] = await db.execute(`
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
        console.log('Added author', result);
    } catch (err) {
        console.error('Error executing query: ' + err);
    }
    res.status(200).send();
};

//Delete Method by id
export const deleteAuthors = async (req: Request, res: Response): Promise<void> =>{
    const { id } = req.params;
    try{
        const [result] = await db.execute('DELETE FROM authors WHERE id = ?', [id]);
        console.log('Deleted author', result);
    } catch (err) {
        console.error('Error executing query: ' + err);
    }
    res.status(200).send();
};

//Put Method by id
export const updateAuthors = async (req: Request, res: Response): Promise<void> =>{
    const { id } = req.params;
    const { name, authorPicture, biography, birthdate, deceaseDate } = req.body;
    try{
        const [result] = await db.execute(`
            UPDATE authors SET 
                name = ?, 
                author_picture = ?, 
                biography = ?, 
                birthdate = ?, 
                decease_date = ?, 
            WHERE id = ?`, [
                name, 
                authorPicture, 
                biography, 
                birthdate, 
                deceaseDate, 
                id
            ]
        );
        console.log('Updated author', result);
    } catch (err) {
        console.error('Error executing query: ' + err);
    }
    res.status(200).send();
};