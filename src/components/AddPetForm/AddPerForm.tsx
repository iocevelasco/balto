'use client'

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Container, Grid, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  amount: Yup.number().required('Amount is required').positive('Amount must be positive').integer('Amount must be an integer'),
  deadline: Yup.date().required('Deadline is required'),
  photo: Yup.string().required('Photo is required'),
  cbuOrBankAccount: Yup.string().required('CBU or Bank Account is required'),
});

const initialValues = {
  name: '',
  amount: '',
  deadline: null,
  photo: '',
  cbuOrBankAccount: 'cbu',
};

export const AddPetForm = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue('photo', URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Agrega la informacion de tu mascota
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Amount"
              variant="outlined"
              type="number"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="deadline"
              name="deadline"
              label="Deadline"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.deadline}
              onChange={formik.handleChange}
              error={formik.touched.deadline && Boolean(formik.errors.deadline)}
              helperText={formik.touched.deadline && formik.errors.deadline}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="photo"
              name="photo"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="photo">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            {formik.values.photo && (
              <img src={formik.values.photo} alt="Selected" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            )}
            {formik.touched.photo && formik.errors.photo && (
              <Typography color="error" variant="body2">
                {formik.errors.photo}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="cbuOrBankAccount-label">CBU or Bank Account</InputLabel>
              <Select
                labelId="cbuOrBankAccount-label"
                id="cbuOrBankAccount"
                name="cbuOrBankAccount"
                label="CBU or Bank Account"
                value={formik.values.cbuOrBankAccount}
                onChange={formik.handleChange}
                error={formik.touched.cbuOrBankAccount && Boolean(formik.errors.cbuOrBankAccount)}
              >
                <MenuItem value="cbu">CBU</MenuItem>
                <MenuItem value="bank">Bank Account</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
