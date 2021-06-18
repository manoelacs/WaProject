import { Grid, Tab, Tabs } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Toolbar from 'components/Layout/Toolbar';
import IOrder from 'interfaces/models/order';
import IProduct from 'interfaces/models/product';
import React, { Fragment, useEffect, useState } from 'react';

import { generatorRandomId } from '../../FuncionsShared';
import productsList from '../MockData/mock';
import CardProduct from './CardProduct';
import CartListPage from './List';


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const ProductIndexPage = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);    
    const [shopOrder, setShopOrder] = useState<IProduct[]>([]);
    const [shopCart, setShopCart] = useState<IOrder[]>([]);
  
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };
     useEffect(() => {setShopCart(shopCart)},[shopCart])
     useEffect(() => {setShopOrder(shopOrder)},[shopOrder]); 
       
    const addOrder = (order:any) => {  
     
      console.log(order);   
        setShopCart(shopCart.concat(order));    
        console.log(shopCart); 
    };

    const addOrderToCart= (id: string, quantity: number, price: number, total: number, title:string) => {    
      setShopOrder([...shopOrder,{id, quantity, price, total, title}]);     
    };

     const handleUpdateCart = (orders:any) => {
      setShopOrder(orders);
    };
    
  const getMakerCard = (product: any) => {
    return (    
      <Grid item xs={12} sm={4}>
        <CardProduct {...product } 
          addOrderToCart= {addOrderToCart}
          shopOrder= {shopOrder}
          generatorRandomId = {generatorRandomId} />
      </Grid>
    );
  };  

  return(
      <Fragment>
           
            <Toolbar title='Produtos' />
            <div className={classes.root}>            
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Produtos" icon={<ListAltIcon />} {...a11yProps(0)} />
                    <Tab label="Carrinho de compras"  icon={<ShoppingCartIcon />}{...a11yProps(1)} />
                </Tabs>            
                <TabPanel value={value} index={0}>
                    <Grid container spacing={2}>
                      {productsList.map(product => getMakerCard(product))}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>                     
                         <CartListPage
                            shopOrder={shopOrder} 
                            handleUpdateCart={ handleUpdateCart }
                            addOrder = { addOrder }
                            shopCart={shopCart}
                            generatorRandomId = {generatorRandomId} 
                         />               
                </TabPanel>              
             </div>
            
                     
      </Fragment>
    
    
  );
};

export default ProductIndexPage;
