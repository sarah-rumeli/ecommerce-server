const router = require("express").Router();
const mongoose = require('mongoose');
const fileUploader = require("../config/cloudinary.config");
const Product = require('../models/Product.model');
const Comment = require('../models/Comment.model')
const { isAuthenticated } = require("../middleware/jwt.middleware");

//GET /api/products/:productId/comments - Display all comments for a product

router.get('/:productId/comments',(req,res,next) =>{
  const {productId} = req.params;
  console.log("productId is",productId);
  Comment.find({product:productId}).populate("userId").sort({createdAt:-1})
  .then(response =>{
    console.log(response)
    res.json(response)
  })
  .catch(err => res.status(200).json(err))
})






//  POST /api/products/:productId/comments  -  Creates a new comment
router.post('/:productId/comments', (req, res, next) => {
  const { comment,product, rating, userId } = req.body;
  
 
  Comment.create({comment,rating,product:product,userId})
    .then(response => res.json(response))
    .catch(err => res.status(200).json(err));
});



// PUT  /api/products/:productId/comments/:commentId  -  Updates a specific comment by id
router.put('/:productId/comments/:commentId', (req, res, next) => {
    const { product } = req.params.productId;
    const {commentId} = req.params.commentId;
   
    if (!mongoose.Types.ObjectId.isValid(product)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Comment.findByIdAndUpdate(commentId, req.body, { new: true })
      .then((updatedComment) => res.json(updatedComment))
      .catch(error => res.status(200).json(error));
});

// DELETE  /api/products/:productId/comments/:commentId  -  Deletes a specific comment by id
router.delete('/:productId/comments/:commentId', (req, res, next) => {
    const { product } = req.params.productId;
    const {commentId} = req.params.commentId;
       
    if (!mongoose.Types.ObjectId.isValid(product)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Comment.findByIdAndRemove(commentId)
      .then(() => res.json({ message: `Comment with ${commentId} removed successfully.`}))
      .catch(error => res.status(200).json(error));
});
 
module.exports = router;