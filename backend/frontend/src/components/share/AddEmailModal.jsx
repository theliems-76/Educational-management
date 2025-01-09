import React, { useState } from 'react';
import {
    TextField,
    Typography,
    Box,
    Button,
    Modal,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddEmailModal = ({ open, onClose, onAddEmail }) => {
    const [newEmail, setNewEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleAdd = () => {
        // Gọi hàm xử lý thêm email
        onAddEmail(newEmail);
        setSuccessMessage('Đã thêm email thành công!');
        setNewEmail('');
        setTimeout(() => {
            setSuccessMessage('');
            onClose()
        }, 1000);

    };

    const handleCloseModal = () => {
      setSuccessMessage('');
      onClose()
    }

    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="add-email-modal-title"
            aria-describedby="add-email-modal-description"
        >
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" id="add-email-modal-title">
                        Thêm Email
                    </Typography>
                     <IconButton onClick={handleCloseModal} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px', mb: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Nhập email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        InputProps={{
                            style: { backgroundColor: 'transparent', borderRadius: '4px' },
                            inputProps: {
                                style: { color: 'black' },
                            },
                        }}
                        sx={{
                            '.MuiOutlinedInput-notchedOutline': {
                                border: 'none'
                            }
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    {successMessage && <Typography color="green">{successMessage}</Typography>}
                    <Button variant="contained" onClick={handleAdd} sx={{textTransform: 'none'}}>
                            Thêm Email
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddEmailModal;