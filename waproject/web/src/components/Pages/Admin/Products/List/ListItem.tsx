import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Alert from 'components/Shared/Alert';
import { IOption } from 'components/Shared/DropdownMenu';
import TableCellActions from 'components/Shared/Pagination/TableCellActions';
import Toast from 'components/Shared/Toast';
import { logError } from 'helpers/rxjs-operators/logError';
import IProduct from 'interfaces/models/product';
import DeleteIcon from 'mdi-react/DeleteIcon';
import EditIcon from 'mdi-react/EditIcon';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useCallbackObservable } from 'react-use-observable';
import { from } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

interface IProps {
  order: IProduct;
  onEdit: (order: IProduct) => void;
  onDeleteComplete: () => void;
}

const ListItem = memo((props: IProps) => {
  const { order, onEdit, onDeleteComplete } = props;
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleDismissError = useCallback(() => setError(null), []);

  const handleEdit = useCallback(() => {
    onEdit(order);
  }, [onEdit, order]);

  const [handleDelete] = useCallbackObservable(() => {
    return from(Alert.confirm(`Deseja excluir o usuário ${order.title}?`)).pipe(
      filter(ok => ok),
      tap(() => setLoading(true)),
      //switchMap(() => userService.delete(order.id)),
      logError(),
      tap(
        () => {
          Toast.show(`${order.title} foi removido`);
          setLoading(true);
          setDeleted(true);
          onDeleteComplete();
        },
        error => {
          setLoading(false);
          setError(error);
        }
      )
    );
  }, []);

  const options = useMemo<IOption[]>(() => {
    return [
      { text: 'Editar', icon: EditIcon, handler: handleEdit },
      { text: 'Excluir', icon: DeleteIcon, handler: handleDelete }
    ];
  }, [handleDelete, handleEdit]);

  if (deleted) {
    return null;
  }

  return (
    <TableRow>
      
        <TableCell align="left">{order.title}</TableCell>
        <TableCell align="left">{order.quantity}</TableCell>
        <TableCell align="left">{order.price}</TableCell>
        <TableCell align="left">{order.total}</TableCell>
      <TableCellActions 
        options={options} 
        loading={loading} 
        error={error} 
        onDismissError={handleDismissError} />
    </TableRow>
  );
});

export default ListItem;
