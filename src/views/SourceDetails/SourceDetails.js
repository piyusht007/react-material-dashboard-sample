import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/styles';

import {useParams} from 'react-router-dom';
import SourceDetailsTable from './components/SourceDetailsTable';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const SourceDetails = () => {
  const classes = useStyles();
  const {sourceId} = useParams();
  const [sourceDetails, setSourceDetails] = useState({});

  async function fetchData() {
    const res = await fetch(`/postal-update-ws/getSourceDetails/${sourceId}`);

    res.json()
      .then(res => setSourceDetails(res));
  }

  // eslint-disable-next-line
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <SourceDetailsTable sourceDetails={sourceDetails}/>
      </div>
    </div>
  );
};

export default SourceDetails;
