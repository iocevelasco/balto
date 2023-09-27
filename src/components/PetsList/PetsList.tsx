import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Avatar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const data = [
  {
    name: 'John Doe',
    amount: 1000,
    deadline: '2023-10-15',
    photo: 'https://example.com/photo1.jpg',
    cbuOrBankAccount: 'cbu',
  },
  {
    name: 'Jane Smith',
    amount: 1500,
    deadline: '2023-10-20',
    photo: 'https://example.com/photo2.jpg',
    cbuOrBankAccount: 'bank',
  },
  // Add more data as needed
];

export const PetsList = () => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" align="center" gutterBottom>
        List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Photo</TableCell>
            <TableCell>CBU or Bank Account</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.deadline}</TableCell>
              <TableCell>
                <Avatar src={item.photo} alt={item.name} />
              </TableCell>
              <TableCell>{item.cbuOrBankAccount}</TableCell>
              <TableCell>
                <IconButton color="secondary" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


