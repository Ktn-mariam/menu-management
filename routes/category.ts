// API to create Category
// API to get all categories
// API to get a category by name or ID along with its attributes
// API to edit category attributes

import {Router} from 'express'
import { addCategory, getAllCategories, getCategory } from '../controllers/category'
const router = Router()

router.route('/').post(addCategory).get(getAllCategories)
router.route('/:categoryId').get(getCategory)

export default router