const Product = require('../models/Product')

const getAllProducts = async (req, res) => {
 try {
   const products = await Product.find({})
   res.json(products)
 } catch (error) {
   console.error(error)
   res.status(500).json({message: 'Server error.'})
  }
}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error.'
    })
  }
}

const addProduct = async (req,res) => {
  try {
  const name = req.body.name
  const description = req.body.description
  const maxquantity = req.body.maxquantity
  const instock = req.body.instock
  const cost = req.body.cost
  const imageurl = req.body.imageurl

  const newProduct = new Product({
    name,
    description,
    maxquantity,
    instock,
    cost, 
    imageurl
  });
  
  newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error found: ' + err))
    
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Server error.'
    })
  }
}


const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    res.json(product)
    res.json("Product deleted")
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: 'Server error.'
    })
  }
}


const updateProductById = async (req,res) => {
  try {
    Product.findById(req.params.id)
    .then(product => 
      {
        product.name = req.body.name
        product.description = req.body.description
        product.maxquantity = req.body.maxquantity
        product.instock = req.body.instock
        product.cost = req.body.cost
        product.imageurl = req.body.imageurl

        product.save()
          .then(() => res.json('Product updated!'))
          .catch(err => res.status(400).json('Error found: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: 'Server error.'
    })
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProductById,
  updateProductById
}