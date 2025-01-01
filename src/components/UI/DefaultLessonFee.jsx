import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { CheckCircleOutline as CheckIcon } from '@mui/icons-material';

function DefaultLessonFee() {
  return (
    <div className='flex-col'>
      <List>
        <ListItem disablePadding>
          <ListItemIcon>
            <CheckIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Branding" />
          <Typography color="text.secondary">+$30</Typography>
        </ListItem>
        <Divider light />
        <ListItem disablePadding>
          <ListItemIcon>
            <CheckIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Marketing" />
          <Typography color="text.secondary">+$75</Typography>
        </ListItem>
        <Divider light />
        <ListItem disablePadding>
          <ListItemIcon>
            <CheckIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="App Building" />
          <Typography color="text.secondary">+$125</Typography>
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
      <div className="flex justify-between items-center">
        <Typography variant="subtitle1" className="font-bold">
          VAT Taxes
        </Typography>
        <Typography variant="subtitle1" className="font-bold">
          $24
        </Typography>
      </div>
      <div className="flex justify-between items-center mt-2">
        <Typography variant="h6" className="font-bold">
          Total Amount
        </Typography>
        <Typography variant="h6" className="font-bold">
          $99
        </Typography>
      </div>
    </div>
  );
}

export default DefaultLessonFee;