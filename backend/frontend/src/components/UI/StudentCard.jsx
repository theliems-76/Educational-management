import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Box,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  border: '1px solid #dde1e6',
  display: 'flex',
  flexDirection: 'column',
  minWidth: 200
});

function StudentCard({ student }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

  // Lấy chữ cái đầu của tên
  const initials = student.name
    ? student.name
        .split(' ')
        .map((word) => word[0].toUpperCase())
        .join('')
        .substring(0, 2)
    : '';

    return (
      <StyledCard elevation={0}>
            <CardHeader
              avatar={
                  <Avatar
                      sx={{ bgcolor: "#ddd" }}
                      alt={student.name}
                    >{initials}</Avatar>
              }
              action={
                <>
                  <IconButton aria-label="settings" onClick={handleMenuClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                  </Menu>
                </>
              }
              title={student.name}
            />
            <CardContent>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                  <Box
                      display="flex"
                      flexDirection="column"
                  >
                      <Typography variant="body2" color="text.secondary">
                          {student.course}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                          {student.time}
                      </Typography>
                  </Box>
                  </Box>
                  <Box className="flex items-center gap-1">
                  <Chip label={student.tag} size="small" className="bg-blue-500 text-white" />
                    <Chip
                      label={student.status}
                      size="small"
                      color={student.status === "In progress" ? "primary" : "default"}
                    />
                  </Box>
            </CardContent>
          </StyledCard>
        );
      }

export default StudentCard;