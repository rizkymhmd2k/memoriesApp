import React from 'react'
import { Container, Grow, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getAllPosts } from '../../redux/postSlice';

const styles = (theme) => ({
    // padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse'
    }
});


const Home = () => {
    
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPosts())
    }, [currentId, dispatch])



    return (
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
    )
}

export default Home