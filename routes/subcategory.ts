// API to create sub category
// API to get all sub-categories
// API to get all sub categories under a category
// API to get a sub-category by name or ID along with its attributes
// API to edit sub category attributes

import { Router } from 'express';
import { addSubCategory, getAllSubCategories, getAllSubCategoriesOfCategory, getSubCategory, updateSubCategory } from '../controllers/subcategory';
const router = Router();

router.route('/').post(addSubCategory).get(getAllSubCategories)
router.route('/category/:categoryId').get(getAllSubCategoriesOfCategory)
router.route('/:subCategoryId').get(getSubCategory).patch(updateSubCategory)

export default router;