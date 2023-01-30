const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      product: {type: Schema.Types.ObjectId, ref: 'Product'},
    comment: {
        type: String,
      },
      rating:{
        type:Number,
        min: 1,
        max: 5
      }
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
);
  
const Comment = model("Comment", commentSchema);
  
module.exports = Comment;