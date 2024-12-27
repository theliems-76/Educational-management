import React from "react";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Box,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
const StyledCard = styled(Card)({
    border: "1px solid #dde1e6",
    display: 'flex', // Thêm để card co giãn theo chiều ngang
    flexDirection: 'column',
    minWidth: 200
  });

function TutorCard({ tutor }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    // Lấy chữ cái đầu của tên
    const initials = tutor.name
      ? tutor.name
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
                alt={tutor.name}
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
        title={tutor.name}
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
                    {tutor.course}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {tutor.time}
                </Typography>
            </Box>
            </Box>
            <Box className="flex items-center gap-1">
            <Chip label={tutor.tag} size="small" className="bg-blue-500 text-white" />
              <Chip
                label={tutor.status}
                size="small"
                color={tutor.status === "In progress" ? "primary" : "default"}
              />
            </Box>
      </CardContent>
    </StyledCard>
  );
}

export default TutorCard;