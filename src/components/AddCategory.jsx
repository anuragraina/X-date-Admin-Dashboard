import React, { useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
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
  CircularProgress,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
    },
  },
  input: {
    display: 'none',
  },
  button: {
    margin: '1rem',
    boxShadow: theme.customShadows.widget,
    textTransform: 'none',
    '&:active': {
      boxShadow: theme.customShadows.widgetWide,
    },
  },
  displayPaper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
  },
  buttonDefault: {
    width: '100%',
  },
  buttonUploaded: {
    width: '50%',
    marginRight: '1rem',
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  submitButton: {
    backgroundImage: 'linear-gradient(270deg, #FFBB94 0%, #FF889D 100%)',
    color: 'white',
    '&:hover': {
      backgroundImage: 'linear-gradient(90deg, #FFBB94 0%, #FF889D 100%)',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    minWidth: '430px',
    maxWidth: '600px',
    width: '50%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddCategory() {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCategoryName('');
    setSelectedFile(null);
    setProgress(0);
    setOpen(false);
  };

  const handleUpload = async event => {
    setSelectedFile(null);
    setProgress(0);
    const imageFile = event.target.files[0];

    try {
      const compressedFile = await imageCompression(imageFile, {
        maxSizeMB: 1,
        maxWidthOrHeight: 3000,
        onProgress: setProgress,
      });

      if (compressedFile.size > 1048575) {
        alert('Extremely large image!!! Try uploading a smaller one.');
      } else {
        setSelectedFile(compressedFile);
      }
    } catch (error) {
      alert('Please choose a valid image file!!!');
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
    if (categoryName !== '' && selectedFile !== null) {
      const fd = new FormData();
      fd.append('name', categoryName);
      fd.append('file', selectedFile, selectedFile.name);
      fd.append('active', enabled);

      try {
        const response = await axios.post(
          'https://xdate.ml/api/v1/post/category/',
          fd,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (response.status === 200) {
          alert('Category added successfully...');
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
        alert(err.message);
      }

      handleClose();
    } else {
      alert('All fields are required!!!');
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
                        progress > 0 || selectedFile !== null
                          ? classes.buttonUploaded
                          : classes.buttonDefault
                      }
                    >
                      Upload Image
                    </Button>
                    {selectedFile !== null && selectedFile.name}
                    {progress > 0 && progress < 100 && (
                      <CircularProgress
                        color="secondary"
                        variant="static"
                        value={progress}
                      />
                    )}
                  </div>
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
                    disabled={!categoryName || !selectedFile}
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
