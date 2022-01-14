import React, { useState, useEffect, useCallback } from 'react'
import MediaCard from '../components/product-card.component'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import FixedBottomNavigation from '../components/checkout-button.component'
// import { Data } from '../components/data'

// const fetchURL = "http://localhost:8000/api"; //fetch data from local 
const fetchURL = "http://localhost:8000/api/products";  //fetch data from DB 
const getItems = () => fetch(fetchURL).then(res => res.json());

function Homepage() {

  // const [data, setData] = useState({sodas: []})
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getItems().then(soda => setData(soda));
    setLoading(false)
  }, []);

  return (
    <div>
    
      <Container>
      <h2>WELCOME TO COLACO</h2>
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
                    />
                  </Grid>
                );
            })}
          </Grid>
          )
        }
            
      </Container>

      <h5 style={{ color: '#F1F0F0'}}>more flavors coming soon.</h5>

         

      <FixedBottomNavigation />
    </div>
  )
}

export default Homepage
