import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles} from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import getFileSize from '../../../../common/utils';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 300
  },
  groupSize: {
    marginTop: theme.spacing(2)
  },
  formControlLabel: {
    marginTop: theme.spacing(2)
  },
  uploadProposalsButton: {
    marginTop: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  uploadedFilenames: {
    marginTop: theme.spacing(2)
  },
  test: {
    display: 'flex',
    alignItems: 'center'
  },
  fileSize: {
    display: 'inline-block',
    marginLeft: theme.spacing(4)
  }
}));

const CreateJobModalMultiPart = (props) => {
  const classes = useStyles();
  const {projectId} = useParams();
  const {open, startJobInPausedState, handleStartJobInPausedState, handleClose} = props;

  // Dropdown data and configs
  const [projects, setProjects] = useState([]);
  const disableBackdropClick = true;
  const disableEscapeKeyDown = true;

  // Form data, Submit Job attributes
  const defaultProjectId = projectId ? projectId : '';
  const [selectedProjectId, setSelectedProjectId] = useState(defaultProjectId);
  const [files, setFiles] = useState([]);
  const [groupSize, setGroupSize] = useState(0);

  // Change handlers
  function handleProjectIdChange(event) {
    setSelectedProjectId(event.target.value);
  }

  function handleGroupSizeChange(event) {
    setGroupSize(event.target.value);
  }

  function handleFileNameChange(event) {
    setFiles(event.target.files);
  }

  async function fetchProjects() {
    const res = await fetch('/postal-transaction-generator-ws/getProjects');

    res.json()
      .then(res => setProjects(res));
  }

  useEffect(() => {
    console.log('useEffect hook...');
    fetchProjects();
  }, []);

  const renderProjectOptions = () => {
    return projects.map((project, idx) => {
      return (
        <MenuItem
          key={idx}
          value={project.projectId}
        >{project.projectId}</MenuItem>
      );
    }
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(selectedProjectId);
    console.log(groupSize);
    console.log(startJobInPausedState);
    console.log(files);

    var formData = new FormData();
    formData.append('selectedProjectId', selectedProjectId);
    formData.append('groupSize', groupSize);
    formData.append('startPaused',startJobInPausedState);
    formData.append('files', files);

    const requestOptions = {
      method: 'POST',
      body: formData
    };

    fetch('/apex-frontend/startjob', requestOptions)
      .then(response => console.log(response));
  }

  const destroy = () => {
    // Clean properties
    setSelectedProjectId('');
    setGroupSize(0);
    setFiles([]);

    handleClose();
  }

  const getUploadedFiles = () => {
    return (
      <div className={classes.uploadedFilenames}>{files
        ? Object.values(files).map((file, i) => {
          return (
            <div key={'fileToUpload-' + i} className={classes.test}><span><InsertDriveFileIcon/></span><span>{file.name}</span>
              <span className={classes.fileSize}>{getFileSize(file.size)}</span>
            </div>
          )
        })
        : null}
      </div>
    )
  }

  return (
    <div>
      <Dialog
        aria-labelledby="max-width-dialog-title"
        disableBackdropClick={disableBackdropClick}
        disableEscapeKeyDown={disableEscapeKeyDown}
        onClose={destroy}
        open={open}
      >
        <DialogTitle id="form-dialog-title">Create New Job</DialogTitle>
        <DialogContent>
          <form
            action="/submitJob"
            className={classes.form}
            encType="multipart/form-data"
            id="create-job-form"
            method="POST"
            onSubmit={(e) => handleSubmit(e)}
          >
            <FormControl className={classes.formControl}>
              <div>
                <InputLabel id="demo-simple-select-helper-label">Project Id</InputLabel>
                <Select
                  autoFocus
                  fullWidth
                  id="projectId"
                  label="Project Id"
                  onChange={handleProjectIdChange}
                  value={selectedProjectId}
                >{renderProjectOptions()}</Select>
              </div>
              <div className={classes.groupSize}>
                <TextField
                  autoFocus
                  fullWidth
                  id="groupSize"
                  label="Group Size"
                  onChange={handleGroupSizeChange}
                  value={groupSize}
                />
              </div>
            </FormControl>
            <FormControlLabel
              className={classes.formControlLabel}
              control={<Switch
                checked={startJobInPausedState}
                onChange={handleStartJobInPausedState}
              />}
              label="Start job in PAUSED state"
            />
            <InputLabel className={classes.uploadProposalsButton}>Proposal File(s)</InputLabel>
            <div>
              <input
                accept=".csv"
                className={classes.input}
                id="contained-button-file"
                multiple
                onChange={handleFileNameChange}
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  className={classes.uploadProposalsButton}
                  color="primary"
                  component="span"
                  variant="contained"
                >
                  Choose files
                </Button>
              </label>
              {getUploadedFiles()}
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={destroy}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            form="create-job-form"
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CreateJobModalMultiPart.propsType = {
  open: PropTypes.bool.isRequired,
  startJobInPausedState: PropTypes.bool.isRequired,
  handleStartJobInPausedState: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default CreateJobModalMultiPart;
