import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (validateOnChange) {
      validate({ [name]: value });
    }
  };
  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };
  return {
    values,
    setValues,
    errors,
    setErrors,
    resetForm,
    handleInputChange,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
  fullWidth: {
    '& .MuiFormControl-root': {
      width: '100%',
    },

    [theme.breakpoints.down('sm')]: {
      width: '80%',
      margin: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
      margin: 'auto',
    },
  },
}));

export function Form(props) {
  const classes = useStyles();

  const { children, fullWidth, ...other } = props;

  // children refers to the form components inside the <Form tag in employee form
  return (
    <form
      className={fullWidth ? classes.fullWidth : classes.root}
      {...other}
      autoComplete="off"
    >
      {props.children}
    </form>
  );
}
