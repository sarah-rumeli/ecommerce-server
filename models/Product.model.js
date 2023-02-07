const { Schema, model } = require("mongoose");


const productSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, "A product name is required."],
      },
      description: {
        type: String,
        required: [true, "A description is required."],
      },
      img:{
        type:String,
        required:false,
      },
      price: {
        type: Number,
        required: [true, "Price is required."],
      },
      category: {
        type: String,
        enum: ['Cleaning', 'Eco Fertilizers', 'Garden', 'Lifestyle', 'Organic Products', 'Outdoors', 'Portable Power', 'Reclaimed Textiles', 'Refurbished Electronics', 'Water Conservation'],
        required: [true, "Please select at least one category"],
      },
      rating:{
        type:Number,
        default:0},
      user:{type: Schema.Types.ObjectId, ref: 'User'}
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
);
  
const Product = model("Product", productSchema);
  
module.exports = Product;