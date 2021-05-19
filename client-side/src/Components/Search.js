import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      minWidth: 240
    },
  }
}));

const Search = (props) => {
  const classes = useStyles();
  const handleChange = (e) => {
    props.searchValue(e.target.value);
  };
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Term Search" onChange={handleChange} />
    </form>
  );
};

export default Search;
