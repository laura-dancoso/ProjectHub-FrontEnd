import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { darkTheme } from '../../App';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', marginTop: '35px', width: '100%', padding: '20px', background: darkTheme.palette.primary.main }}>
      <Typography variant="body2" color="#fff" fontWeight="bold">
        Hecho por Fernando, Claudia, Brisa y Laura - Conocé más del {' '}
        <Link 
          href="https://www.notion.so/ifts11-projecthub/ff4174fd44d6495fb5eeebb0b78c0437?v=b00455454dbe46e8988b165569022ce0&pvs=4" 
          color="inherit" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Proyecto!
        </Link>
      </Typography>
    </footer>
  );
}

export default Footer;
