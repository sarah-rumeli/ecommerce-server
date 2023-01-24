const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      product: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
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