import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import MUIDataTable from 'mui-datatables';
import uuid from 'uuid/v1';

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

const JobsTable = props => {
  const {jobs} = props;
  const columns = [
    {
      name: 'jobId',
      options: {
        display: false
      }
    },
    {
      name: 'jobName',
      label: 'Job Name',
      options: {
        filter: true,
        sort: true,
      }
    }, {
      name: 'projectId',
      label: 'Project Id',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: 'groupSize',
      label: 'Grouping',
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: 'runCount',
      label: 'Runs',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'previoslyApplied',
      label: 'PA',
      options: {
        filter: false,
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
        filter: false,
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
        filter: false,
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
        filter: false,
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
        filter: false,
        sort: true,
        customBodyRender: value => {
          return <span className={classes.warning}>{value}</span>
        }
      }
    },
    {
      name: 'failedQA',
      label: 'FQ',
      options: {
        filter: false,
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
        filter: false,
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
        filter: false,
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
        filter: false,
        sort: true
      }
    },
    {
      name: 'total',
      label: 'Total',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return tableMeta.rowData.slice(5,14).reduce((a,b) => a + b);
        }
      }
    },
    {
      name: 'success',
      label: 'Success',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return <span className={classes.success}>{tableMeta.rowData.slice(5,7).reduce((a,b) => a + b)}</span>
        }
      }
    },
    {
      name: 'failed',
      label: 'Failed',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return <span className={classes.failed}>{tableMeta.rowData.slice(10,13).reduce((a,b) => a + b)}</span>
        }
      }
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
      }
    }];
  const [components, setComponents] = useState([]);
  const [loadedComponents, setLoadedComponents] = useState([]);
  const [toggleJobRuns, setToggleJobRuns] = useState(false);

  const addView = async (viewName, jobId) => {
    // Don't load more than once.
    if (loadedComponents.includes(viewName)) return;

    console.log(`Loading ${viewName} view...`);

    import('../JobRunsTable/JobRunsTable.js')
      .then(Component => {
        console.log(jobId);
        setLoadedComponents(loadedComponents.concat(viewName));
        setComponents(components.concat(<Component.default key={uuid()} jobId={jobId}/>
        ));
      });
  };

  const handleRowClick = async rowData => {
    await addView('jobsRun', rowData[0]);
    setToggleJobRuns(true);
  }

  const options = {
    filterType: 'dropdown',
    responsive: 'scroll',
    onRowClick: (rowData) => handleRowClick(rowData)
  };

  const classes = useStyles();

  return (
    <div>
      {
        toggleJobRuns
          ? (<div className={classes.inner}>
            {components.length === 0
              ? null
              : (components)}</div>)
          : (<div className={classes.inner}>
            <MUIDataTable
              columns={columns}
              data={jobs}
              options={options}
              title={'Jobs'}/>
          </div>)
      }
    </div>
  );
};

JobsTable.propTypes = {
  className: PropTypes.string,
  jobs: PropTypes.array.isRequired,
  projectId: PropTypes.string
};

export default JobsTable;



