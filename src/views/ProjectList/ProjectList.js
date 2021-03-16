import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/styles';

import {ProjectsToolbar, ProjectsTable} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ProjectList = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);

  async function fetchData() {
    const res = await fetch('/postal-transaction-generator-ws/getProjects');

    res.json()
      .then(res => setProjects(res));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <ProjectsToolbar/>
      <div className={classes.content}>
        <ProjectsTable projects={projects}/>
      </div>
    </div>
  );
};

export default ProjectList;
