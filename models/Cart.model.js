const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      product: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
);
  
const Cart = model("Cart", cartSchema);
  
module.exports = Cart;