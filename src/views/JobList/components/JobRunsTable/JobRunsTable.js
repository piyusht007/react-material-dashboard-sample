import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import MUIDataTable from 'mui-datatables';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  success: {
    color: 'green'
  },
  failed: {
    color: 'red'
  },
  warning: {
    color: 'darkorange'
  }
}));

const JobRunsTable = props => {
  const {jobId} = props;
  const [runData, setRunData] = useState([]);

  async function fetchData() {
    const res = await fetch(`/postal-transaction-generator-ws/getRunStats/${jobId}`);

    res.json()
      .then(res => setRunData(res));
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      name: 'runId',
      label: 'Run Id'
    },
    {
      name: 'groupSize',
      label: 'Group Size',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: 'previouslyApplied',
      label: 'PA',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return <span className={classes.success}>{value}</span>
        }
      }
    },
    {
      name: 'changeApplied',
      label: 'CA',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return <span className={classes.success}>{value}</span>
        }
      }
    },
    {
      name: 'rebaseRequired',
      label: 'RR',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return <span className={classes.warning}>{value}</span>
        }
      }
    },
    {
      name: 'processingLock',
      label: 'PL',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return <span className={classes.warning}>{value}</span>
        }
      }
    },
    {
      name: 'invalidRequest',
      label: 'IR',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return <span className={classes.warning}>{value}</span>
        }
      }
    },
    {
      name: 'failedQa',
      label: 'FQ',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return <span className={classes.failed}>{value}</span>
        }
      }
    },
    {
      name: 'failedCommit',
      label: 'FC',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return <span className={classes.failed}>{value}</span>
        }
      }
    },
    {
      name: 'failedOther',
      label: 'FO',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return <span className={classes.failed}>{value}</span>
        }
      }
    },
    {
      name: 'notExecuted',
      label: 'NE',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'total',
      label: 'Total',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return tableMeta.rowData.slice(2,11).reduce((a,b) => a + b);
        }
      }
    },
    {
      name: 'success',
      label: 'Success',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return <span className={classes.success}>{tableMeta.rowData.slice(2,4).reduce((a,b) => a + b)}</span>
        }
      }
    },
    {
      name: 'failed',
      label: 'Failed',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return <span className={classes.failed}>{tableMeta.rowData.slice(7,10).reduce((a,b) => a + b)}</span>
        }
      }
    },
    {
      name: 'startTimestamp',
      label: 'Start Time',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: 'stopTimestamp',
      label: 'End Time',
      options: {
        filter: true,
        sort: true,
      }
    }];

  const options = {
    filterType: 'dropdown',
    responsive: 'scroll'
  };

  const classes = useStyles();

  return (
    <div className={classes.inner}>
      <MUIDataTable
        columns={columns}
        data={runData}
        options={options}
        title={'Job Runs'}
      />
    </div>
  );
};

JobRunsTable.propTypes = {
  className: PropTypes.string,
  jobId: PropTypes.number.isRequired
};

export default JobRunsTable;


