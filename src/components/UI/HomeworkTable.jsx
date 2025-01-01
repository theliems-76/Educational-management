import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Tooltip,
  IconButton
} from '@mui/material';
import { Visibility as VisibilityIcon, Description as DescriptionIcon } from '@mui/icons-material';

const headerCellStyle = { fontWeight: 'bold', textAlign: 'center' };

function HomeworkTable({ homeworks }) {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        My homework
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="homework table">
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle}>Status</TableCell>
              <TableCell style={headerCellStyle}>Homework</TableCell>
              <TableCell style={headerCellStyle}>Subject</TableCell>
              <TableCell style={headerCellStyle}>Teacher</TableCell>
              <TableCell style={headerCellStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {homeworks.map((homework) => (
              <TableRow key={homework.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                <Tooltip title={homework.status} placement="top">
                    <Chip
                      label={homework.status}
                      color={
                        homework.status === 'In progress'
                          ? 'primary'
                          : homework.status === 'Completed'
                          ? 'success'
                          : 'default' // 'default' or any other color for 'Canceled'
                      }
                    />
                  </Tooltip>
                </TableCell>
                <TableCell align="center">{homework.name}</TableCell>
                <TableCell align="center">{homework.subject}</TableCell>
                <TableCell align="center">{homework.teacher}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View" placement="top">
                    <IconButton color="primary" aria-label="view">
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download" placement="top">
                    <IconButton color="primary" aria-label="download">
                      <DescriptionIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default HomeworkTable;