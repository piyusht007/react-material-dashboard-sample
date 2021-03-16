import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import SettingsIcon from '@material-ui/icons/Settings';
import DescriptionIcon from '@material-ui/icons/Description';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  iconButton: {},
  iconContainer: {
    display: 'flex',
    marginRight: '24px',
  },
  iconContainerElements: {
    marginRight: theme.spacing(2)
  }
}));

const ProjectsTableRowSelectToolbar = props => {
  const {selectedRows} = props;
  const classes = useStyles();

  console.log(selectedRows);

  return (
    <div className={classes.iconContainer}>
      <Tooltip title={'Downloads'}>
        <IconButton className={classes.iconButton}>
          <CloudDownloadIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={'Settings'}>
        <IconButton className={classes.iconButton}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={'Reports'}>
        <IconButton className={classes.iconButton}>
          <DescriptionIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}

ProjectsTableRowSelectToolbar.propTypes = {
  className: PropTypes.string,
  selectedRows: PropTypes.array.isRequired
};

export default ProjectsTableRowSelectToolbar;
