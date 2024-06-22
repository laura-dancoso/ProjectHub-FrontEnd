import { Box, Grid, CircularProgress, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { getProjects } from "../../services/project-hub.service";
import { useNavigate } from "react-router";
import { Project } from "../../models/project.model";


let cardData: Project[] = [];

const ActionAreaCard = ({
  projectId,
  title,
  members,
  projectImgUrl
}: {
  projectId: number;
  title: string;
  members: string[];
  projectImgUrl: string;
}) => {
  const navigate = useNavigate();

  const handleGoToProjectDetail = () => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <Card
      sx={{ maxWidth: 345, marginTop: 2 }}
      onClick={handleGoToProjectDetail}
    >
      <CardActionArea>
        <CardMedia component="img" height="200" alt={title} src={projectImgUrl}/>
        <CardContent sx={{ height: 120 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: "#af52bf", fontWeight: "bold", fontSize: 18 }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            component="div"
            color="text.secondary"
            sx={{ fontSize: 12, marginY: 2 }}
          >
            {members?.map((member, index) => {
              return <Chip
                key={index} label={member} style={{ marginRight: "10px", fontSize: 10 }}
              />
            })}
          </Typography>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              margin: 1,
            }}
          >
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default function ActionAreaCardList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      cardData = await getProjects() ?? [];
      setProjects([...cardData]);
      setLoading(false);
    }
    getData();

  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        padding: 2,
      }}
    >
      {
        loading ?
          (<CircularProgress color="inherit" />) :
          (
            <Grid container spacing={2} justifyContent="center">
              {
                (projects?.length == 0) ?
                  (
                    <Button variant="outlined" href="/" >No se encontraron projectos, recargue nuevamente la página</Button>
                  )
                  :
                  (projects?.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <ActionAreaCard
                        projectId={card?.ProjectId}
                        title={card?.Title}
                        members={card?.Members}
                        projectImgUrl={card?.ProjectImgUrl}
                      />
                    </Grid>
                  ))
                  )
              }

            </Grid>
          )
      }
    </Box>
  );
}
