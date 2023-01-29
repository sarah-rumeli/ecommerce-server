const router = require("express").Router();
const mongoose = require('mongoose');
 
const Product = require('../models/Product.model');
const User = require('../models/User.model');
const Order = require('../models/Order.model');
const { isAuthenticated } = require("../middleware/jwt.middleware");

// GET /api/orders - Form for a new order, get product details...
/*router.get('/:productId', (req, res, next) => {
  const { productId } = req.params;
  //const { user, products, notes, status, orderDate } = req.body;
  let data = {};
  
  Product.findById({_id: productId})
    .then((product) => {
      //console.log(data);
      data.product = product;
      //console.log(product.name);
      res.status(200).json(product)
    })
    .catch(error => res.status(500).json(error));
});*/

// POST /api/orders - Creates a new order
router.post('/', isAuthenticated, (req, res, next) => {
  const { userId, products, totalPrice, notes, status } = req.body;
  console.log(req.body);
  Order.create({userId, products, totalPrice, notes, status})
  .then(() => res.status(200).json({ message: `Order placed succcessfully. Thank you for shopping with us.` }))
    .catch(error => res.status(500).json(error));
});

// GET /api/orders - Retrieves all of the orders (has to be Admin! *** to implement ***)
router.get('/',isAuthenticated, (req, res, next) => {
    Order.find().sort({orderDate:-1})
      .populate('userId')
      .then(allOrders => res.status(200).json(allOrders))
      .catch(error => res.status(500).json(error));
});

//  GET /api/orders/:orderId -  Retrieves a specific order by id
// *** Only show orders that that USER created
// *** Admin can view any order by id
router.get('/:orderId',isAuthenticated,(req, res, next) => {
    const {orderId} = req.params;
    console.log(
      "order is",orderId
    );
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    // Each Order document has a `product` array holding `_id`s of Products
    // We use .populate() method to get swap the `_id`s for the actual Products
    Order.findById(orderId).populate("userId")
     
      .then((order) => {
        console.log(
          "order is",order
        );
        res.status(200).json(order)
      })
      .catch(error => res.status(500).json(error));
});

// PUT  /api/orders/:orderId - Updates a specific order by id
// *** Only update orders that that USER created
// *** Admin can update any order
router.put('/:orderId',isAuthenticated, (req, res, next) => {
    const { orderId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Order.findByIdAndUpdate(orderId, req.body, { new: true })
      .then((updatedOrder) => res.status(200).json(updatedOrder))
      .catch(error => res.status(500).json(error));
});

// DELETE  /api/orders/:orderId - Deletes a specific Order by id
// *** Only Admin can delete orders
router.delete('/:orderId', isAuthenticated,(req, res, next) => {
    const { orderId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Order.findByIdAndRemove(orderId)
      .then(() => res.status(200).json({ message: `Order with ${orderId} is removed successfully.` }))
      .catch(error => res.status(500).json(error));
});
 
module.exports = router;