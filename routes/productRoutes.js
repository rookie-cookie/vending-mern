const express = require('express')
const router = express.Router()

const { 
  getAllProducts, 
  getProductById, 
  addProduct, 
  deleteProductById,
  updateProductById
} = require('../controller/productControllers')

//@desc      GET all products from db
//@route     GET /api/products
//@access    Public
router.get('/', getAllProducts)

//@desc      GET a product by ID from db
//@route     GET /api/products/:id
//@access    Public
router.get('/:id', getProductById)

//@desc      POST create a new product 
//@route     POST /api/products/add
//@access    Public
router.post('/add', addProduct)

//@desc      PATCH update a product by ID from db
//@route     PATCH /api/products/:id
//@access    Public
router.post('/update/:id', updateProductById)

//@desc      DELETE a product by ID from db
//@route     DELETE /api/products/:id
//@access    Public
router.delete('/:id', deleteProductById)


module.exports = router