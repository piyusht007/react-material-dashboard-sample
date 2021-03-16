import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import JobsTable from './components/JobsTable/JobsTable';
import JobsToolbar from './components/JobsToolbar';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const JobList = () => {
  const classes = useStyles();
  const {projectId} = useParams();

  const [jobs, setJobs] = useState([]);

  console.log('project Id: '+projectId);

  async function fetchData() {
    let res;

    if (projectId) {
      res = await fetch(`/postal-transaction-generator-ws/getJobsForProject/${projectId}`);
    } else {
      res = await fetch('/postal-transaction-generator-ws/getJobs');
    }

    res.json()
      .then(res => setJobs(res));
  }

  // eslint-disable-next-line
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <JobsToolbar/>
      <div className={classes.content}>
        <JobsTable jobs={jobs}/>
      </div>
    </div>
  );
};

JobList.propTypes = {
  projectId: PropTypes.string
}

export default JobList;
