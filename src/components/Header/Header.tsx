import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Tooltip } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import {LoginIcon, LogoutIcon} from "../Icons/Icons";
import { darkTheme } from "../../App";
import logo from "../../assets/ifts11-logo-login.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
      <img
          src={logo}
          alt="IFT11 Logo"
          style={{
            width: "36px",
            height: "36px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "5px"
          }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontFamily: "Martian Mono, monospace"}}
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit", backgroundColor: darkTheme.palette.primary.light, padding:"5px"}}>
            IFTS11-PROJECTHUB
          </Link>
        </Typography>
        {location.pathname !== "/login" &&
          (isAuthenticated ? (
            <Tooltip title="Cerrar sesión">
            <Button
              variant="contained"
              sx={{ fontSize: 15, fontWeight: "bold" }}
              onClick={handleLogout}
              size="small"
              >
              <LogoutIcon></LogoutIcon>
            </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Iniciar sesión">
            <Button
              variant="contained"
              sx={{ fontSize: 15, fontWeight: "bold" }}
              onClick={() => navigate("/login")}
              size="small"
            >
              <LoginIcon></LoginIcon>
            </Button>
            </Tooltip>
          ))}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
