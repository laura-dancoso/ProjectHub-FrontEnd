import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/ifts11-logo-login.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(username, password); 
      navigate("/"); 
    } catch (error) {
      setError("Usuario o contraseña incorrectos. Por favor, inténtelo nuevamente.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: "15px",
        backgroundColor: "#212121",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box minHeight="100vh" sx={{ width: "100%", maxWidth: "400px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <img src={logo} alt="IFTS11 Logo" style={{ width: "250px" }} />
        </div>
        <TextField
          label="Usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ marginTop: 2 }}
        >
          Acceder
        </Button>
        {error && ( 
          <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Login;
