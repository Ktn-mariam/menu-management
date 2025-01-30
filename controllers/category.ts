import {Request, Response} from 'express'
import Category from '../models/category';
import { StatusCodes } from 'http-status-codes';


// To create a category
const addCategory = async (req: Request, res: Response) => {
  const category = await Category.create({...req.body})

  res.status(StatusCodes.CREATED).json({category})
}


// To get All Categories
const getAllCategories = async (req: Request, res: Response) => {
  const categories = await Category.find({}).select('_id name')

  res.status(StatusCodes.OK).json({categories, nbHits: categories.length})
}

// To get Category
const getCategory = async (req: Request, res: Response) => {
  const {categoryId} = req.params
  const category = await Category.findOne({_id: categoryId })
  
  res.status(StatusCodes.OK).json({category})
}

export { addCategory, getAllCategories, getCategory }