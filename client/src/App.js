import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid, Toolbar, Box } from '@mui/material';
import memories from './images/memories.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

//
import { getAllPosts } from './redux/postSlice';

const styles = ( theme ) => ({
    // padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse'
    }
});


const App = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    return (
        <Container maxWidth="lg">
            <AppBar position='static' color='inherit'
                sx={{
                    borderRadius: 15,
                    margin: '30px 0',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Box sx={{
                    maxWidth: '100%',
                    margin: 'auto'
                }}>
                    <Toolbar disableGutters>
                        <Typography variant="h3" align='center' noWrap
                            sx={{
                                color: 'rgba(0,183,255, 1)',
                                display: { xs: 'flex', md: 'flex' },

                            }} >Memories</Typography>
                        <img src={memories} alt='memories' style={{ width: '60px', height: 'auto', margin: '0px 10px', }} />
                    </Toolbar>
                </Box>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid sx={styles} container justifyContent='space-between' alignItems='stretch' spacing={3} >
                        <Grid item xs={12} sm={7} >
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;