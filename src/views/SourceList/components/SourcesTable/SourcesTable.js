import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import MUIDataTable from 'mui-datatables';
import {useHistory} from 'react-router-dom';

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

const SourcesTable = props => {
  const history = useHistory();
  const {sources} = props;
  const columns = [
    {
      name: 'sourceId',
      label: 'Source Id',
      options: {
        display: false
      }
    },
    {
      name: 'sourceName',
      label: 'Source Name',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'country',
      label: 'Country',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'submitTimestamp',
      label: 'Submitted',
      options: {
        filter: true,
        sort: true
      }
    }];

  const options = {
    filterType: 'dropdown',
    responsive: 'scroll',
    onRowClick: (rowData) => {
      console.log('SourceId: ' +rowData[0]);
      history.push('/sources/' + rowData[0]);
    },
    selectableRows: 'single'/*,
    customToolbarSelect: (selectedRows) => (
      <SourcesTableRowSelectToolbar selectedRows={selectedRows} />
    )*/
  };

  const classes = useStyles();

  return (
    <div className={classes.inner}>
      <MUIDataTable
        columns={columns}
        data={sources}
        options={options}
        title={'Sources'}
      />
    </div>
  );
};

SourcesTable.propTypes = {
  className: PropTypes.string,
  sources: PropTypes.array.isRequired
};

export default SourcesTable;


