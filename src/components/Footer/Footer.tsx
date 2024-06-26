import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { darkTheme } from '../../App';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', marginTop: '35px', width: '100%', padding: '20px', background: darkTheme.palette.primary.main }}>
      <Typography variant="body2" color="#fff" fontWeight={550} fontSize={12}>
        Hecho por Fernando, Claudia, Brisa y Laura - Conocé más sobre el proyecto {' '}
        <Link 
          href="https://ifts11-projecthub.notion.site/" 
          color="inherit" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          haciendo click acá!
        </Link>
      </Typography>
    </footer>
  );
}

export default Footer;
