const router = require("express").Router();
const mongoose = require('mongoose');
 
const Cart = require('../models/Cart.model');
const User = require('../models/User.model');
const Product = require('../models/Product.model');

// GET /api/cart/:userId - View cart details of user
router.get('/:userId', (req, res, next) => {
  const { user } = req.params;

  Cart.findOne({user})
    .then((cart) => {
      if (cart && cart.products.length > 0) {
        res.status(200).json(cart);
      } else {
        res.status(200).json(null);
      }
    })
    .catch(error => res.status(500).json(error))
});
 
// POST /api/cart - Creates a new cart / updates users' cart
router.post("/", async (req, res, next) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    let product = await Product.findOne({ _id: productId });
    // check if product exists in DB
    if (!product) {
      res.status(404).send("Product not found!");
    }
    const price = product.price;
    const name = product.name;

    if (cart) {
      // if the user has a cart already
      // check if the product is in the cart
      //console.log("cart.products: ", cart.products);
      let productIndex = cart.products.findIndex((p) => p._id == productId);

      // Check if product exists in the cart
      // Product is already in cart, update quantity
      if (productIndex > -1) {
        let productItem = cart.products[productIndex];
        productItem.quantity = productItem.quantity + +quantity;
        cart.products[productIndex] = productItem;
      // Product is not in the cart, add the product into products array
      } else {
        cart.products.push({ _id: productId, name, quantity, price });
      }
      cart.total += +quantity * price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // no cart exists, create one
      Cart.create({
        user: userId,
        products: [{ _id: productId, name: name, quantity, price }],
        total: quantity * price,
      })
      .then(response => res.status(201).json(response))
      .catch(error => res.status(500).json(error))
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

// DELETE /api/cart/:productId - Removes product from users' cart
router.delete('/:productId', (req, res, next) => {
  const { productId } = req.params;
  const { userId } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Cart.findOne({user: userId})
      .then((cart) => {
        let productIndex = cart.products.findIndex(p => p._id == productId);
        if (productIndex > -1) {
            let productItem = cart.products[productIndex];
            cart.total -= productItem.quantity*productItem.price;
            cart.products.splice(productIndex,1);
        }
        cart = cart.save();
        return res.status(200).json({ message: `Product with ${productId} removed from cart successfully.` });
      })
      .catch(error => res.status(200).json(error));
});
 
module.exports = router;