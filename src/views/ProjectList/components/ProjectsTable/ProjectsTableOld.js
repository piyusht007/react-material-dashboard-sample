import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';

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

const ProjectsTableOld = props => {
  const { className, projects, ...rest } = props;

  const classes = useStyles();

  const [selectedProjects, setSelectedProjects] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { projects } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = projects.map(project => project.id);
    } else {
      selectedUsers = [];
    }

    setSelectedProjects(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProjects.indexOf(id);
    let newSelectedProjects = [];

    if (selectedIndex === -1) {
      newSelectedProjects = newSelectedProjects.concat(selectedProjects, id);
    } else if (selectedIndex === 0) {
      newSelectedProjects = newSelectedProjects.concat(selectedProjects.slice(1));
    } else if (selectedIndex === selectedProjects.length - 1) {
      newSelectedProjects = newSelectedProjects.concat(selectedProjects.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedProjects = newSelectedProjects.concat(
        selectedProjects.slice(0, selectedIndex),
        selectedProjects.slice(selectedIndex + 1)
      );
    }

    setSelectedProjects(newSelectedProjects);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProjects.length === projects.length}
                      color="primary"
                      indeterminate={
                        selectedProjects.length > 0 &&
                        selectedProjects.length < projects.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Project Id</TableCell>
                  <TableCell>Branch Id</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Live</TableCell>
                  <TableCell>Chestnut Change Detection</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(project => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={project.projectId}
                    selected={selectedProjects.indexOf(project.projectId) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedProjects.indexOf(project.projectId) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, project.projectId)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>{project.projectId}</TableCell>
                    <TableCell>{project.branchId}</TableCell>
                    <TableCell>{project.country}</TableCell>
                    <TableCell>{project.live}</TableCell>
                    <TableCell>{project.chestnutChangeDetection}</TableCell>
                    <TableCell>{project.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={projects.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

ProjectsTableOld.propTypes = {
  className: PropTypes.string,
  projects: PropTypes.array.isRequired
};

export default ProjectsTableOld;
