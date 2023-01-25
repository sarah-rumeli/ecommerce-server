const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      products: [{ 
        _id: {type: Schema.Types.ObjectId, ref: 'Product'},
        name: String,
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity cannot be less than 1.']
        }
      }],
      totalPrice: { type: Number, default: 0 },
      notes: {
        type: String,
      },
      status: {
        type: String,
        enum: ['inCart', 'unPaid', 'receivedPayment', 'dispatched', 'delivered']
      },
      orderDate: Date,
      dispatchDate: Date,
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
);
  
const Order = model("Order", orderSchema);
  
module.exports = Order;