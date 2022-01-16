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
// import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import axios from 'axios'

import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { FormControlLabel, IconButton } from "@material-ui/core"
import { blue } from "@material-ui/core/colors"

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
  const [newsold, setNewsold] = useState('')

   

  useEffect(() => {
    getItems().then(soda => setData(soda));
    setLoading(false)
  }, []);


  const MatEdit = (params) => {
      const { index } = params;

      const handleEditClick = () => {
        // some action
        const FETCH_URL = 'http://localhost:8000/api/products/update/'
        console.log(params)
        axios.post(FETCH_URL + index, params)
          .then(res => console.log(res.data))
          .then(alert("Product updated"))
        window.location.reload()
        
        
      };

      const handleDeleteClick = () => {
        const FETCH_URL = 'http://localhost:8000/api/products/'
        axios.delete(FETCH_URL + index)
          .then(res => console.log(res.data))
        window.location.reload()
        alert('Product deleted!')
      };

      return (
        <>
        <FormControlLabel
          control={
            <IconButton color="secondary" aria-label="add an alarm" onClick={handleEditClick} >
              <SaveIcon  style={{ color: blue[500] }}/>
            </IconButton>
          }
        />

         <FormControlLabel
          control={
            <IconButton color="secondary" aria-label="add an alarm" onClick={handleDeleteClick} >
              <DeleteIcon style={{ color: blue[500] }}/>
            </IconButton>
          }
        />
        </>
        
        
      );
    };

  //for the table 
  const columns = [
  {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div>
            <MatEdit 
              index={params.row._id}
              name={params.row.name}
              description={params.row.description}
              maxquantity={params.row.max_quantity}
              instock={params.row.stock_count}
              imageurl={params.row.imageurl}
              cost={params.row.cost}
              sold={params.row.sold}
               />
          </div>
        );
      }
    },

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
    field: 'current_stock',
    headerName: 'Current Stock Left',
    type: 'number',
    width: 120,
    editable: true
  },
  {
    field: 'stock_count',
    headerName: 'Vending Stock',
    type: 'number',
    width: 120,
    editable: true
  },
  {
    field: 'sold',
    headerName: 'Sold',
    type: 'number',
    width: 90,
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

 

  const rowdata = data.map((item, key) => {
    return {
      id: key,
      name: item.name,
      description: item.description,
      max_quantity: item.maxquantity,
      current_stock: item.maxquantity-item.sold,
      stock_count: item.instock,
      cost: item.cost,
      imageurl: item.imageurl,
      _id: item._id,
      sold: item.sold
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
      imageurl: newimageurl,
      sold: newsold
    };
    console.log(product)
    axios.post(FETCH_URL, product)
      .then(res => console.log(res.data));
    
    window.location.reload()
  }
  
  return (

    <div>
      <Container>
      <h2>ADMIN</h2>

      <div style={{ height: 400, width: '100%', backgroundColor: 'white' }}>
        <DataGrid
          rows={rowdata}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
         
        />

      </div>

      <br/>

      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="ADD MORE PRODUCTS"
      />

      <Collapse in={checked}>

        <Box sx={{ maxWidth: '100%', margin: 'auto' }}>
          <TextField fullWidth label="Name" id="item-name" margin="dense" sx={{backgroundColor: 'white'}} 
          onChange={e => setNewname(e.target.value)} />
          <TextField fullWidth label="Description" id="item-description" margin="dense" sx={{backgroundColor: 'white'}} 
          onChange={e => setNewdescription(e.target.value)} />
          <TextField fullWidth label="Max Quantity" id="item-maxquantity" margin="dense" sx={{backgroundColor: 'white'}} 
          onChange={e => setNewmaxquantity(e.target.value)} type="number"/>
          <TextField fullWidth label="Vending Stock Count" id="item-instock" margin="dense" sx={{backgroundColor: 'white'}}
          onChange={e => setNewinstock(e.target.value)} type="number" />
          <TextField fullWidth label="Cost" id="item-cost" margin="dense" sx={{backgroundColor: 'white'}}
          onChange={e => setNewcost(e.target.value)} type="number"/>
          <TextField fullWidth label="Image URL" id="item-imageurl" margin="dense" sx={{backgroundColor: 'white'}} 
          onChange={e => setNewimageurl(e.target.value)}/>
          <TextField fullWidth label="Sold" id="item-imageurl" margin="dense" sx={{backgroundColor: 'white'}} 
          onChange={e => setNewsold(e.target.value)} placeholder="0" type="number"/>
          
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
