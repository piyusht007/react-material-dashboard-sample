import React from 'react';
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
  }
}));

const SourceDetailsTable = props => {
  const {sourceDetails} = props;
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
    },
    {
      name: 'mainPostalCodeCount',
      label: 'Main Postal Points',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'addressLineCount',
      label: 'Address Lines',
      options: {
        filter: true,
        sort: true
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
        data={[sourceDetails]}
        options={options}
        title={'Source Details'}
      />
    </div>
  );
};

SourceDetailsTable.propTypes = {
  className: PropTypes.string,
  sourceDetails: PropTypes.object.isRequired
};

export default SourceDetailsTable;


