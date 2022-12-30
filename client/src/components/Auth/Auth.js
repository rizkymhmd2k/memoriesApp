import { React, useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, Box } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signinGoogle, signupGoogle} from '../../redux/userSlice';
import { signIn, signUp} from '../../redux/userSlice';




const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };


const Auth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialFormState)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signUp({formData, navigate}))
        } else {
            dispatch(signIn({formData, navigate}))
        }
    }
    const handleChange = (e) => { //e stands for event
        //only update spesific input that we currently change
        //make sure the name in input is similiar as the state name
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword) //toggle the state of the password
    //prevState, when we need to change previos state
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup) //wtf
        setShowPassword(false)
    }
    /////
 


    function handleGoogleLoginSuccess(tokenResponse) {

        const accessToken = tokenResponse.access_token;
        // console.log('masuk fe',accessToken );

        if(isSignup){
            dispatch(signupGoogle({accessToken, navigate}))
        } else {
            dispatch(signinGoogle({accessToken, navigate}))
        }


    }
    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });



    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2
            }}>
                <Avatar sx={{ margin: 1, backgroundColor: 'secondary.main', }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%', marginTop: 3 }}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
 
                    <Button onClick={() => login()} fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                        {isSignup ? 'Sign Up with google' : "Sign In with google"}
                    </Button>


                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );

}

export default Auth