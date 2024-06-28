import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Avatar, Box, Chip, IconButton, MenuItem, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { darkTheme } from "../../App";
import { Degree } from "../../models/degree.model";
import { Subject } from "../../models/subject.model";
import { getDegrees } from '../../services/degrees.service';
import { ProjectRequest, createNewProject } from "../../services/projects.service";
import { getSubjects } from "../../services/subjects.service";
import ResponsiveDialog from "../Modal/Modal";
import "./AddProject.style.css";

interface TagsInputProps {
  label: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagsInput: React.FC<TagsInputProps> = ({ label, tags, setTags }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  };

  const handleDeleteTag = (tagToDelete: string, indexTag: number) => {
    setTags(tags.filter((tag, index) => !((tag == tagToDelete) && (indexTag == index))));
  };

  return (
    <Box marginBottom={2} marginTop={2}>
      <TextField
        required
        fullWidth
        label={`${label}`}
        placeholder={`Agregar ${label}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddTag();
        }}
        style={{ marginTop: "5px" }}
      />
      <Box>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleDeleteTag(tag, index)}
            style={{ marginRight: "8px", marginTop: "4px" }}
          />
        ))}
      </Box>
    </Box>
  );
};

const ImageUploader: React.FC<{
  onFilesUploaded: (files: { file: any, src: string }[]) => void,
  buttonText: string,
  buttonTooltip: string,
  setSelectedImages: (imgs: { file: any, src: string }[]) => void,
  selectedImages: { file: any, src: string }[]
}> = ({ onFilesUploaded, buttonTooltip, buttonText, setSelectedImages, selectedImages }) => {

  const handleDelete = (index: number) => {
    let updatedImages = selectedImages.filter((img, i) => index != i);
    setSelectedImages(updatedImages);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = (event.target.files ?? []);
    const filesdata: { file: any, src: string }[] = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if (file) {
        filesdata.push({ file: file, src: URL.createObjectURL(file) });
      }
    }
    setSelectedImages(filesdata);
    onFilesUploaded(filesdata);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box marginBottom={2} marginTop={2}>
        <input
          accept="image/*"
          id="image-upload"
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label htmlFor="image-upload">
          <Tooltip title={buttonTooltip}>
            <Button
              variant="outlined"
              component="span"
            >{buttonText}
            </Button>
          </Tooltip>
        </label>
      </Box>
      <Box marginBottom={2} marginTop={2} sx={{ display: "flex", gap: 1 }}>
        {selectedImages?.map((selectedImage, index) => {
          return (

            <Chip
              key={index}
              label={selectedImage.file.name}
              variant="outlined"
              onDelete={() => {
                handleDelete(index)
              }}
              avatar={<Avatar alt={selectedImage.file.name} src={selectedImage.src} />}
            />
          )
        })}
      </Box>
    </Box>
  );
};

export default function AddProject() {

  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [degree, setDegree] = useState<number>();
  const [subject, setSubject] = useState<number>();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedImages, setSelectedImages] = useState<{ file: any, src: string }[]>([]);

  useEffect(() => {
    getDegreesData();
    getSubjectsData();
  }, []);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      creationDate: null,
      members: '',
      professorName: '',
      technologies: '',
      degreeId: '',
      subjectId: '',
      repoUrl: '',
      projectUrl: '',
    },
    onSubmit: (values) => {
      formik.setFieldValue('members', members.join(';'));
      formik.setFieldValue('technologies', technologies);
      formik.setFieldValue('creationDate', creationDateValue?.toDate());
      formik.setFieldValue('carrerId', degree);
      formik.setFieldValue('subjectId', subject);
      handleConfirmSaveProject();
    },
    validate: (values) => {
      let errors: any = {};
      if (values.title.length <= 0) {
        errors.title = 'required';
      }
      if (values.description.length <= 0) {
        errors.description = 'required';
      }
      return errors;
    }
  });

  const { handleSubmit, handleChange, handleBlur, errors } = formik;

  const handleOpenForm = () => {
    setOpen(true);
  };

  const handleCloseForm: DialogProps["onClose"] = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    handleClose();
  }

  const handleClose = () => {
    formik.resetForm();
    setCreationDateValue(dayjs());
    setMembers([]);
    setTechnologies([]);
    setOpen(false);
  }

  const handleSaveProject = () => {
    setConfirmDialogOpen(true);
  };

  const goToProjectDetail = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

  const handleConfirmSaveProject = async () => {
    const values: ProjectRequest = {
      ...formik.values,
      creationDate: creationDateValue?.toDate(),
      members: members.join(';'),
      technologies: technologies,
      degreeId: degree,
      subjectId: subject
    };
    console.log(values)
    setDialogLoading(true);
    const projectId = await createNewProject(values, selectedImages.map(s => s.file));
    if (projectId) {
      goToProjectDetail(projectId); // TODO: se debería recargar la lista de projects, no ir al detail
      // TODO: reload
    }
    setDialogLoading(false);
    setConfirmDialogOpen(false);
    handleClose();
  };

  const handleCancelSaveProject = () => {
    handleClose();
    setConfirmDialogOpen(false);
  };

  const [creationDateValue, setCreationDateValue] = useState<Dayjs | null>(dayjs());

  const getDegreesData = async () => {
    const degreesData = await getDegrees();
    setDegrees(degreesData);
  }

  const getSubjectsData = async () => {
    const subjectsData = await getSubjects();
    setSubjects(subjectsData);
  }

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleOpenForm}
        sx={{
          marginTop: 2,
          marginLeft: 2,
          color: darkTheme.palette.primary.light,
        }}
      >
        Agregar Proyecto
      </Button>
      <Dialog disableEscapeKeyDown={true} scroll="paper" open={open} onClose={handleCloseForm} fullWidth maxWidth="md">
        <DialogTitle
          style={{
            borderBottom: "1px solid #00897b",
            color: darkTheme.palette.primary.light,
            fontWeight: "bold",
          }}
        >
          AGREGAR PROYECTO
          <IconButton
            onClick={handleClose}
            style={{
              position: "absolute",
              right: "8px",
              top: "8px",
              color: darkTheme.palette.primary.light,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* title */}
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Título del proyecto"
            fullWidth
            required
            style={{ marginTop: "20px" }}
          />
          {/*
           description 
          */}
          <TextField
            margin="dense"
            id="fullDescription"
            label="Descripción del proyecto"
            fullWidth
            multiline
            rows={4}
            required
            name="description"
            onChange={handleChange}
            inputProps={{ maxLength: 1000 }}
            style={{ marginTop: "15px", marginBottom: "15px" }}
          />
          {/* creation date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de creación"
              value={creationDateValue}
              onChange={(newValue) => setCreationDateValue(newValue)}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            id="professorName"
            label="Profesor"
            fullWidth
            required
            name="professorName"
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ marginTop: "10px" }}
          />
          <TagsInput label="Integrantes" tags={members} setTags={setMembers} />
          <Box
            style={{
              marginTop: "15px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              select
              label="Carrera"
              value={degree ?? ' '}
              onChange={(e) => {
                setDegree(parseInt(e.target.value))
              }}
              fullWidth
              style={{ width: "45%" }}
            >
              {
                degrees.map((d, index) => {
                  return (<MenuItem key={index} value={d.DegreeId}>{d.Name}</MenuItem>)
                })
              }
            </TextField>
            <TextField
              select
              label="Materia"
              value={subject ?? ' '}
              onChange={(e) => {
                setSubject(parseInt(e.target.value))
              }}
              fullWidth
              style={{ width: "45%" }}
            >

              {
                subjects.map((s, index) => {
                  return (<MenuItem key={index} value={s.SubjectId}>{s.Name}</MenuItem>)
                })
              }
            </TextField>
          </Box>
          <TagsInput
            label="Tecnologías"
            tags={technologies}
            setTags={setTechnologies}
          />
          <TextField
            margin="dense"
            id="githubRepo"
            label="Link al Repositorio"
            fullWidth
            required
            name="repoUrl"
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ marginTop: "10px" }}
            InputProps={{
              startAdornment: <OpenInNewIcon style={{ marginRight: "8px" }} />,
            }}
          />

          <TextField
            margin="dense"
            id="proyecto"
            label="Link al Proyecto"
            name="projectUrl"
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            required
            style={{ marginTop: "10px" }}
            InputProps={{
              startAdornment: <LibraryBooksIcon style={{ marginRight: "8px" }} />,

            }}
          />
          {/* TODO: add links implementation
          <TextField
            margin="dense"
            id="linkOne"
            label="Link adicional1"
            fullWidth
            style={{ marginTop: "10px" }}
            InputProps={{
              startAdornment: <OpenInNewIcon style={{ marginRight: "8px" }} />,
            }}
          />
          <TextField
            margin="dense"
            id="linkTwo"
            label="Link adicional2"
            fullWidth
            style={{ marginTop: "10px" }}
            InputProps={{
              startAdornment: <OpenInNewIcon style={{ marginRight: "8px" }} />,
            }}
          />
          
             */}
          <ImageUploader
            buttonText="Cargar fotos"
            buttonTooltip="La primer foto será para la portada"
            onFilesUploaded={(files) => {
              setSelectedImages(files)
            }}
            setSelectedImages={(files) => {
              setSelectedImages(files)
            }}
            selectedImages={selectedImages}
          />

        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          <Button variant="contained" onClick={handleSaveProject}
            disabled={Object.values(errors).length > 0}
          >
            Guardar Proyecto
          </Button>
        </DialogActions>
      </Dialog>
      <ResponsiveDialog
        open={confirmDialogOpen}
        onClose={handleCancelSaveProject}
        onConfirm={handleSubmit}
        actionType="save"
        loading={dialogLoading}
      />
    </div>
  );
}
