import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import MUIDataTable from 'mui-datatables';
import {useHistory} from 'react-router-dom';
import ProjectsTableRowSelectToolbar from '../ProjectsTableRowSelectToolbar/ProjectsTableRowSelectToolbar';

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
  }
}));

const ProjectsTable = props => {
  const history = useHistory();
  const {projects} = props;
  const columns = [
    {
      name: 'projectId',
      label: 'Project Id',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: 'branchId',
      label: 'Branch Id',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: 'country',
      label: 'Country',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: 'live',
      label: 'Live',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value ? 'true' : 'false';
        }
      }
    },
    {
      name: 'chestnutChangeDetection',
      label: 'CCD',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value ? 'true' : 'false';
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

  const options = {
    filterType: 'dropdown',
    responsive: 'scroll',
    onRowClick: (rowData) => {
      console.log('Project: ' +rowData[0]);
      history.push('/transactions/' + rowData[0]);
    },
    selectableRows: 'single',
    customToolbarSelect: (selectedRows) => (
      <ProjectsTableRowSelectToolbar selectedRows={selectedRows} />
    )
  };

  const classes = useStyles();

  return (
    <div className={classes.inner}>
      <MUIDataTable
        columns={columns}
        data={projects}
        options={options}
        title={'Projects'}
      />
    </div>
  );
};

ProjectsTable.propTypes = {
  className: PropTypes.string,
  projects: PropTypes.array.isRequired
};

export default ProjectsTable;


