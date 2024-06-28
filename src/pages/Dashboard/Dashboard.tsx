import { Container } from "@mui/material";
import CardList from "../../components/Card/Card";
import { useAuth } from "../../context/AuthContext";
import Banner from "../../components/Banner/Banner";
import AddProject from "../../components/AddProject/AddProject";

const Dashboard = () => {

  const { isAuthenticated } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ marginTop: "35px" }}>
      <Banner></Banner>
       {isAuthenticated && <AddProject />}
      <CardList></CardList>
    </Container>
  );
};

export default Dashboard;
