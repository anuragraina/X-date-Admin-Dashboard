import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Paper } from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import AddCategory from "../../components/AddCategory";
import Table from "../../components/Table";

export default function ViewCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://xdate.ml/api/v1/post/category")
      .then(response => {
        setCategories(response.data.category);
      })
      .catch(error => {
        alert(error.message);
      });
  }, []);

  return (
    <>
      <PageTitle title="Categories" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper>
            <AddCategory />
            <Table categories={categories} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
