import React from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import BottomNavigation from '@mui/material/BottomNavigation'
import {
  Link
} from 'react-router-dom'

function Checkout() {
  return (
    <div>
      <Container>
      <h2>CHECKOUT</h2>
       <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels={false}>
          <h4>
            <Link to="/">Back</Link>
           </h4>
        </BottomNavigation>
      </Paper>
      </Container>
    </div>
  )
}

export default Checkout
