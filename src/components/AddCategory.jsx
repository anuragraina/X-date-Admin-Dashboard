import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  Modal,
  Fade,
  Backdrop,
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
  buttonUploaded: {
    width: "50%",
    marginRight: "1rem",
  },
  buttonDiv: {
    display: "flex",
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

export default function AddCategory() {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCategoryName("");
    setSelectedFile(null);
    setOpen(false);
  };

  const handleUpload = event => {
    const image = event.target.files[0];

    if (image.size < 1048576) setSelectedFile(event.target.files[0]);
    else alert("Image size should be less than 1 MB!!!");
  };

  const handleCategory = event => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (categoryName !== "" && selectedFile !== null) {
      const fd = new FormData();
      fd.append("name", categoryName);
      fd.append("file", selectedFile, "file");

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
          alert("Category added successfully...");
          window.location.reload();
        }
      } catch (err) {
        alert(err.message);
      }

      handleClose();
    } else {
      alert("Both fields are required!!!");
    }
  };

  return (
    <>
      <Button
        classes={{ root: classes.button }}
        variant="contained"
        color="secondary"
        onClick={handleOpen}
      >
        Add Category
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
                  <div className={classes.buttonDiv}>
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      className={
                        selectedFile === null
                          ? classes.buttonDefault
                          : classes.buttonUploaded
                      }
                    >
                      Upload Image
                    </Button>
                    {selectedFile !== null && selectedFile.name}
                  </div>
                </label>

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
