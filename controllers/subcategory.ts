import { Request, Response } from "express";
import SubCategory from "../models/subcategory";
import { StatusCodes } from "http-status-codes";

// To create a subcategory
const addSubCategory = async (req: Request, res: Response) => {
  const subCategory = await SubCategory.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({ subCategory });
};

// To get all subcategories
const getAllSubCategories = async (req: Request, res: Response) => {
  const subCategories = await SubCategory.find({}).select("_id name");

  res
    .status(StatusCodes.OK)
    .json({ subCategories, nbHits: subCategories.length });
};

// To get all sub categories under a category
const getAllSubCategoriesOfCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const subCategories = await SubCategory.find({ categoryId }).select(
    "_id name"
  );

  res
    .status(StatusCodes.OK)
    .json({ subCategories, nbHits: subCategories.length });
};

// To get all sub categories under a category
const getSubCategory = async (req: Request, res: Response) => {
  const { subCategoryId } = req.params;
  const subCategory = await SubCategory.findOne({ _id: subCategoryId });

  res.status(StatusCodes.OK).json({ subCategory });
};

// To update subCategory
const updateSubCategory = async (req: Request, res: Response) => {
  const { subCategoryId } = req.params;

  let updateFields: any = {};

  if (req.body.name) updateFields.body = req.body.name;
  if (req.body.image) updateFields.image = req.body.image;
  if (req.body.description) updateFields.description = req.body.description;
  if (Object.prototype.hasOwnProperty.call(req.body, "taxApplicability"))
    updateFields.taxApplicability = req.body.taxApplicability;
  if (req.body.tax) updateFields.tax = req.body.tax;

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

    if (!updatedSubCategory) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "SubCategory not found" });
      return;
    }
  }

  updatedSubCategory = await SubCategory.findByIdAndUpdate(
    subCategoryId,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  if (!updatedSubCategory) {
    res.status(StatusCodes.NOT_FOUND).json({ error: "SubCategory not found" });
    return;
  }

  res.json({ category: updatedSubCategory });
};

export {
  addSubCategory,
  getAllSubCategories,
  getAllSubCategoriesOfCategory,
  getSubCategory,
  updateSubCategory,
};
