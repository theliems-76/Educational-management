import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const DeleteCourseModal = ({ open, onClose, onConfirm, course }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Xác nhận xóa lớp học
        </Typography>
        <Typography variant="body1" gutterBottom>
          Bạn có chắc chắn muốn xóa lớp học "{course.className}" không?
        </Typography>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} sx={{ marginRight: 2 }}>
            Hủy
          </Button>
          <Button onClick={onConfirm} variant="contained" color="error">
            Xóa
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteCourseModal;