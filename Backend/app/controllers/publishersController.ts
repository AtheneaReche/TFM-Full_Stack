import { Request, Response } from 'express';
import db from '../../database/db'

//Get Method (all of them)
export const getPublishers = async (req: Request, res: Response): Promise<void> => {
    try{
        const [rows] = await db.execute('SELECT * FROM publishers');
        res.json(rows);
    } catch (err){
        console.error(err);
        res.status(500).send('Error fetching publishers ' + err)
    }
    res.status(200).send();
};
//Get Method by Id
export const getPublishersById = async (req: Request, res: Response): Promise<void> => {
    try{
        const { id } = req.params;
        const publisher = await db.execute('SELECT * FROM publishers WHERE id = ?', [id]);
        res.json(publisher);
    } catch (err){
        console.error(err);
        res.status(500).send('Error fetching publishers ' + err)
    }
    res.status(200).send();
};

//Create Method
export const createPublishers = async (req: Request, res: Response): Promise<void> => {
    const { name, country } = req.body;
    try{
        const [result] = await db.execute(`
            INSERT INTO publishers (
                name, 
                country) 
            VALUES (?,?)`, [
                name, 
                country
            ]
        );
        console.log('Added publisher', result);
    } catch (err) {
        console.error('Error executing query: ' + err);
    }
    res.status(200).send();
};

//Delete Method by id
export const deletePublishers = async (req: Request, res: Response): Promise<void> =>{
    const { id } = req.params;
    try{
        const [result] = await db.execute(`DELETE FROM publishers WHERE id = ?`, [id]);
        console.log('Deleted publisher', result);
    } catch (err) {
        console.error('Error executing query: ' + err);
    }
    res.status(200).send();
};

//Put Method by id
export const updatePublishers = async (req: Request, res: Response): Promise<void> =>{
    const { id } = req.params;
    const { name, country } = req.body;
    try{
        const [result] = await db.execute(`
            UPDATE publishers SET 
                name = ?, 
                country = ? 
            WHERE id = ?`, [
                name, 
                country, 
                id
            ]
        );
        console.log('Updated publisher', result);
    } catch (err) {
        console.error('Error executing query: ' + err);
    }
    res.status(200).send();
};