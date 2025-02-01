import { Document, Schema, Types, model } from 'mongoose'

// Name: String
// Image: URL
// Description: String
// Tax Applicability: Boolean
// Tax: Number, if applicable
// Base Amount: Number
// Discount: Number
// Total Amount: Number (Base - Discount)

const ItemSchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  subCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  name: {
    type: String,
    required: [true, 'Name is required to create an item']
  },
  image: {
    type: String,
    required: [true, 'Image is required to create an item']
  },
  description: {
    type: String,
    required: [true, 'Description is required to create an item']
  },
  taxApplicability: {
    type: Boolean,
    required: [true, 'Tax Applicability is required to create an item']
  },
  tax: {
    type: Number,
    required: [true, 'Tax is required to create an item']
  },
  baseAmount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  }
})


export default model('Item', ItemSchema)