// API to create Item
// API to get all items 
// API to get all items under a category
// API to get all items under a sub-category
// API to get an item by name or ID along with its attributes
// API to edit sub category
// API to search the item by its name

import { Router } from 'express';
import { getAllItems, getAllItemsOfCategory, getAllItemsOfSubCategory, getItem, addItem, updateItem, searchItem } from '../controllers/item';
const router = Router();

router.route('/').get(getAllItems).post(addItem);
router.route('/category/:categoryId').get(getAllItemsOfCategory);
router.route('/subCategory/:subCategoryId').get(getAllItemsOfSubCategory);
router.route('/search').get(searchItem)
router.route('/:itemId').get(getItem).patch(updateItem);

export default router;