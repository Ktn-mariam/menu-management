import { Request, Response, NextFunction } from "express";
import Category from "../models/category";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";

// To create a category
const addCategory = async (req: Request, res: Response, next: NextFunction ) => {
  const category = await Category.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({ category });
};

// To get All Categories
const getAllCategories = async (req: Request, res: Response, next: NextFunction ) => {
  const categories = await Category.find({}).select("_id name");

  res.status(StatusCodes.OK).json({ categories, nbHits: categories.length });
};

// To get Category
const getCategory = async (req: Request, res: Response, next: NextFunction ) => {
  const { categoryId } = req.params;
  const category = await Category.findOne({ _id: categoryId });

  res.status(StatusCodes.OK).json({ category });
};

// To update category
const updateCategory = async (req: Request, res: Response, next: NextFunction ) => {
  const { categoryId } = req.params;

  let updateFields: any = {};

  if (req.body.name) updateFields.name = req.body.name;
  if (req.body.image) updateFields.image = req.body.image;
  if (req.body.description) updateFields.description = req.body.description;
  if (Object.prototype.hasOwnProperty.call(req.body, "taxApplicability"))
    updateFields.taxApplicability = req.body.taxApplicability;
  if (req.body.tax) updateFields.tax = req.body.tax;
  if (req.body.taxType) updateFields.taxType = req.body.taxType;

  let updatedCategory;
  if (
    Object.prototype.hasOwnProperty.call(req.body, "taxApplicability") &&
    !req.body.taxApplicability
  ) {
    updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $set: updateFields, $unset: { tax: 1, taxType: 1 } },
      { new: true, runValidators: true }
    );
  }

  updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  res.json({ category: updatedCategory });
};

export { addCategory, getAllCategories, getCategory, updateCategory };
