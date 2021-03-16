import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/styles';

import SourcesToolbar from './components/SourcesToolbar/SourcesToolbar';
import SourcesTable from './components/SourcesTable/SourcesTable';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const SourceList = () => {
  const classes = useStyles();
  const [sources, setSources] = useState([]);

  async function fetchData() {
    const res = await fetch('/postal-update-ws/getSources');

    res.json()
      .then(res => setSources(res));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <SourcesToolbar/>
      <div className={classes.content}>
        <SourcesTable sources={sources}/>
      </div>
    </div>
  );
};

export default SourceList;
