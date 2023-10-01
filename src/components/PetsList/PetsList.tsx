import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Avatar, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProfileCard } from '@components/ProfileCard';
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
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        List
      </Typography>
          {data.map((item) => (
            <ProfileCard key={item.name} />
          ))}
    </Box>
  );
};


