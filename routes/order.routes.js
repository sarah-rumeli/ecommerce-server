const router = require("express").Router();
 
// const mongoose = require('mongoose');
 
const Product = require('../models/Product.model');
const User = require('../models/User.model');
const Order = require('../models/Order.model');

// POST /api/orders - Creates a new order // don't forget to add functionality for adding multiple products
router.post('/', (req, res, next) => {
  const { user, products, notes, status, orderDate } = req.body;
  //const userId = req.session.currentUser;
 
  Order.create({ user, products, notes, status, orderDate })
    .then(response => res.json(response))
    .catch(err => res.status(200).json(err));
});

// GET /api/order - Retrieves all of the orders (has to be Admin! *** to implement ***)
router.get('/', (req, res, next) => {
    Order.find()
      .populate('products')
      .then(allOrders => res.json(allOrders))
      .catch(err => res.status(200).json(err));
});

//  GET /api/products/:productId -  Retrieves a specific product by id
router.get('/:productId', (req, res, next) => {
    const { productId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    // Each Products document has a `category` array holding `_id`s of Categories
    // We use .populate() method to get swap the `_id`s for the actual Categories
    Product.findById(productId)
      .populate('category')
      .then(product => res.status(200).json(product))
      .catch(error => res.status(200).json(error));
});

// PUT  /api/products/:productId  -  Updates a specific product by id
router.put('/projects/:productId', (req, res, next) => {
    const { productId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Product.findByIdAndUpdate(productId, req.body, { new: true })
      .then((updatedProduct) => res.json(updatedProduct))
      .catch(error => res.status(200).json(error));
});

// DELETE  /api/products/:productId  -  Deletes a specific project by id
router.delete('/:productId', (req, res, next) => {
    const { productId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Product.findByIdAndRemove(productId)
      .then(() => res.json({ message: `Product with ${productId} is removed successfully.` }))
      .catch(error => res.status(200).json(error));
});
 
module.exports = router;