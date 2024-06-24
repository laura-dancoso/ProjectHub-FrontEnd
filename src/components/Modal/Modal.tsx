import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
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
}

const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({ open, onClose, onConfirm, actionType }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const getDialogContent = () => {
    switch(actionType) {
      case 'edit':
        return {
          title: "Editar proyecto",
          content: "Estás a punto de modificar el proyecto. ¿Quieres continuar?",
          confirmText: "Guardar",
        };
      case 'delete':
        return {
          title: "Eliminar proyecto",
          content: "Estás a punto de eliminar el proyecto. ¿Quieres continuar?",
          confirmText: "Eliminar",
        };
      case 'save':
        return {
          title: "Guardar proyecto",
          content: "Estás a punto de crear un nuevo proyecto. ¿Quieres continuar?",
          confirmText: "Guardar",
        };
      default:
        return {
          title: "",
          content: "",
          confirmText: "",
        };
    }
  };

  const { title, content, confirmText } = getDialogContent();

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
    >
      <DialogTitle id="dialog-title" style = {{ color: darkTheme.palette.primary.light }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText marginTop={1}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={onConfirm} >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResponsiveDialog;
