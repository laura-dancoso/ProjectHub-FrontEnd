import { Box, Grid, CircularProgress, Button, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Chip } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { deleteProjectById, getProjects } from "../../services/projects.service";
import { useNavigate } from "react-router";
import { Project } from "../../models/project.model";
import { darkTheme } from "../../App";
import { useAuth } from "../../context/AuthContext";
import { DeleteIcon, EditIcon } from "../Icons/Icons";
import EditProject from "./EditProject";
import ResponsiveDialog from "../Modal/Modal";
import "./Card.styles.css"

interface CardProps
{
  projectId: number;
  projectImgUrl: string;
  title: string;
  members: string[];
  isAuthenticated: boolean;
  onProjectsReload: () => void
}


const ActionAreaCard: FC<CardProps>= ({
  projectId,
  projectImgUrl,
  title,
  members,
  isAuthenticated,
  onProjectsReload
}) => {
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  
  const handleGoToProjectDetail = () => {
    navigate(`/projects/${projectId}`);
  };
  
  const handleEditDialogOpen = () => {
    setSelectedProject({
      projectId,
      projectImgUrl,
      title,
      members,
      description: "",
      technologies: [],
      career: "",
      subject: "",
      githubRepo: "",
      projectLink: "",
      otherLinks: "",
    });
    setEditDialogOpen(true);
  };
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };
  
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {    
    setDialogLoading(false);
    setDeleteDialogOpen(false);
  };
  
  const handleSaveProject = (updatedProject: any) => {
    handleEditDialogClose();
  };
  
  const handleDeleteProject = async () => {
    setDialogLoading(true);
    const responseOk = await deleteProjectById(projectId);
    if(responseOk ){
      onProjectsReload();
    }else{
      // TODO: AGREGAR ALERT
    }
    handleDeleteDialogClose();
  };
  
  
  return (
    <>
      <Card
        sx={{ maxWidth: 345, marginTop: 2, position: "relative" }}
        onClick={handleGoToProjectDetail}
        >
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={projectImgUrl}
            alt={title}
          />
          <CardContent>
            <Typography
              gutterBottom
              component="div"
              sx={{
                color: darkTheme.palette.primary.light,
                fontWeight: "bold",
                fontSize: 20,
                marginTop: "5px",
                marginBottom: "10px"
              }}
            >
              {title}
            </Typography>
            <Box>
              {members?.map((member, index) => (
                <Chip
                key={index}
                label={member}
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    fontSize: 12,
                  }}
                />
              ))}
            </Box>
            {isAuthenticated && (
              <Box
              sx={{
                position: "absolute",
                  bottom: 0,
                  right: 0,
                  margin: 1,
                  display: "flex",
                  gap: 1,
                }}
              >
                <Tooltip title="Editar proyecto">
                  <Box
                    className="edit-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditDialogOpen();
                    }}
                  >
                    <EditIcon />
                  </Box>
                </Tooltip>
                <Tooltip title="Eliminar proyecto">
                  <Box
                    className="delete-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDialogOpen();
                    }}
                  >
                    <DeleteIcon />
                  </Box>
                </Tooltip>
              </Box>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
      {selectedProject && (
        <EditProject
          open={editDialogOpen}
          handleClose={handleEditDialogClose}
          projectData={selectedProject}
          handleSave={handleSaveProject}
        />
      )}
      <ResponsiveDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteProject}
        actionType="delete"
        loading={dialogLoading}
        />
    </>
  );
};

export default function CardList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  let cardData: Project[] = [];

  const getData = async (reload = false) => {
    if(!reload)
      setLoading(true);
    cardData = await getProjects() ?? [];
    setProjects([...cardData]);
    setLoading(false);
  }
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: loading ? `center` : `space-between`,
        padding: 2,
      }}
    >
      {
        loading ?
          (<CircularProgress color="inherit" />) :
          (
            <Grid container spacing={2} justifyContent={(projects?.length == 0) ? 'left' : 'center'}>
              {
                (projects?.length == 0) ?
                  (
                    <Button style={{margin:"15px"}} variant="outlined" href="/" >No se encontraron projectos, recargue nuevamente la página</Button>
                  )
                  :
                  (projects?.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <ActionAreaCard
                        projectId={card?.ProjectId}
                        title={card?.Title}
                        members={card?.Members}
                        projectImgUrl={card?.ProjectImgUrl}
                        isAuthenticated={isAuthenticated}
                        onProjectsReload={() => getData()}
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