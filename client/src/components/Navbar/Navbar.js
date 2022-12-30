import React, { useEffect, useState } from 'react'
import { AppBar, Button, Toolbar, Typography, Avatar, Box } from '@mui/material'
import clockjam from '../../images/clockjam.png';
import { deepPurple } from '@mui/material/colors';


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
            sx={(theme) => ({
                borderRadius: 0,
                marginBottom: '30px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 50px',
                [theme.breakpoints.down("md")]: {
                    flexWrap: 'wrap',
                    flexDirection: 'column',
                    // bgcolor: 'red',
                    justifyContent: 'space-between',
                    p: 2,
                }
            })}
        >
            {/* <Container maxWidth="xl"> */}

            <Link to='/' style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <img component={Link} to="/" src={clockjam} alt="icon" height="45px" />
                {/* <img src={memories} alt='memories' height="40px" style={{ marginLeft: '10px', marginTop: '5px' }} /> */}
            </Link>

            <Toolbar sx={(theme) => ({
                display: 'flex',
                justifyContent: 'flex-end',
                width: '400px',
                [theme.breakpoints.down("md")]: {
                    width: 'auto',
                    // justifyContent: 'flex-center',
                    // p : 2,
                    // bgcolor: 'red'
                }
            })} >
                {/* <Box sx={{
                        maxWidth: '100%',
                        margin: 'auto'
                    }}>
                    //link component
                    </Box> */}
                {/* <Box>
                        <Toolbar> */}
                {/* logic: IF the user is logged in vs if they are not */}
                {user?.result ? (
                    <Box sx={(theme) => ({
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '400px',
                        alignItems: 'center',
                        [theme.breakpoints.down("sm")]: {
                            //width auto for flexible letter
                            width: 'auto',
                            marginTop: 2,
                            justifyContent: 'center',
                        }
                    })}>
                        {/* no refer policy fixed the errors, try to load image to fix the error */}
                        {/* <img alt={user.result.name} referrerPolicy="no-referrer" src={user.result.profilePicture} /> */}

                        <Avatar alt={user.result.name} referrerPolicy="no-referrer" src={user.result.profilePicture} sx={(theme) => ({
                            color: theme.palette.getContrastText(deepPurple[500]),
                            backgroundColor: deepPurple[500],
                        })} />

                        <Typography sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                        }} variant='h6'>{user.result.name} </Typography>
                        <Button variant='text'  onClick={logout} sx={{
                            marginLeft: '20px',
                        }}
                        >Logout</Button>
                    </Box>
                ) : (
                    <div></div>
                )}
                {/* </Toolbar>
                    </Box> */}
            </Toolbar>
            {/* </Container> */}
        </AppBar>
    )
}

export default Navbar