import { TableCell } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from 'components/Layout/Toolbar';
import CardLoader from 'components/Shared/CardLoader';
import EmptyAndErrorMessages from 'components/Shared/Pagination/EmptyAndErrorMessages';
import SearchField from 'components/Shared/Pagination/SearchField';
import TableCellActions from 'components/Shared/Pagination/TableCellActions';
import TableCellSortable from 'components/Shared/Pagination/TableCellSortable';
import TablePagination from 'components/Shared/Pagination/TablePagination';
import TableWrapper from 'components/Shared/TableWrapper';
import usePaginationObservable from 'hooks/usePagination';
import IProduct from 'interfaces/models/product';
import RefreshIcon from 'mdi-react/RefreshIcon';
import React, { Fragment, memo, useCallback, useState } from 'react';
import userService from 'services/user';

import { ccyFormat, subtotal } from '../../../FuncionsShared';
import ListItem from './ListItem';

//import FormDialog from '../FormDialog';
const CartListPage = memo((props:any) => {
  const [/* formOpened */, setFormOpened] = useState(false);
  const [ current , setCurrent] = useState<IProduct>();


  const { shopOrder, addOrder, generatorRandomId} = props;
  const order:IProduct[] = shopOrder;
  const id:string = generatorRandomId();
  const auxOrder = {id, order} ;
  const [params, mergeParams, loading, data, error, , refresh] = usePaginationObservable(
    params => userService.list(params),
    { orderBy: 'title', orderDirection: 'asc' },
    []
  );   
    
  const handleFinishOrder = () => {    
    addOrder(auxOrder);    
  }
  const handleEdit = useCallback((current: IProduct) => {
    setCurrent(current);
    setFormOpened(true);
  }, [current]);  
 
  const handleRefresh = useCallback(() => refresh(), [refresh]);
  const { total, results } = data || ({ total: 0, results: shopOrder || [] } as typeof data);
  const invoiceTotal = subtotal(shopOrder);   
  return (
    <Fragment>
      <Toolbar title='Produtos' />

      <Card>
        <CardLoader show={loading} />
        <CardContent>
          <Grid container justify='space-between' alignItems='center' spacing={2}>
            <Grid item xs={12} sm={6} lg={4}>
              <SearchField paginationParams={params} onChange={mergeParams} />
            </Grid>
            <Grid item xs={12} sm={'auto'}>
              <Button fullWidth variant='contained' color='primary' onClick={handleFinishOrder}>
                Finalizar Pedido
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <TableWrapper minWidth={500}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Detalhes
                </TableCell>
                <TableCell align="right">Preço</TableCell>
               </TableRow>
              <TableRow>
                <TableCellSortable
                  paginationParams={params}
                  disabled={loading}
                  onChange={mergeParams}
                  column='title'
                >
                  Descrição
                </TableCellSortable>
                <TableCellSortable 
                  paginationParams={params} 
                  disabled={loading} 
                  onChange={mergeParams} 
                  column='quantity'>
                  Quantidade
                </TableCellSortable>
                <TableCellSortable 
                  paginationParams={params} 
                  disabled={loading} 
                  onChange={mergeParams} 
                  column='price'>
                  Unidade
                </TableCellSortable>
                <TableCellSortable 
                  paginationParams={params} 
                  disabled={loading} 
                  onChange={mergeParams} 
                  column='total'>
                  Total
                </TableCellSortable>
                <TableCellActions>
                  <IconButton disabled={loading} onClick={handleRefresh}>
                    <RefreshIcon />
                  </IconButton>
                </TableCellActions>
              </TableRow>
            </TableHead>
            <TableBody>
              { !results && <EmptyAndErrorMessages
                colSpan={3}
                error= {false|| error}
                loading={false || loading}
                hasData={ results.length > 0 }
                onTryAgain={refresh}
              />}
              { results.map((item: any) => (
              
                <ListItem key={item.id} order={item} onEdit={() => handleEdit(item) } onDeleteComplete={refresh} />
              )) }               
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right"> {ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableWrapper>
        <TablePagination total={total} disabled={loading} paginationParams={params} onChange={mergeParams} />
      </Card>
    </Fragment>
  );
}); export default CartListPage;
