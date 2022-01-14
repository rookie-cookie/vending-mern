const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String, 
    required: true
  },
  maxquantity: {
    type: Number, 
    required: true
  },
  instock: {
    type: Number,
    required: true
  },
  imageurl: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }

})

const Product = mongoose.model('product', productSchema)

module.exports = Product