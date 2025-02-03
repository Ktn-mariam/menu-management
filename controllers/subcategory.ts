import { Request, Response, NextFunction } from "express";
import SubCategory from "../models/subcategory";
import { StatusCodes } from "http-status-codes";
import Category from "../models/category";
import { NotFoundError } from "../errors";

// To create a subcategory
const addSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let taxApplicability;
  let tax;
  if (!req.body.taxApplicability || !req.body.tax) {
    const parentCategory = await Category.findOne({ _id: req.body.categoryId });

    taxApplicability = parentCategory?.taxApplicability;
    tax = parentCategory?.tax;
  }

  const subCategory = await SubCategory.create({
    taxApplicability,
    tax,
    ...req.body,
  });

  res.status(StatusCodes.CREATED).json({ subCategory });
};

// To get all subcategories
const getAllSubCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subCategories = await SubCategory.find({}).select("_id name");

  res
    .status(StatusCodes.OK)
    .json({ subCategories, nbHits: subCategories.length });
};

// To get all sub categories under a category
const getAllSubCategoriesOfCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  const subCategories = await SubCategory.find({ categoryId }).select(
    "_id name"
  );

  res
    .status(StatusCodes.OK)
    .json({ subCategories, nbHits: subCategories.length });
};

// To get all sub categories under a category
const getSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { subCategoryId } = req.params;
  const subCategory = await SubCategory.findOne({ _id: subCategoryId });

  res.status(StatusCodes.OK).json({ subCategory });
};

// To update subCategory
const updateSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { subCategoryId } = req.params;

  let updateFields: any = {};

  if (req.body.name) updateFields.name = req.body.name;
  if (req.body.image) updateFields.image = req.body.image;
  if (req.body.description) updateFields.description = req.body.description;
  if (req.body.description) updateFields.categoryId = req.body.categoryId;
  if (Object.prototype.hasOwnProperty.call(req.body, "taxApplicability"))
    updateFields.taxApplicability = req.body.taxApplicability;
  if (req.body.tax) updateFields.tax = req.body.tax;
  if (req.body.taxApplicability && !req.body.tax) {
    const prevSubCategory = await SubCategory.findOne({ _id: subCategoryId });

    if (!prevSubCategory) {
      next(new NotFoundError(`SubCategory Not Found: ${subCategoryId}`));
      return;
    }

    const parentCategory = await Category.findOne({
      _id: prevSubCategory.categoryId,
    });

    updateFields.tax = parentCategory?.tax;
  }

  let updatedSubCategory;
  if (
    Object.prototype.hasOwnProperty.call(req.body, "taxApplicability") &&
    !req.body.taxApplicability
  ) {
    updatedSubCategory = await SubCategory.findByIdAndUpdate(
      subCategoryId,
      { $set: updateFields, $unset: { tax: 1, taxType: 1 } },
      { new: true, runValidators: true }
    );

  }

  updatedSubCategory = await SubCategory.findByIdAndUpdate(
    subCategoryId,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  res.json({ category: updatedSubCategory });
};

export {
  addSubCategory,
  getAllSubCategories,
  getAllSubCategoriesOfCategory,
  getSubCategory,
  updateSubCategory,
};
