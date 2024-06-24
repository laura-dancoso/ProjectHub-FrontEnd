
import Typography from '@mui/material/Typography';
import { darkTheme } from '../../App';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', marginTop: '35px', width: '100%', padding: '20px', background: darkTheme.palette.primary.main}}>
      <Typography variant="body2" color="#fff" fontWeight= "bold" >
      Zavaleta 204 - Parque Patricios
      </Typography>
    </footer>
  );
}


export default Footer;
