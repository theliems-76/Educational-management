import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useRive, useStateMachineInput} from '@rive-app/react-canvas';
import {useEffect, useState} from "react";
import './SignIn.css';
const theme = createTheme();

const STATE_MACHINE_NAME = "State Machine 1";

export default function SignIn({checkLogin}) {

    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);

    const {rive, RiveComponent} = useRive({
        src: "../../public/teddylogin.riv",
        autoplay: true,
        stateMachines: STATE_MACHINE_NAME
    })


    useEffect(() => {
        setLook();
    }, [user])

    const stateSuccess = useStateMachineInput(
        rive,
        STATE_MACHINE_NAME,
        'success'
    )
    const stateFail = useStateMachineInput(
        rive,
        STATE_MACHINE_NAME,
        'fail'
    )
    const stateHandUp = useStateMachineInput(
        rive,
        STATE_MACHINE_NAME,
        'hands_up'
    )

    const stateCheck = useStateMachineInput(
        rive,
        STATE_MACHINE_NAME,
        'Check'
    )
    const stateLook = useStateMachineInput(
        rive,
        STATE_MACHINE_NAME,
        'Look'
    )


    const triggerSuccess = () => {
        stateSuccess && stateSuccess.fire();
    }
    const triggerFail = () => {
        stateFail && stateFail.fire();
    }


    const setHangUp = (hangUp) => {
        stateHandUp && (stateHandUp.value = hangUp);
    }

    const setLook = () => {
        if (!stateLook || !stateCheck || !setHangUp) {
            return;
        }
        setHangUp(false)
        setCheck(true);
        let nbChars = 0;
        if (user) {
            nbChars = parseFloat(user.split('').length);
        }

        let ratio = nbChars / parseFloat(41);
        console.log("ratio " + ratio);

        let lookToSet = ratio * 100 - 25
        console.log("lookToSet " + Math.round(lookToSet));
        stateLook.value = Math.round(lookToSet);
    }
    const setCheck = (check) => {
        if (stateCheck) {
            stateCheck.value = check;
        }

    }




    if (rive) {
        console.log(rive.contents);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
      <div className="signin-container">
              <ThemeProvider theme={theme} >
            <Container
                  component="main"
                  maxWidth="xs"
              >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div >
                        <RiveComponent style={{width:'400px', height:'400px'}} src=""/>
                    </div>
                    <Typography component="h1" variant="h5">
                        Đăng nhập
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <form autoComplete="off">
                        <TextField
                            onFocus={() => setHangUp(false)}

                            onChange={(event) => setUser(event.target.value)}
                            value={user}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email hoặc tên đăng nhập"
                            name="email"
                            autoComplete="email"
                            autoFocus

                        />
                        <TextField
                            onChange={(event) =>
                            {
                                setHangUp(true);
                                setPassword(event.target.value);
                                //setHangUp(false);
                            }}
                            //onFocus={() => setHangUp(true)}
                            //onE
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
                        </form>
                        <Button
                            onMouseOver={() => setHangUp(false)}
                            onFocus={() => setHangUp(false)}
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={() => {

                                setCheck(true);
                                if (checkLogin(user, password)) {
                                    triggerSuccess()
                                } else {
                                    triggerFail();
                                }
                            }}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng nhập
                        </Button>
                       
                    </Box>
                </Box>
                {/*<Copyright sx={{ mt: 8, mb: 4 }} />*/}
            </Container>
        </ThemeProvider>
        </div>
    );
}
