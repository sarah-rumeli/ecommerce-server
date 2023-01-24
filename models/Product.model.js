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
      img: String,
      price: {
        type: Number,
        required: [true, "Price is required."],
      },
      category: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Please select at least one category"],
      }],
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
);
  
const Product = model("Product", productSchema);
  
module.exports = Product;