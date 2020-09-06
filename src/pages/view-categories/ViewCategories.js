import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

// components
import PageTitle from '../../components/PageTitle/PageTitle';
import AddCategory from '../../components/AddCategory';
import Table from '../../components/Table';

const useStyles = makeStyles({
  head: {
    display: 'flex',
    alignItems: 'center',
  },
  status: {
    paddingLeft: '2rem',
  },
});

export default function ViewCategories() {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('https://xdate.ml/api/v1/post/category/ops')
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
            <Grid item xs={12} className={classes.head}>
              <Grid item xs={12} md={6}>
                <AddCategory />
              </Grid>
              <Grid item xs={12} md={6}>
                <span className={classes.status}>
                  Total Categories: {categories.length}{' '}
                </span>
                <span className={classes.status}>
                  Enabled:{' '}
                  {
                    categories.filter(category => category.active === true)
                      .length
                  }{' '}
                </span>
              </Grid>
            </Grid>
            <Table categories={categories} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
