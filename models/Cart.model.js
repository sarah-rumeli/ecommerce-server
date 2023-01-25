const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      products: [{ 
        productId: {type: Schema.Types.ObjectId, ref: 'Product'},
        name: String,
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity can not be less than 1.'],
          default: 1
        }
       }],
       total: {type: Number, required: true, default: 0}
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
);
  
const Cart = model("Cart", cartSchema);
  
module.exports = Cart;