import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import CreateJobModalMultiPart from '../CreateJobModalMultiPart/CreateJobModalMultiPart';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const JobsToolbar = props => {
  const { className, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [startJobInPausedState, setStartJobInPausedState] = useState(false);

  const classes = useStyles();

  const showModal = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setStartJobInPausedState(false);
  }

  const handleStartJobInPausedState = () => {
    setStartJobInPausedState(!startJobInPausedState);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          onClick={showModal}
          variant="contained"
        >
          New Job
        </Button>
        <CreateJobModalMultiPart
          handleClose={handleClose}
          handleStartJobInPausedState={handleStartJobInPausedState}
          open={open}
          startJobInPausedState={startJobInPausedState}
        />
      </div>
    </div>
  );
};

JobsToolbar.propTypes = {
  className: PropTypes.string
};

export default JobsToolbar;
