import React from 'react';
import {
  Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

const DeleteCourseModal = ({ open, onClose, onConfirm, course }) => {
  return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Xóa Lớp Học"}
            </DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                   Bạn có chắc chắn muốn xóa lớp {course?.className} không?
                </DialogContentText>
            </DialogContent>
             <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={onConfirm} color="primary" autoFocus>
                    Xóa
                </Button>
            </DialogActions>
       </Dialog>
    );
};

export default DeleteCourseModal;