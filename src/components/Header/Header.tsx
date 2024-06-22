import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Martian Mono, monospace' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>IFTS11-<span style={{ color: '#ab47bc' }}>ProjectHub</span></Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
