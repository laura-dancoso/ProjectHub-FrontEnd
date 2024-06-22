
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', marginTop: '35px', width: '100%', padding: '20px', background:"#212121"}}>
      <Typography variant="body2" color="textSecondary" fontWeight= "bold" >
        {new Date().getFullYear()} IFTS11-ProjectHub
      </Typography>
    </footer>
  );
}


export default Footer;
