import { Avatar, CardMedia, Grid, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import React, { useEffect, useState } from 'react';

import { ccyFormat, priceRow } from '../../FuncionsShared';


const CardProduct = (props: {id:any; avatarUrl: any; title: string; subtitle: any; 
  description: any; imageUrl: any; price:any; addOrderToCart:any; generatorRandomId: any; shopOrder:any  }) => {
  const { id, avatarUrl, title, subtitle, description, imageUrl, price, addOrderToCart} = props;
  const [open, setOpen] = React.useState(false);  
  const [quantity, setQuantity] = useState<number>(1);
  const [total, setTotal] = useState<number>(Number(parseFloat(price).toFixed(2)));
  
  const handleChange = () => {      
    addOrderToCart(id, quantity, price, total, title)      
  };
  useEffect(() => {
    setQuantity(quantity);
    setTotal( total );
   }, [quantity, total]); 
   
  const changeQuantity = (e: any) => {   
    let auxtotal = Number( ccyFormat(priceRow(e.target.value, price)));   
    setQuantity( e.target.value );  
    setTotal( auxtotal );      
  }; 
  const handleClickOpen = () => {
    setOpen(true);   
  };
  const resetState = () => {
    setTotal(Number(parseFloat(price).toFixed(2)))
    setQuantity(1);
    setOpen(false);
  }
  const handleClose = () => {
    resetState();
  };  
  const handleAddClicked = () => {
    handleChange(); 
    resetState();
  } 
  return (
    <Card  style={{ height: "460px" }}>
        <CardHeader
          avatar={<Avatar src={avatarUrl} />}
          action={
            <IconButton aria-label="settings">
                <span  className="price" id = "price">R$ { price }</span>            
            </IconButton>
          }
          title={title}
          subheader={subtitle}
        />
        <CardMedia style={{ height: "160px" }} image={imageUrl} />
        <CardContent style={{ height: "100px" }}>
          <Typography variant="body2" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions  >    
          <Grid container justify='center'  style={{paddingTop:'40px'}}>
            <div>
              <Tooltip 
                title="Adiciona item ao carrinho de compra" 
                aria-label="add"  
                onClick={ handleClickOpen }             
              >
                <Fab >
                    <AddShoppingCartIcon />
                </Fab>                
              </Tooltip>
            </div>           
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Pedidos</DialogTitle>
              <DialogContent>
                    <DialogContentText>
                    Insira a quantidade deste item que deseja adicionar ao carrinho de compras
                    </DialogContentText>
                    <TextField
                    style={{ width: "100px", marginRight:'5px'}}
                      autoFocus
                      margin="dense"
                      id="quantity"
                      defaultValue={1}
                      label="Quantidade"
                    
                      type="number"
                      onChange={changeQuantity}
                      value={quantity}
                    />
                    <TextField
                      style={{ width: "100px", marginRight:'5px'}}
                      autoFocus
                      margin="dense"
                      id="quantity"
                      label="Total"
                      type="text"
                      value={total}
                    />
                </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="default">
                  Cancelar
                </Button>
                <Button onClick={handleAddClicked} color="primary">
                  Adicionar
                </Button>
              </DialogActions>
           </Dialog>
          </Grid>         
       </CardActions>
    </Card>
  );
};

export default CardProduct;