import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core/';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Toolbar from 'components/Layout/Toolbar';
import React, { Fragment } from 'react';

import { ccyFormat, generateRandomDate, generatorRandomId, priceRow } from '../../FuncionsShared';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },    
  },
  marginBottom: {
    marginBottom: 15
  }
});
function createData(
  id: string,
  date: any,
  total: number,  
) {   
    
  return {
    id,
    date,
    total,    
    history: [
        {description: 'produto x', quantity: 3, price : 19.99},
        {description: 'produto y', quantity: 4, price : 39.99},     
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="left">{row.date}</TableCell>
        <TableCell align="left">{row.total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalhes da compra
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell align="right">Preço unitário ($)</TableCell>
                    <TableCell align="right">Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.description}>
                      <TableCell component="th" scope="row">
                        {historyRow.description}
                      </TableCell>
                      <TableCell>{historyRow.quantity}</TableCell>
                      <TableCell align="right">{historyRow.price}</TableCell>
                      <TableCell align="right">
                        {ccyFormat(priceRow( historyRow.quantity,  historyRow.price)) }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(generatorRandomId(), generateRandomDate() , 90.0),
  createData(generatorRandomId(), generateRandomDate(), 99.0),
  createData(generatorRandomId(), generateRandomDate(), 160.0),
  createData(generatorRandomId(), generateRandomDate(), 30.7),
  createData(generatorRandomId(), generateRandomDate(), 160.0),
];


const OrderIndexPage = () => {
    const classes = useRowStyles();
  return (
      <Fragment>
           <Toolbar title='Pedidos' />
           
           <div  className={classes.marginBottom}>
            <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>ID</TableCell>
                            <TableCell align="left">Data da compra</TableCell>
                            <TableCell align="left">Total(R$)</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <Row key={row.id} row={row} />
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>

           </div>
           
      </Fragment>
   
  );
}; export default OrderIndexPage;