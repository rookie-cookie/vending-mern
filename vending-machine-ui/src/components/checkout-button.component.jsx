import React from 'react'
import Paper from '@mui/material/Paper'
import BottomNavigation from '@mui/material/BottomNavigation'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';


function FixedBottomNavigation() {
  return (
    <div>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
        <BottomNavigation showLabels={false} >
          
          {/* <Button variant="text">Total: </Button> */}
          <h4>
            <Link to="admin">ADMIN ONLY</Link>
           </h4>
          
          {/* <Button variant="text">BUY NOW</Button> */}
        </BottomNavigation>
      </Paper>
      
    </div>
  )
}

export default FixedBottomNavigation;
