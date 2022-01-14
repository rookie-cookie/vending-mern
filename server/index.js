require('dotenv').config()

const express = require("express")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 8000
const app = express()


const productRoutes = require('../routes/productRoutes')

//DB
const connectDB = require('../config/db')
connectDB()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json())

//CORS 
const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true, 
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions)) 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.use("/api/products", productRoutes)

app.get("/api", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.json({
    sodas: [
    {
      id: 1,
      name: 'Fizz',
      description: 'An effervescent fruity experience with hints of grape and coriander',
      maxquantity: '90',
      instock: '10',
      imageurl: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/2f681067522271.5b3cb6db2e669.jpg',
      cost: 1
    }, 
    {
      id: 2,
      name: 'Pop',
      description: 'An explosion of flavor that will knock your socks off!',
      maxquantity: '90',
      instock: '10',
      imageurl: 'https://res.cloudinary.com/wnotw/images/c_limit,w_1536,q_auto:good,f_auto/v1605652028/npmum5kybg05zizjxykh/soda-can-design',
      cost: 1
    },
    {
      id: 3,
      name: 'Cola',
      description: 'A basic no nonsense cola that is the perfect pick me up for any occasion',
      maxquantity: '190',
      instock: '10',
      imageurl: 'https://cdn.dribbble.com/users/660474/screenshots/2888374/cansoda.jpg',
      cost: 1
    }, 
    {
      id: 4,
      name: 'Mega Pop',
      description: 'So flavorful and so invigorating, it should probably be illegal.',
      maxquantity: '40',
      instock: '10',
      imageurl: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/999ab567522271.5b3cb6db2fbf6.jpg',
      cost: 1
    } ]   
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});