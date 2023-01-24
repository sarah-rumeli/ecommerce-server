const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
    {
      name: {
        type: String,
        required: [true, "A category name is required."],
      },
      description: {
        type: String,
      },
      img: [String],
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
const Category = model("Category", categorySchema);
  
module.exports = Category;