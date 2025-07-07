import { Request, Response } from 'express';
import db from '../../database/db'

//Get Method (all of them)
export const getPublishers = async (req: Request, res: Response): Promise<void> => {
    try{
        const [rows] = await db.execute('SELECT * FROM publishers');
        res.json(rows);
    } catch (err){
        console.error(err);
        res.status(500).json({ message: 'Error fetching publishers' });
    }
};
//Get Method by Id
export const getPublishersById = async (req: Request, res: Response): Promise<void> => {
    try{
        const { id } = req.params;
        const [rows]: any = await db.execute('SELECT * FROM publishers WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Publisher not found' });
            return;
        }
        res.json(rows[0]);
    } catch (err){
        console.error(err);
        res.status(500).json({ message: 'Error fetching publisher' });
    }
};

//Create Method
export const createPublishers = async (req: Request, res: Response): Promise<void> => {
    const { name, country } = req.body;
    try{
        const [result]: any = await db.execute(`
            INSERT INTO publishers (
                name, 
                country) 
            VALUES (?,?)`, [
                name, 
                country
            ]
        );
        res.status(201).json({ message: 'Publisher created', publisherId: result.insertId });
    } catch (err) {
        console.error('Error executing query: ' + err);
        res.status(500).json({ message: 'Error creating publisher' });
    }
};

//Delete Method by id
export const deletePublishers = async (req: Request, res: Response): Promise<void> =>{
    const { id } = req.params;
    try{
        const [result]: any = await db.execute(`DELETE FROM publishers WHERE id = ?`, [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Publisher not found' });
            return;
        }
        res.status(200).json({ message: 'Publisher deleted' });
    } catch (err) {
        console.error('Error executing query: ' + err);
        res.status(500).json({ message: 'Error deleting publisher' });
    }
};

//Put Method by id
export const updatePublishers = async (req: Request, res: Response): Promise<void> =>{
    const { id } = req.params;
    const { name, country } = req.body;
    try{
        const [result]: any = await db.execute(`
            UPDATE publishers SET 
                name = ?, 
                country = ? 
            WHERE id = ?`, [
                name, 
                country, 
                id
            ]
        );
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Publisher not found' });
            return;
        }
        res.status(200).json({ message: 'Publisher updated' });
    } catch (err) {
        console.error('Error executing query: ' + err);
        res.status(500).json({ message: 'Error updating publisher' });
    }
};