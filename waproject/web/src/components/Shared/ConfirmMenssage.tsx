import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Alert from 'components/Shared/Alert';
import DeleteIcon from 'mdi-react/DeleteIcon';
import React, { memo, useCallback } from 'react';

//import AlertCircleIcon from 'mdi-react/AlertCircleIcon';
interface IProps {
  text:string;
  index:number;
  onConfirm?: (index: number) => void;
}

const useStyle = makeStyles(theme => ({
  icon: {
    opacity: 0.8,
    color: theme.palette.error.main
  }
}));

const ConfirmMessage = memo((props: IProps) => {
  const classes = useStyle(props);

  const showAlert = useCallback(async () => {
    await Alert.confirm(props.text);
    props.onConfirm && props.onConfirm(props.index);
  }, [props]);

  return (
    <IconButton onClick={showAlert}>
      <DeleteIcon className={classes.icon} />
    </IconButton>
  );
});

export default ConfirmMessage;
