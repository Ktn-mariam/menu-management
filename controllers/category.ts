import {Request, Response} from 'express'
import Category from '../models/category';
import { StatusCodes } from 'http-status-codes';


// To create a category
const addCategory = async (req: Request, res: Response) => {
  res.send('Add category')
}

export { addCategory }