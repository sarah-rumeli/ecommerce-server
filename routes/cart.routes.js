const router = require("express").Router();
// const mongoose = require('mongoose');
 
const Cart = require('../models/Cart.model');
const User = require('../models/User.model');
const Product = require('../models/Product.model');
 
//  POST /api/cart  -  Creates a new cart
router.post('/', (req, res, next) => {
  const { user, product } = req.body;
 
  Cart.create({ user, product })
    .then(response => res.status(200).json(response))
    .catch(error => res.json(error));
});
 
module.exports = router;