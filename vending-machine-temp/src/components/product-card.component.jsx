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

export default function MediaCard({ name, description, imageurl, instock, maxquantity, cost }) {

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


  const handleBuyNow = (el) => {
    let sodaobj = {
      name: name,
      image: imageurl,
      description: description,
      price_$: cost,
      quantity: counter,
      totalAmount_$: cost * counter
    }

    var blob = new Blob([JSON.stringify(sodaobj, undefined, 4)], {type: "text/json;charset=utf-8"})
    let sodajson = JSON.stringify(sodaobj, undefined, 4)
    // saveAs(blob, "soda.json");
    alert(sodajson)
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
        <Button size="small" onClick={handleBuyNow}>Buy Now</Button> 
        {/* <Button size="small">Add to Cart { counter }</Button> */}
      </CardActions>
    </Card>

 
    </div>
  );
}