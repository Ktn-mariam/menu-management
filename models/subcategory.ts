import { Document, Schema, Types, model } from 'mongoose'

// Name: String
// Image: URL
// Description: String
// Tax Applicability: Boolean, Default: Category tax applicability 
// Tax: Number, Default: Category tax number


const SubCategorySchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, "CategoryId is required to create a Sub Category"]
  },
  name: {
    type: String,
    required: [true, "Name is required to create a Sub Category"]
  },
  image: {
    type: String,
    required: [true, "Image is required to create a Sub Category"]
  },
  description: {
    type: String,
    required: [true, "Description is required to create a Sub Category"]
  },
  taxApplicability: {
    type: Boolean,
    required: [true, "Tax Applicability is required to create a Sub Category"]
  },
  tax: {
    type: Number,
  }
})


export default model('SubCategory', SubCategorySchema)