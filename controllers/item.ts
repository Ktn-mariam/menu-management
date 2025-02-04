import { Request, Response, NextFunction } from "express";
import Item from "../models/item";
import { StatusCodes } from "http-status-codes";
import SubCategory from "../models/subcategory";
import Category from "../models/category";
import { BadRequestError, NotFoundError } from "../errors";

// To create a Item
const addItem = async (req: Request, res: Response, next: NextFunction) => {
  let totalAmount = req.body.totalAmount
    ? req.body.totalAmount
    : req.body.baseAmount - req.body.discount;

  let subCategory;
  let category;
  if (req.body.subCategoryId) {
    subCategory = await SubCategory.findOne({
      _id: req.body.subCategoryId,
    });

    if (!subCategory) {
      next(
        new BadRequestError(
          `SubCategory ${req.body.subCategoryId} does not exist`
        )
      );
    }
  }

  if (req.body.categoryId) {
    category = await Category.findOne({
      _id: req.body.categoryId,
    });

    if (!category) {
      next(
        new BadRequestError(`Category ${req.body.categoryId} does not exist`)
      );
    }
  }

  let tax;
  let taxApplicability;
  let categoryId;
  if (!req.body.categoryId || !req.body.taxApplicability || !req.body.tax) {
    categoryId = subCategory?.categoryId;
    taxApplicability = subCategory?.taxApplicability;
    tax = subCategory?.tax;
  }

  const item = await Item.create({
    categoryId,
    totalAmount,
    tax,
    taxApplicability,
    ...req.body,
  });
  res.status(StatusCodes.CREATED).json({ item });
};

// To get All Items
const getAllItems = async (req: Request, res: Response, next: NextFunction) => {
  const items = await Item.find({}).select("_id name");

  res.status(StatusCodes.OK).json({ items, nbHits: items.length });
};

// To get All Items of Category
const getAllItemsOfCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  const items = await Item.find({ categoryId }).select("_id name");

  res.status(StatusCodes.OK).json({ items, nbHits: items.length });
};

// To get All Items of Sub Category
const getAllItemsOfSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { subCategoryId } = req.params;
  const items = await Item.find({ subCategoryId }).select("_id name");

  res.status(StatusCodes.OK).json({ items, nbHits: items.length });
};

// To get Item with all its attributes
const getItem = async (req: Request, res: Response, next: NextFunction) => {
  const { itemId } = req.params;
  const item = await Item.findOne({ _id: itemId });

  if (!item) {
    next(new NotFoundError(`Item ${itemId} not found`))
  }

  res.status(StatusCodes.OK).json({ item });
};

// To search item by its name (returns items that contain any word in their name from the search query string)
const searchItem = async (req: Request, res: Response, next: NextFunction) => {
  const { searchName } = req.query;

  if (searchName) {
    const queryStrings = (searchName as string).split(" ");
    const allQueries: { name: { $regex: String, $options: String }; }[] = [];

    queryStrings.forEach((element: any) => {
      allQueries.push({ name: { $regex: String(element), $options: "i" } });
    });

    const allItems = await Item.find({ $or: allQueries });
    res.status(StatusCodes.OK).json({ allItems });
  } else {
    const items = await Item.find({});
    res.status(StatusCodes.OK).json({ items });
  }
};

// To update item
const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  const { itemId } = req.params;

  let updateFields: any = {};

  if (req.body.name) updateFields.name = req.body.name;
  if (req.body.image) updateFields.image = req.body.image;
  if (req.body.description) updateFields.description = req.body.description;
  if (Object.prototype.hasOwnProperty.call(req.body, "taxApplicability"))
    updateFields.taxApplicability = req.body.taxApplicability;
  if (req.body.tax) updateFields.tax = req.body.tax;
  if (req.body.taxType) updateFields.taxType = req.body.taxType;
  if (req.body.baseAmount) updateFields.baseAmount = req.body.baseAmount;
  if (req.body.discount) updateFields.discount = req.body.discount;
  if (req.body.totalAmount) updateFields.totalAmount = req.body.totalAmount;

  if (req.body.baseAmount) {
    const originalItem = await Item.findOne({ _id: itemId });
    if (!originalItem) {
      next(new NotFoundError("item Not Found"));
      return;
    }
    updateFields.totalAmount = req.body.baseAmount - originalItem.discount;
  }

  if (req.body.discount) {
    const originalItem = await Item.findOne({ _id: itemId });
    if (!originalItem) {
      next(new NotFoundError("item Not Found"));
      return;
    }
    updateFields.totalAmount = originalItem.baseAmount - req.body.discount;
  }

  let updatedItem;
  if (
    Object.prototype.hasOwnProperty.call(req.body, "taxApplicability") &&
    !req.body.taxApplicability
  ) {
    updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { $set: updateFields, $unset: { tax: 1, taxType: 1 } },
      { new: true, runValidators: true }
    );
  }

  updatedItem = await Item.findByIdAndUpdate(
    itemId,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  res.json({ item: updatedItem });
};

export {
  addItem,
  getAllItems,
  getAllItemsOfCategory,
  getAllItemsOfSubCategory,
  getItem,
  searchItem,
  updateItem,
};
