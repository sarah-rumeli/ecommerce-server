const router = require("express").Router();
const mongoose = require('mongoose');
const fileUploader = require("../config/cloudinary.config");
const Product = require('../models/Product.model');
const Comment = require('../models/Comment.model');
const { isAuthenticated } = require("../middleware/jwt.middleware");

///////////////// cloudinary image upload ///////////////////////// 

router.post("/upload", fileUploader.single("img"), (req, res, next) => {
   console.log("file is: ", req.file);
 
  if (!req.file) {
    //next(new Error("No file uploaded!"));
    res.json({ fileUrl: "https://res.cloudinary.com/dq4j6xfee/image/upload/v1675008769/ecommerce/green-earth-22033_nnkjx4.jpg" });
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});

//////////////// cloudinary image upload ///////////////////////// 




//  POST /api/products  -  Creates a new product
router.post('/', 

(req, res, next) => {
  const { name, description, img, price, category,user } = req.body;
 
  Product.create({ name, description, img, price, category,user })
    .then(response => res.json(response))
    .catch(err => res.status(200).json(err));
});

// GET /api/products -  Retrieves all of the products
router.get('/', (req, res, next) => {
    Product.find().sort({createdAt:-1})
      .then(allProducts => res.json(allProducts))
      .catch(err => res.status(200).json(err));
});

//  GET /api/products/:productId -  Retrieves a specific product by id
router.get('/:productId', (req, res, next) => {
    const { productId } = req.params;
    const commentArr = [];
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Specified id is not valid'});
      return;
    }
    Product.findById(productId).populate("user")
      .then((products) => {
      res.status(200).json(products);
      })
});

// PUT  /api/products/:productId  -  Updates a specific product by id
router.put('/:productId', isAuthenticated, (req, res, next) => {
    const { productId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Product.findByIdAndUpdate(productId, req.body, { new: true })
      .then((updatedProduct) => res.json(updatedProduct))
      .catch(error => res.status(200).json(error));
});

// DELETE  /api/products/:productId  -  Deletes a specific product by id
router.delete('/:productId', isAuthenticated, (req, res, next) => {
    const { productId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Product.findByIdAndRemove(productId)
      .then(() => res.json({ message: `Product with ${productId} removed successfully.` }))
      .catch(error => res.status(200).json(error));
});
 
module.exports = router;