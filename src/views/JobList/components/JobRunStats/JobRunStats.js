import React, {useEffect, useState} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const JobRunStats = props => {
  const {jobId} = props;
  const [runData, setRunData] = useState([]);

  async function fetchData() {
    const res = await fetch(`/postal-transaction-generator-ws/getRunStats/${jobId}`);

    res.json()
      .then(res => setRunData(res));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableRow>
      <TableCell colSpan={runData.length}>
        Custom expandable row option. Data: {JSON.stringify(runData)}
      </TableCell>
    </TableRow>
  )
}

export default JobRunStats;
