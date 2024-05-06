import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '80ced6' }}>
      <Toolbar variant="dense">
        <Typography variant="h3" component="div" sx={{ mr: 2, flexGrow: 1 }} >
            AWS Mock Project
        </Typography>
        
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;