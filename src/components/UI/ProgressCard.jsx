import React from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

function ProgressCard({ title, percentage, color }) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h5" component="div" className="text-center font-bold" sx={{ mb: 1.5 }}>
          {percentage}%
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mb: 1.5 }}>
          {title}
        </Typography>
        <BorderLinearProgress variant="determinate" value={percentage} />
      </CardContent>
    </Card>
  );
}

export default ProgressCard;