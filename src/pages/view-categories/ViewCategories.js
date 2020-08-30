import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    width: "100%",
  },
}));

export default function ViewCategories() {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://xdate.ml/api/v1/post/category")
      .then(response => {
        setCategories(response.data.category);
      })
      .catch(error => {});
  }, []);

  return (
    <>
      <PageTitle title="View Categories" />
      <Grid container spacing={4}>
        {categories.length === 0 ? (
          <Typography variant="h4">Loading</Typography>
        ) : (
          categories.map(category => (
            <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={category.name}
                    height="180"
                    image={category.url}
                    title="Categories"
                  />
                </CardActionArea>
                <CardContent>
                  <Typography variant="h5" component="h2" align="center">
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
