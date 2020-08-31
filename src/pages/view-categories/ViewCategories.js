import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateIcon from "@material-ui/icons/Update";
import {
  Grid,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Switch,
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import AddCategory from "../../components/AddCategory";
import ImageModal from "../../components/ImageModal";

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
            <Table className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Category Name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Posts</TableCell>
                  <TableCell>Enabled</TableCell>
                  <TableCell>Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.length !== 0 &&
                  categories.map(category => (
                    <TableRow key={category.id}>
                      <TableCell className="pl-3 fw-normal">
                        {category.id}
                      </TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        <ImageModal url={category.url} name={category.name} />
                      </TableCell>
                      <TableCell>{category.posts}</TableCell>
                      <TableCell>
                        <Switch
                          checked
                          color="secondary"
                          name={category.name}
                        />
                      </TableCell>
                      <TableCell>
                        <UpdateIcon />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
