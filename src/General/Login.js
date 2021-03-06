import React, { useState } from 'react';
import Controls from '../components/controls/Controls';
import { useForm, Form } from '../components/useForm';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useHistory } from 'react-router-dom';
import * as UserDetails from '../services/UserDetails';
import Notification from '../components/Notification';
import { useEffect } from 'react';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  card: {
    maxWidth: '90%',
    margin: 'auto',
  },
  heading: {
    fontSize: '14px',
    fontWeight: 'bolder',
  },
}));

const initialFValues = {
  email: '',
  password: '',
};

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('email' in fieldValues)
      temp.email = /.+@.+....+...+/.test(fieldValues.email)
        ? ''
        : 'Email is invalid';
    if ('password' in fieldValues)
      temp.password = fieldValues.password ? '' : 'This field is required';
    setErrors({ ...temp });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '');
  };

  useEffect(() => {
    if (localStorage.getItem('userDetails') !== null) {
      history.push('/admin');
    }
  }, []);

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      if (UserDetails.verify(values) === 109) {
        history.push('/admin');
      } else {
        setNotify({
          isOpen: true,
          message: 'User Not Found',
          type: 'error',
        });
      }
    }
  };

  return (
    <div className={classes.root}>
      <Form fullWidth={true} onSubmit={handleSubmit}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} align="center">
            <Typography component="h1" variant="h5" className={classes.heading}>
              REACT ADMIN
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Controls.BootstrapInput
              name="email"
              size="small"
              label="Email Address"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.BootstrapInput
              name="password"
              size="small"
              label="Password"
              type="Password"
              value={values.password}
              onChange={handleInputChange}
              error={errors.password}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Controls.Button
              text="SIGN IN"
              variant="outlined"
              type="submit"
              size="small"
              startIcon={<LockOpenIcon />}
            />
          </Grid>
        </Grid>
      </Form>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
