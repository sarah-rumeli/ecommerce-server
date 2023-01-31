const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      products: [{ 
        _id: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
        name: String,
        quantity: {
          type: Number,
          default: 1,
          min: [1, 'Quantity can not be less than 1.']
        },
        price: { type: Number, required: true },
        img: String
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