import React, {useEffect, useState} from 'react';
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

const CreateJobModal = (props) => {
  const classes = useStyles();
  const {open, startJobInPausedState, handleStartJobInPausedState, handleClose} = props;

  // Dropdown data and configs
  const [projects, setProjects] = useState([]);
  const disableBackdropClick = true;
  const disableEscapeKeyDown = true;

  // Form data, Submit Job attributes
  const [projectId, setProjectId] = useState('');
  const [fileName, setFileName] = useState('');
  const [content, setContent] = useState('');
  const [groupSize, setGroupSize] = useState(0);

  // Change handlers
  function handleProjectIdChange(event) {
    setProjectId(event.target.value);
  }

  function handleGroupSizeChange(event) {
    setGroupSize(event.target.value);
  }

  let fileReader;

  function handleFileRead() {
    const content = fileReader.result;
    console.log(content);
    setContent(content);
  }

  function handleFileNameChange(event) {
    setFileName(event.target.files[0]);
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(event.target.files[0]);
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

    console.log(projectId);
    console.log(groupSize);
    console.log(startJobInPausedState);
    console.log(fileName);
    console.log(content);

    // Prepare form data
    var data = {
      'projectId':projectId,
      'groupSize': groupSize,
      'startPaused': startJobInPausedState,
      'proposals': [{'fileName':fileName.name, 'content': content}]
    }

    /*formData.append('projectId',projectId);
    formData.append('groupSize',groupSize);
    formData.append('startPaused',startJobInPausedState);
    formData.append('proposals', [{'fileName':fileName.name, 'content': content}])*/

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };

    fetch('/postal-transaction-generator-ws/submitJob', requestOptions)
      .then(response => console.log(response));
  }

  const destroy = () => {
    // Clean properties
    setProjectId('');
    setContent('')
    setGroupSize(0);
    setFileName('');

    handleClose();
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
            id="create-job-form"
            method="POST"
            onSubmit={(e) => handleSubmit(e)}
          >
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">Project Id</InputLabel>
              <Select
                autoFocus
                fullWidth
                id="projectId"
                label="Project Id"
                onChange={handleProjectIdChange}
                value={projectId}
              >{renderProjectOptions()}</Select>
              <TextField
                autoFocus
                fullWidth
                id="groupSize"
                label="Group Size"
                onChange={handleGroupSizeChange}
                value={groupSize}
              />
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
              <div className={classes.uploadedFilenames}>{fileName.name
                ? (<div className={classes.test}><span><InsertDriveFileIcon /></span><span>{fileName.name}</span>
                  <span className={classes.fileSize}>{getFileSize(fileName.size)}</span>
                </div>
                )
                : null}</div>
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

CreateJobModal.propsType = {
  open: PropTypes.bool.isRequired,
  startJobInPausedState: PropTypes.bool.isRequired,
  handleStartJobInPausedState: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default CreateJobModal;
