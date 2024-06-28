import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { darkTheme } from '../../App';

interface ResponsiveDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  actionType: 'edit' | 'delete' | 'save';
  loading?: boolean
}

const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({
  open,
  onClose,
  onConfirm,
  actionType,
  loading = false
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const getDialogContent = () => {
    switch (actionType) {
      case 'edit':
        return {
          title: "Editar proyecto",
          content: "Estás a punto de modificar el proyecto. ¿Quieres continuar?",
          confirmText: "Modificar",
          loadingText: "Modificando..."
        };
      case 'delete':
        return {
          title: "Eliminar proyecto",
          content: "Estás a punto de eliminar el proyecto. ¿Quieres continuar?",
          confirmText: "Eliminar",
          loadingText: "Eliminando..."
        };
      case 'save':
        return {
          title: "Guardar proyecto",
          content: "Estás a punto de crear un nuevo proyecto. ¿Quieres continuar?",
          confirmText: "Guardar",
          loadingText: "Guardando..."
        };
      default:
        return {
          title: "",
          content: "",
          confirmText: "",
          loadingText: ''
        };
    }
  };

  const { title, content, confirmText, loadingText } = getDialogContent();

  const onCloseDialog: DialogProps["onClose"] = (event, reason) => {
    if (reason && reason === "backdropClick")
        return;
    onClose();
  }
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onCloseDialog}
      aria-labelledby="dialog-title"
    >
      <DialogTitle id="dialog-title" style={{ color: darkTheme.palette.primary.light }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText marginTop={1}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={onConfirm} disabled={loading} >
          {loading? loadingText : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResponsiveDialog;
