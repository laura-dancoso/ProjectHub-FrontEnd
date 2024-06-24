import { Container } from "@mui/material";
import ActionAreaCardList from "../../components/Card/Card";
import { useAuth } from "../../context/AuthContext";
import Banner from "../../components/Banner/Banner";
import AddProjectButton from "../../components/Button/AddProjectButton";

const Dashboard = () => {

  const { isAuthenticated } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ marginTop: "35px" }}>
      <Banner></Banner>
       {isAuthenticated && <AddProjectButton />}
      <ActionAreaCardList></ActionAreaCardList>
    </Container>
  );
};

export default Dashboard;
