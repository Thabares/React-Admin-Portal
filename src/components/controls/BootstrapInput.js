import React from 'react';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },

    '& .MuiFormHelperText-root': {
      textAlign: 'right',
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function BootstranpInput(props) {
  const classes = useStyles();
  const { name, label, value, error = null, onChange, ...other } = props;

  return (
    <FormControl className={classes.margin}>
      <InputLabel shrink htmlFor="bootstrap-input">
        {label}
      </InputLabel>
      <BootstrapInput
        variant="outlined"
        value={value}
        name={name}
        onChange={onChange}
        {...other}
        {...(error && { error: true, helperText: error })} //returning this error and helper text on the outer components
        id="bootstrap-input"
      />
    </FormControl>
  );
}
