import { Document, Schema, Types, model } from 'mongoose'

// Name: String
// Image: URL
// Description: String
// Tax Applicability: Boolean
// Tax: Number, if applicable
// Tax type

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required to create a Category']
  },
  image: {
    type: String,
    required: [true, 'Image is required to create a Category']
  },
  description: {
    type: String,
    required: [true, 'Description is required to create a Category']
  },
  taxApplicability: {
    type: Boolean,
    required: [true, 'Tax Applicability is required to create a Category']
  },
  tax: {
    type: Number,
    required: [true, 'Tax is required to create a Category']
  },
  taxType: {
    type: String,
    enum: ['INCOME', 'WEALTH', 'GIFT', 'CAPITAL GAINS', 'SECURITIES TRANSACTION', 'CORPORATE'],
    default: 'CORPORATE'
  }
})


export default model('Category', CategorySchema)