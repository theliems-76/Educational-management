import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './SignIn.css';
import {signIn} from '../apis/signinApi';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const STATE_MACHINE_NAME = 'State Machine 1';

export default function SignIn() {
  const [userId, setUserId] = useState(''); // Sử dụng userId thay vì user
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { rive, RiveComponent } = useRive({
    src: 'teddylogin.riv', // Đảm bảo đường dẫn đến file rive là chính xác
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
  });

  useEffect(() => {
    setLook();
  }, [userId]); // Thay đổi dependency thành userId

  // Lấy các input của animation từ Rive
  const stateSuccess = useStateMachineInput(rive, STATE_MACHINE_NAME, 'success');
  const stateFail = useStateMachineInput(rive, STATE_MACHINE_NAME, 'fail');
  const stateHandUp = useStateMachineInput(rive, STATE_MACHINE_NAME, 'hands_up');
  const stateCheck = useStateMachineInput(rive, STATE_MACHINE_NAME, 'Check');
  const stateLook = useStateMachineInput(rive, STATE_MACHINE_NAME, 'Look');

  // Kích hoạt animation
  const triggerSuccess = () => {
    stateSuccess && stateSuccess.fire();
  };
  const triggerFail = () => {
    stateFail && stateFail.fire();
  };

  // Cài đặt giá trị input của animation Rive
  const setHangUp = (hangUp) => {
    stateHandUp && (stateHandUp.value = hangUp);
  };

  const setLook = () => {
    if (!stateLook || !stateCheck || !setHangUp) {
      return;
    }
    setHangUp(false);
    setCheck(true);
    let nbChars = 0;
    if (userId) {
      nbChars = parseFloat(userId.split('').length); // Tính toán dựa trên userId
    }

    let ratio = nbChars / parseFloat(41);
    let lookToSet = ratio * 100 - 25;
    stateLook.value = Math.round(lookToSet);
  };

  const setCheck = (check) => {
    if (stateCheck) {
      stateCheck.value = check;
    }
  };

  // Xử lý submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId || !password) {
      alert('ID và mật khẩu là bắt buộc.');
      return;
    }

    setIsLoading(true);

    try {
      const { message, role, redirectUrl, token } = await signIn({
        id: userId,
        password: password,
      });

      if (message === 'Đăng nhập thành công.') {
        // Lưu thông tin vào localStorage
        localStorage.setItem('id', userId);
        localStorage.setItem('role', role);
        localStorage.setItem('token', token);

        triggerSuccess();

        // Chuyển hướng dựa trên role
        navigate(redirectUrl);
      } else {
        triggerFail();
        alert(message || 'Đăng nhập thất bại!');
      }
    } catch (error) {
      triggerFail();
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/signin');
        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      } else {
        alert(error.response?.data?.message || 'Đăng nhập thất bại!');
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="signin-container">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div>
              <RiveComponent style={{ width: '400px', height: '400px' }} />
            </div>
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                onFocus={() => setHangUp(false)}
                onChange={(event) => setUserId(event.target.value)} // Cập nhật state userId
                value={userId} // Bind giá trị của input với state userId
                margin="normal"
                required
                fullWidth
                id="id" // Đổi id thành "id"
                label="ID người dùng" // Thay đổi label cho phù hợp
                name="id" // Đổi name thành "id"
                autoComplete="id"
                autoFocus
              />
              <TextField
                onChange={(event) => {
                  setHangUp(true);
                  setPassword(event.target.value);
                }}
                value={password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                onMouseOver={() => setHangUp(false)}
                onFocus={() => setHangUp(false)}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}