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
} from '@mui/material';

function InvoiceList({ invoices }) {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #dde1e6' }}>
      <Table sx={{ minWidth: 650 }} aria-label="invoice table">
        <TableHead>
          <TableRow>
            <TableCell>Bill from</TableCell>
            <TableCell>Bill to</TableCell>
            <TableCell>Invoice Number</TableCell>
            <TableCell>Issued</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell align="right">amount Due</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.number} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {invoice.billFrom}
              </TableCell>
              <TableCell>{invoice.billTo}</TableCell>
              <TableCell>N° {invoice.number}</TableCell>
              <TableCell>{invoice.issued}</TableCell>
              <TableCell>{invoice.due}</TableCell>
              <TableCell align="right">{invoice.amount}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={5} align="right" sx={{ fontWeight: 'bold', border: 'none' }}>
              Total amount Due
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', border: 'none' }}>
              $ 5,370.00
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InvoiceList;