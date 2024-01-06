import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { AUTH } from '../../constants/actionTypes';
import Input from './Input'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode'
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const history = useHistory();
    const [form, setForm] = useState(initialState);
    const classes = useStyles();
    const isSingUp = false;
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        if(isSignup){
            dispatch(signup(formData, history))
        } else{
            dispatch(signin(formData, history))

        }
    }
    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };
    const handleShowPassword = () => setShowPassword(!showPassword);
    const googleError = (error) => {
        console.log('Google Sign In was unsuccessful. Try again later');
        console.log(error)
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const googleSuccess = async (result, token) => {
        console.log('Google Sign In was successful')
        console.log(result)
        try {
            dispatch({ type: AUTH, data: { result, token } });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSingUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
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
                    <Button type="submit" justifyContent="center" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleOAuthProvider

                        clientId="902811049685-1q4ncgjl945qsfnab5fnc5ng4pr5s4mo.apps.googleusercontent.com"
                    >
                        <GoogleLogin onSuccess={Response => {
                            const token = Response.credential
                            const decode = jwtDecode(token)
                            {googleSuccess(decode, token)}
                        }}
                            onError={googleError}
                        />
                    </GoogleOAuthProvider>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sing Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}

export default Auth