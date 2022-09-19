import React, { useEffect, useState } from 'react'
import { AppBar, Button, Toolbar, Typography, Avatar, Box } from '@mui/material'
import memories from '../../images/memories.png';
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
    console.log('navbaruser', user?.result);


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
        if(token){
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
                        <Toolbar disableGutters>
                            <Typography component={Link} to='/posts' variant="h3" align='center' noWrap
                                sx={{
                                    color: 'rgba(0,183,255, 1)',
                                    display: { xs: 'flex', md: 'flex' },
                                }} >Memories</Typography>
                            <img src={memories} alt='memories' style={{ width: '60px', height: 'auto', margin: '0px 10px', }} />
                        </Toolbar>
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
                                    {/* no refer policy fixed the errors */}
                                    <Avatar alt={user.result.name} src={user.result.profilePicture} referrerpolicy="no-referrer">{user.result.name.charAt(0)}  </Avatar>

                                    <Typography variant='h6'>{user.result.name}</Typography>
                                    <Button variant='contained' color='secondary' onClick={logout}
                                    >Logout</Button>
                                </Box>
                            ) : (
                                <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                            )}
                        </Toolbar>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar