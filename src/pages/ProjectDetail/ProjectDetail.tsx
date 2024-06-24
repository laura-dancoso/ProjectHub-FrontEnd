import { useParams } from "react-router-dom";

import {
  Box,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Container,
  Grid,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Carousel } from "antd";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ProjectDetail as ProjectDetailModel } from "../../models/projectDetail.model";
import { getProjectById } from "../../services/project-hub.service";
import { getLocaleDate } from "../../services/utils.service";
import { darkTheme } from "../../App";
import "./ProjectDetail.style.css";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<ProjectDetailModel | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (!!projectId) {
        setLoading(true);
        const projectDetail = await getProjectById(parseInt(projectId) ?? 0);
        setProject(projectDetail);
        setLoading(false);
      }
    };
    getData();
  }, []);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(`/`);
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ marginTop: "35px" }}>
        <Box>
          <Tooltip title="Volver">
            <IconButton onClick={handleGoBack} rel="noopener noreferrer">
              <ArrowBackIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          </Tooltip>
        </Box>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={3}
          >
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <Box marginBottom={1} padding={2}>
            <Box
              sx={{
                borderRadius: 2,
                bgcolor: "#353535",
                padding: 2,
              }}
            >
              <Typography
                variant="body2"
                gutterBottom
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "flex-end",
                  fontSize: "18px",
                  color: "#fff",
                }}
              >
                {getLocaleDate(project?.CreationDate)}
              </Typography>
              <Typography
                variant="h2"
                gutterBottom
                color="primary"
                style={{ fontWeight: "bold" }}
              >
                {project?.Title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {project?.Description}
              </Typography>

              {/* PORTADA */}
              <Box
                sx={{
                  marginTop: 5,
                  marginBottom: 2,
                }}
              >
                <Carousel autoplay>
                  {project?.ProjectImgUrls.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Portada ${index}`}
                      className="carousel-image"
                    />
                  ))}
                </Carousel>
              </Box>
            </Box>

            {/* MEMBERS */}
            <Box
              sx={{
                borderRadius: 2,
                bgcolor: "#353535",
                marginTop: "10px",
                padding: 2,
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  marginRight: 1,
                  marginBottom: 2,
                  fontWeight: "bold",
                  color: darkTheme.palette.primary.light,
                }}
              >
                Integrantes
              </Typography>
              {project?.Members?.map((member, index) => (
                <Chip
                  key={index}
                  label={member}
                  style={{ marginRight: "10px", fontSize: 15 }}
                />
              ))}
            </Box>
            {/* DOCENTE*/}
            <Box
              sx={{
                borderRadius: 2,
                bgcolor: "#353535",
                marginTop: "10px",
                padding: 2,
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  marginRight: 1,
                  marginBottom: 2,
                  fontWeight: "bold",
                  color: darkTheme.palette.primary.light,
                }}
              >
                Docente
              </Typography>
              <Chip label={project?.ProfessorName} style={{ fontSize: 15 }} />
            </Box>
            {/* DETALLE ACADEMICO:*/}

            {/* MATERIA*/}
            <Box
              sx={{
                borderRadius: 2,
                bgcolor: "#353535",
                marginTop: "10px",
                padding: 2,
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  marginRight: 1,
                  marginBottom: 2,
                  fontWeight: "bold",
                  color: darkTheme.palette.primary.light,
                }}
              >
                Materia
              </Typography>
              <Chip label={project?.SubjectName} style={{ fontSize: 15 }} />
            </Box>

            {/* CARRERA*/}
            <Box
              sx={{
                borderRadius: 2,
                bgcolor: "#353535",
                marginTop: "10px",
                padding: 2,
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  marginRight: 1,
                  marginBottom: 2,
                  fontWeight: "bold",
                  color: darkTheme.palette.primary.light,
                }}
              >
                Carrera
              </Typography>
              <Chip label={project?.DegreeName} style={{ fontSize: 15 }} />
            </Box>

            {/* TECNOLOGIAS UTILIZADAS -link a repo-link a app */}
            <Box
              sx={{
                borderRadius: 2,
                bgcolor: "#353535",
                marginTop: "10px",
                padding: 2,
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  marginRight: 1,
                  marginBottom: 2,
                  fontWeight: "bold",
                  color: darkTheme.palette.primary.light,
                }}
              >
                Tecnologías utilizadas
              </Typography>
              <Box marginBottom={1}>
                {project?.Technologies?.map((technology, index) => (
                  <Chip
                    key={index}
                    label={technology}
                    style={{ marginRight: "10px", fontSize: 15 }}
                  />
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                borderRadius: 2,
                bgcolor: "#353535",
                marginTop: "10px",
                padding: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ marginRight: 1, fontWeight: "bold", color: darkTheme.palette.primary.light }}
                >
                  Repositorio
                </Typography>
                <Tooltip title="Ver Repositorio">
                  <IconButton
                    href={project?.RepoUrl ?? ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ padding: 3, width: "40px", height: "40px" }}
                  >
                    <OpenInNewIcon sx={{ fontSize: "30px" }} />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ marginRight: 1, fontWeight: "bold", color: darkTheme.palette.primary.light }}
                >
                  Proyecto
                </Typography>
                <Tooltip title="Ver proyecto">
                  <IconButton
                    href={project?.ProjectUrl ?? ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ padding: 3, width: "40px", height: "40px" }}
                  >
                    <OpenInNewIcon sx={{ fontSize: "30px" }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            {/* LINKS */}
            <Grid
              container
              spacing={0}
              sx={{
                borderRadius: 2,
                bgcolor: "#353535",
                marginTop: "10px",
                padding: 2,
              }}
            >
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: darkTheme.palette.primary.light }}
                >
                  {" "}
                  Links
                </Typography>
                <List sx={{ padding: 0 }}>
                  {project?.OtherLinks?.map(({ Name, Url }, index) => (
                    <ListItem key={index} sx={{ paddingBottom: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ marginRight: 1, fontSize: "18px" }}
                      >
                        {Name}
                      </Typography>
                      <Tooltip title="Abrir enlace">
                        <IconButton
                          href={Url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ padding: 1 }}
                        >
                          <OpenInNewIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                      </Tooltip>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default ProjectDetail;
