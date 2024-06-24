import Dashboard from "./pages/Dashboard/Dashboard";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";


export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#009688",
      main: "#00897b",
      dark: "#00796b",
      contrastText: "#fff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
