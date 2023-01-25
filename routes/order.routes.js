const router = require("express").Router();
const mongoose = require('mongoose');
 
const Product = require('../models/Product.model');
const User = require('../models/User.model');
const Order = require('../models/Order.model');

// POST /api/orders - Creates a new order
router.post('/', (req, res, next) => {
  const { user, products, notes, status, orderDate } = req.body;
  //const userId = req.session.currentUser;
 
  Order.create({ user, products, notes, status, orderDate })
    .then(response => res.json(response))
    .catch(err => res.status(200).json(err));
});

// GET /api/orders - Retrieves all of the orders (has to be Admin! *** to implement ***)
router.get('/', (req, res, next) => {
    Order.find()
      .populate('products')
      .then(allOrders => res.json(allOrders))
      .catch(err => res.status(200).json(err));
});

//  GET /api/orders/:orderId -  Retrieves a specific order by id
// *** Only show orders that that USER created
// *** Admin can view any order by id
router.get('/:orderId', (req, res, next) => {
    const { orderId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    // Each Order document has a `product` array holding `_id`s of Products
    // We use .populate() method to get swap the `_id`s for the actual Products
    Order.findById(orderId)
      .populate('products')
      .then(order => res.status(200).json(order))
      .catch(error => res.status(200).json(error));
});

// PUT  /api/orders/:orderId - Updates a specific order by id
// *** Only update orders that that USER created
// *** Admin can update any order
router.put('/:orderId', (req, res, next) => {
    const { orderId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Order.findByIdAndUpdate(orderId, req.body, { new: true })
      .then((updatedOrder) => res.json(updatedOrder))
      .catch(error => res.status(200).json(error));
});

// DELETE  /api/orders/:orderId - Deletes a specific Order by id
// *** Only Admin can delete orders
router.delete('/:orderId', (req, res, next) => {
    const { orderId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Order.findByIdAndRemove(orderId)
      .then(() => res.json({ message: `Order with ${orderId} is removed successfully.` }))
      .catch(error => res.status(200).json(error));
});
 
module.exports = router;