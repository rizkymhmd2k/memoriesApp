import React, { useEffect, useState } from 'react'
import { AppBar, Button, Toolbar, Typography, Avatar, Box } from '@mui/material'
import memories from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';

import { Link } from 'react-router-dom'
import { Container } from '@mui/system';
import { useDispatch } from 'react-redux';
import { deAuth } from '../../redux/userSlice';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import decode from 'jwt-decode';









const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();


    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); //this the problemm
    // console.log('navbaruser', user?.result);


    const logout = () => {
        dispatch(deAuth())
        setUser(null)
        navigate("/auth")
    }

    useEffect(() => {
        // const token = user?.token;
        // console.log('token', token);
        //check token expiry
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);



    return (
        <AppBar position='static' color='inherit'
            sx={{
                borderRadius: 15,
                margin: '30px 0',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{
                        maxWidth: '100%',
                        margin: 'auto'
                    }}>
                        <Link to='/' >
                            <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
                            <img src={memories} alt='memories' height="40px" style={{ marginLeft: '10px', marginTop: '5px' }} />
                        </Link>
                    </Box>
                    <Box>
                        <Toolbar>
                            {/* logic: IF the user is logged in vs if they are not */}
                            {user?.result ? (
                                <Box sx={{
                                    display: 'flex', //bikin jdi horizontall
                                    justifyContent: 'space-between',
                                    width: '350px',
                                }}>
                                    {/* no refer policy fixed the errors, try to load image to fix the error */}
                                    {/* <img alt={user.result.name} referrerPolicy="no-referrer" src={user.result.profilePicture} /> */}

                                    <Avatar alt={user.result.name} referrerPolicy="no-referrer" src={user.result.profilePicture} />

                                    <Typography variant='h6'>{user.result.name}</Typography>
                                    <Button variant='contained' color='secondary' onClick={logout}
                                    >Logout</Button>
                                </Box>
                            ) : (
                                <Button component={Link} exact to='/auth' variant='contained' color='primary'>Sign In</Button>
                            )}
                        </Toolbar>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar