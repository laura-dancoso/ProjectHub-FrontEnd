import { Container } from "@mui/material";
import ActionAreaCardList from "../../components/Card/Card";

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: "35px" }}>
      <ActionAreaCardList></ActionAreaCardList>
    </Container>
  );
};

export default Dashboard;
