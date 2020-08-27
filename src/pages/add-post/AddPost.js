import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Button,
  Paper,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle";

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
}));

export default function Tables() {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const handleUpload = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCategory = event => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = () => {
    if (categoryName !== "" && selectedFile !== null) {
      const fd = new FormData();
      fd.append("category", categoryName);
      fd.append("image", selectedFile.name);
      console.log(fd);
      axios
        .post("http://localhost:8009/api/v1/post/category/ops/", fd)
        .then(response => {
          console.log(response);
        });
    }
  };

  return (
    <>
      <PageTitle title="Add Post" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper className={classes.displayPaper}>
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
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </FormControl>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
