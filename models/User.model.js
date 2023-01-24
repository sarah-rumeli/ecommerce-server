const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    contactName: {
      type: String,
      required: [true, "A Contact name is required."],
    },
    companyName: {
      type: String,
    },
    contactNumber: {
      type: Number,
      required: [true, "A Contact number is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    address1: {
      type: String,
      required: [true, "An address is required."],
    },
    address2: {
      type: String,
    },
    postCode: {
      type: String,
      required: [true, "A postal code is required."],
    },
    country: {
      type: String,
      required: [true, "Please select a country."],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
