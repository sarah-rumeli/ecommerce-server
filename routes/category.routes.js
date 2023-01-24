const router = require("express").Router();
const mongoose = require('mongoose');
 
const Category = require('../models/Category.model');
const Product = require('../models/Product.model');
 
//  POST /api/category  -  Creates a new category // add image to category (Multiple...)
router.post('/', (req, res, next) => {
  const { name, description, img } = req.body;
 
  Category.create({ name, description, img })
    .then(response => res.status(200).json(response))
    .catch(error => res.json(error));
});

// GET /api/category -  Retrieves all of the categories
router.get('/', (req, res, next) => {
    Category.find()
      .then(allCategories => res.json(allCategories))
      .catch(err => res.status(200).json(err));
});

//  GET /api/category/:categoryId -  Retrieves a specific category by id
router.get('/:categoryId', (req, res, next) => {
  const { categoryId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Category.findById(categoryId)
    .then(category => res.status(200).json(category))
    .catch(error => res.status(200).json(error));
});

// PUT  /api/category/:categoryId  -  Updates a specific category by id
router.put('/:categoryId', (req, res, next) => {
    const { categoryId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Category.findByIdAndUpdate(categoryId, req.body, { new: true })
      .then((updatedCategory) => res.json(updatedCategory))
      .catch(error => res.status(200).json(error));
});

// DELETE  /api/category/:categoryId  -  Deletes a specific category by id
// Do not delete a category if has associated products
router.delete('/:categoryId', (req, res, next) => {
    const { categoryId } = req.params;
    let data = {};
    
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    Product.find({category: categoryId})
      .then((result) => {
        data.category = result;
        
        if (data.category.length > 0) {
          res.status(409).json({ message: `Category with ${categoryId} has associated Products, cannot be removed.` })
        } else {
          Category.findByIdAndRemove(categoryId)
            .then(() => res.json({ message: `Category with ${categoryId} removed successfully.` }))
            .catch(error => res.status(200).json(error));
        }
      })
      .catch(error => res.status(200).json(error));
    
});
 
module.exports = router;