import * as React from 'react'
import { useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import { saveAs } from "file-saver"
import axios from 'axios'

export default function MediaCard({ id, key, name, description, imageurl, instock, maxquantity, cost }) {

  // const { name, description, imageurl, instock, maxquantity, cost } = props

  const [counter, setCounter] = useState(0)
  const [itemsLeft, setItemsLeft] = useState(instock)

  const handleIncrement =  () => {
    if(itemsLeft > 0){
      setCounter(counter + 1)
      setItemsLeft(itemsLeft - 1)
    }
  }
  const handleDecrement = () => {
    if(counter > 0){
      setCounter(counter - 1)
      setItemsLeft(itemsLeft + 1)
    }
  }


  const handleBuyNow = () => {
    let sodaobj = {
      name: name,
      image: imageurl,
      description: description,
      price$: cost,
      quantity: counter,
      amountpaid$: cost * counter
    }

    var blob = new Blob([JSON.stringify(sodaobj, undefined, 4)], {type: "text/json;charset=utf-8"})
    let sodajson = JSON.stringify(sodaobj, undefined, 4)
    saveAs(blob, "soda.json");
    // alert(sodajson)
    

    //update the db 
    const FETCH_URL = 'http://localhost:8000/api/products/update/'
    const product = {
      name: name,
      description: description,
      maxquantity: maxquantity,
      instock: instock-counter,
      cost: cost,
      imageurl: imageurl
    };
    // console.log(product)
    // console.log(id)

    axios.post(FETCH_URL+id, product)
      .then(res => console.log(res.data))
    
    window.location.reload()
  }

  return (
    <div>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageurl}
        alt="soda pic"
      />
      <CardContent>
        
        <Typography gutterBottom variant="h5" component="div">
          { name } 
        </Typography>
        <Typography component={'div'} variant="body2" color="text.secondary">
          { description }
        </Typography>
        <br/>
        <Typography component={'div'} variant="body2" color="text.secondary">
          Price: ${ cost }
        </Typography><br/>
        
        <Typography component={'div'} variant="body2" color="text.secondary">
          <ButtonGroup variant="outlined" aria-label="outlined button group">
           <Button size="small" onClick={handleDecrement}>-</Button>  
            <Button>{counter}</Button>
           <Button size="small" onClick={handleIncrement}>+</Button> 
          </ButtonGroup>
        </Typography>
        <br/>
        <Typography component={'div'} variant="body2" color="text.secondary">
          Total: $ { counter * cost }
        </Typography>
        <hr/>
        <Typography component={'div'} variant="body2" color="text.secondary">
          { 
            itemsLeft ? `In Stock: ${itemsLeft}` : " Out of stock"
          }
        </Typography>
       
      </CardContent>
      <CardActions  style={{justifyContent: 'center'}}>
        {
          counter 
          ? 
            <Button size="small" onClick={handleBuyNow}>BUY {counter} {name}</Button>  
          : 
            <Button size="small" disabled onClick={handleBuyNow}>SELECT AN ITEM TO BUY</Button>
        }

        {/* <Button size="small">Add to Cart { counter }</Button> */}
      </CardActions>
    </Card>

 
    </div>
  );
}