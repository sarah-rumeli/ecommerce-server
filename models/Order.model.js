const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      products: [{ 
        productId: {type: Schema.Types.ObjectId, ref: 'Product'},
        name: String,
        quantity: {
          type: Number,
          default: "1",
          min: [1, 'Quantity cannot be less than 1.']
        },
        price: Number
      }],
      totalPrice: { type: Number, default: 0 },
      notes: {
        type: String,
      },
      status: {
        type: String,
        enum: ['Awaiting Payment', 'Received Payment', 'Dispatched', 'Delivered']
      },
      dispatchDate: {type: Date,
        default: function () {
          let currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + 2);
          return currentDate;
      }},
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
);
  
const Order = model("Order", orderSchema);
  
module.exports = Order;