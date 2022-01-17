import React, { useState, useEffect, useCallback } from 'react'
import MediaCard from '../components/product-card.component'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import FixedBottomNavigation from '../components/checkout-button.component'
// import { Data } from '../components/data'

import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'


// const fetchURL = "http://localhost:8000/api"; //fetch data from local 
// const fetchURL = "http://localhost:8000/api/products";  //fetch data from DB 

let fetchURL 

if (process.env.NODE_ENV !== 'production') {
  fetchURL = "http://localhost:8000/api/products"
} else {
  fetchURL = "https://vending-mern.herokuapp.com/api/products"
}

const getItems = () => fetch(fetchURL).then(res => res.json());


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  color: 'black'
};


function Homepage() {

  // const [data, setData] = useState({sodas: []})
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)

  const [money, setMoney] = useState(0)
  const [card, setCard] = useState(0)
  const [cvv, setCvv] = useState(0)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    getItems().then(soda => setData(soda));
    setLoading(false)
  }, []);

  const handleSetmoney = (e) => {
    if (card && cvv){
      setMoney(e.target.value)
    }
  }

  return (
    <div>
    
      <Container>
      <h2>WELCOME TO COLACO</h2>
      
      <Button onClick={handleOpen} variant="contained" style={{float: 'right'}}>LOAD CARD</Button>
      <Button  style={{float: 'left', color: "white"}}>CURRENT BALANCE $ {money}</Button>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            LOAD CARD
          </Typography>
          <TextField fullWidth required type="number" label="Card Number" id="item-name" margin="dense" sx={{backgroundColor: 'white'}} 
          onChange={e => setCard(e.target.value)} 
          placeholder="1234 1234 1234 1234"
          onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12) }}
          />
          <TextField fullWidth required type="number" label="CVV" id="item-name" margin="dense" sx={{backgroundColor: 'white'}} 
          onChange={e => setCvv(e.target.value)}
          placeholder="123"
          onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3) }}
          />
          <TextField type="number" required fullWidth label="Amount" id="item-name" margin="dense" sx={{backgroundColor: 'white'}} 
          onChange={handleSetmoney} />
          <br/><br/>
        </Box>
      </Modal>

      <br/>
      <br/>

      {
          isLoading ? (
            "Fetching data - please wait"
          ) : (
            <Grid  container spacing={3}>
              {data.map((item, key) => {
                return (
                  <Grid key={key} item xs={12} md={6} lg={3}>
                    <MediaCard 
                      key={key} 
                      name={item.name} 
                      description={item.description} 
                      imageurl={item.imageurl}
                      instock={item.instock}
                      maxquantity={item.maxquantity}
                      cost={item.cost}
                      id={item._id}
                      money={money}
                      sold={item.sold}
                    />
                  </Grid>
                );
            })}
          </Grid>
          )
        }
        <br/>

        

        {/* <Grid  container spacing={3}>
            {Data.map((data, key) => {
              return (
                <Grid  item xs={12} md={6}   lg={3}>
                  <MediaCard key={key} name={data.name} description={data.description} imageurl={data.imageurl}/>
                </Grid>
              );
            })}
        </Grid> */}

         {/* {
          isLoading ? (
            "Fetching data - please wait"
          ) : (
            <Grid  container spacing={3}>
              {data.sodas.map((item, key) => {
                return (
                  <Grid key={key} item xs={12} md={6} lg={3}>
                    <MediaCard 
                      key={key} 
                      name={item.name} 
                      description={item.description} 
                      imageurl={item.imageurl}
                      instock={item.instock}
                      maxquantity={item.maxquantity}
                      cost={item.cost}
                    />
                  </Grid>
                );
            })}
          </Grid>
          )
        } */}

        
            
      </Container>

      <h5 style={{ color: '#F1F0F0'}}>more flavors coming soon.</h5>

         

      <FixedBottomNavigation />
    </div>
  )
}

export default Homepage
