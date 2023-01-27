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
router.post("/", (req, res, next) => {
  const {user, products} = req.body;

  Cart.findOne({user: user})
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error })
      if (cart) {
        // if cart exists update cart quantity
        //console.log("user has a cart");
        const productId = products._id;
        const isProductInCart = cart.products.find(c => c._id == productId);
        let condition, action;

        if (isProductInCart) {
          //console.log("Product exists in cart");
          condition = { "user": user, "products._id": productId };
          action = {
            "$set": {
              "products.$": {
                ...products,
                quantity: isProductInCart.quantity + products.quantity
              }
            }
          };
          // Product is already in the cart, update the quantity
          Cart.findOneAndUpdate(condition, action)
          .exec((error, _cart) => {
            if (error) return res.status(400).json({ error });
            if (_cart) {
              return res.status(201).json({ cart: _cart});
            }
          })
        } else {
          // Product is NOT in the cart, add it
          condition = { user: user };
          action = {
            "$push": {
              "products": products
            }
          };
          Cart.findOneAndUpdate(condition, action)
          .exec((error, _cart) => {
            if (error) return res.status(400).json({ error });
            if (_cart) {
              return res.status(201).json({ cart: _cart});
            }
          })
          
        }
      
      } else {
        // if no cart, then create new one
        //console.log("NO CART");
        const cart = new Cart({
          user: user,
          products: [products]
        });
      
        cart.save((error, cart) => {
          if (error) return res.status(400).json({ error });
          if (cart) {
            return res.status(201).json({cart});
          }
        });
      }
    })
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