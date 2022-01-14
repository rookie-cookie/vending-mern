import React, {useState, useEffect} from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import BottomNavigation from '@mui/material/BottomNavigation'
import {
  Link
} from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { DataGrid } from '@mui/x-data-grid'
import Collapse from '@mui/material/Collapse'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import axios from 'axios'


const fetchURL = "http://localhost:8000/api/products"; //fetch data from DB 
const getItems = () => fetch(fetchURL).then(res => res.json());


function Admin() {

  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [checked, setChecked] = useState(false)

  const [newname, setNewname] = useState('')
  const [newdescription, setNewdescription] = useState('')
  const [newmaxquantity, setNewmaxquantity] = useState('')
  const [newinstock, setNewinstock] = useState('')
  const [newcost, setNewcost] = useState('')
  const [newimageurl, setNewimageurl] = useState('')

   

  useEffect(() => {
    getItems().then(soda => setData(soda));
    setLoading(false)
  }, []);

  //for the table 
  const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 500,
    editable: true
  },
  {
    field: 'max_quantity',
    headerName: 'Max Quantity',
    type: 'number',
    width: 120,
    editable: true
  },
  {
    field: 'stock_count',
    headerName: 'Current Stock',
    type: 'number',
    width: 120,
    editable: true
  },
  {
    field: 'cost',
    headerName: 'Cost $',
    type: 'number',
    width: 90,
    editable: true
  },
  {
    field: 'imageurl',
    headerName: 'Image Url',
    width: 850,
    editable: true
  },
  
];

  const rows = data.map((item, key) => {
    return {
      id: key,
      name: item.name,
      description: item.description,
      max_quantity: item.maxquantity,
      stock_count: item.instock,
      cost: item.cost,
      imageurl: item.imageurl
    }
  })

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleAddproduct = () => {
    const FETCH_URL = 'http://localhost:8000/api/products/add'
    const product = 
    {
      name: newname,
      description: newdescription,
      maxquantity: newmaxquantity,
      instock: newinstock,
      cost: newcost,
      imageurl: newimageurl
    };
    console.log(product)
    axios.post(FETCH_URL, product)
      .then(res => console.log(res.data));
  }
  
  return (

    <div>
      <Container>
      <h2>ADMIN</h2>

      <div style={{ height: 400, width: '100%', backgroundColor: 'white' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>

      <br/>

      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="ADD MORE PRODUCT"
        
      />

      <Collapse in={checked}>

        <Box sx={{ maxWidth: '100%', margin: 'auto' }}>
          <TextField fullWidth label="Name" id="item-name" margin="dense" sx={{backgroundColor: 'white'}} 
          onChange={e => setNewname(e.target.value)} />
          <TextField fullWidth label="Description" id="item-description" margin="dense" sx={{backgroundColor: 'white'}} 
          onChange={e => setNewdescription(e.target.value)} />
          <TextField fullWidth label="Max Quantity" id="item-maxquantity" margin="dense" sx={{backgroundColor: 'white'}} 
          onChange={e => setNewmaxquantity(e.target.value)}/>
          <TextField fullWidth label="Stock Count" id="item-instock" margin="dense" sx={{backgroundColor: 'white'}}
          onChange={e => setNewinstock(e.target.value)} />
          <TextField fullWidth label="Cost" id="item-cost" margin="dense" sx={{backgroundColor: 'white'}}
          onChange={e => setNewcost(e.target.value)} />
          <TextField fullWidth label="Image URL" id="item-imageurl" margin="dense" sx={{backgroundColor: 'white'}} 
          onChange={e => setNewimageurl(e.target.value)}/>
          
        </Box>

        <br/>
        <Button variant="contained" onClick={handleAddproduct}>ADD</Button>
         
      </Collapse>


       <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels={false}>
          <h4>
            <Link to="/">BACK TO COLACO</Link>
           </h4>
        </BottomNavigation>
      </Paper>
      </Container>
    </div>
  )
}

export default Admin
