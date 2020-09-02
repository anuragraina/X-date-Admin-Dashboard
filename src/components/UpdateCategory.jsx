import React, { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import {
  Grid,
  Button,
  FormControl,
  FormControlLabel,
  OutlinedInput,
  InputLabel,
  Modal,
  Fade,
  Backdrop,
  Switch,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
    },
  },
  input: {
    display: "none",
  },
  button: {
    margin: "1rem",
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    "&:active": {
      boxShadow: theme.customShadows.widgetWide,
    },
  },
  displayPaper: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
  },
  buttonDefault: {
    width: "100%",
  },
  image: {
    width: "100%",
  },
  buttonDiv: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonItem: {
    padding: "0.5rem",
  },
  submitButton: {
    backgroundImage: "linear-gradient(270deg, #FFBB94 0%, #FF889D 100%)",
    color: "white",
    "&:hover": {
      backgroundImage: "linear-gradient(90deg, #FFBB94 0%, #FF889D 100%)",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    minWidth: "430px",
    maxWidth: "600px",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function UpdateCategory(props) {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryName, setCategoryName] = useState(props.category.name);
  const [enabled, setEnabled] = useState(props.category.active);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCategoryName(props.category.name);
    setSelectedFile(null);
    setOpen(false);
  };

  const handleUpload = async event => {
    const imageFile = event.target.files[0];

    try {
      const compressedFile = await imageCompression(imageFile, {
        maxSizeMB: 1,
      });

      setSelectedFile(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = event => {
    setCategoryName(event.target.value);
  };

  const handleStatus = () => {
    setEnabled(!enabled);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let flag = 0;

    const fd = new FormData();

    if (categoryName === "") {
      alert("Category name cannot be empty!!!");
      setCategoryName(props.category.name);
    } else {
      if (categoryName !== props.category.name) {
        fd.append("name", categoryName);
        flag++;
      }
    }

    if (selectedFile !== null) {
      fd.append("file", selectedFile, "file");
      flag++;
    }

    if (enabled !== props.category.active) {
      fd.append("active", enabled);
      flag++;
    }

    if (flag > 0) {
      fd.append("category_id", props.category.id);
      try {
        const response = await axios.post(
          "https://xdate.ml/api/v1/post/category/ops/",
          fd,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (response.status === 200) {
          alert("Category updated successfully...");
          window.location.reload();
        }
      } catch (err) {
        alert(err.message);
      }

      handleClose();
    } else {
      alert("Nothing updated!");
    }
  };

  return (
    <>
      <Button color="primary" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid container spacing={4} className={classes.paper}>
            <Grid item xs={12}>
              <form className={classes.root}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="component-outlined">Category</InputLabel>
                  <OutlinedInput
                    id="component-outlined"
                    label="Category"
                    onChange={handleCategory}
                    value={categoryName}
                  />
                </FormControl>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  onChange={handleUpload}
                />
                <label htmlFor="contained-button-file">
                  <Grid container className={classes.buttonDiv}>
                    <Grid item xs={12} md={6} className={classes.buttonItem}>
                      {selectedFile === null ? (
                        <img
                          src={props.category.url}
                          alt={props.category.name}
                          className={classes.image}
                        />
                      ) : (
                        selectedFile.name
                      )}
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.buttonItem}>
                      <Button
                        variant="outlined"
                        color="primary"
                        component="span"
                        className={classes.buttonDefault}
                      >
                        Update Image
                      </Button>
                    </Grid>
                  </Grid>
                </label>
                <FormControlLabel
                  control={
                    <Switch
                      checked={enabled}
                      onChange={handleStatus}
                      name={categoryName}
                      color="secondary"
                    />
                  }
                  label="Status"
                />
                <FormControl>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                    className={classes.submitButton}
                  >
                    Submit
                  </Button>
                </FormControl>
              </form>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </>
  );
}
