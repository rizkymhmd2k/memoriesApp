import React from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { MuiChipsInput } from 'mui-chips-input'



import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getAllPosts, getPostsBySearch } from '../../redux/postSlice';
import Pagination from '../Pagination';

const styles = (theme) => ({
    // padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse'
    }
});

//path location and search propery
function useQuery() {
    return new URLSearchParams(useLocation().search)
}




const Home = () => {

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch()
    const query = useQuery();
    const navigate = useNavigate();

    //look for url and check if we had page params in there, default is 1
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')


    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);


    const searchPost = () => {
        if (search.trim() || tags) {
            //render tags into a string bcs we cant send array in url params.
            //[europe, usa] -> europe,usa (turn into string)
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {

        }
    };


    //in search bar
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            //   searchPost();
        }
    };


    //chips
    // const handleChange = () => {
    //     setTags([...tags, tags])
    //   }

    const handleChange = (e) => {
        setTags(e)
    }
    
    


    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid sx={styles} container justifyContent='space-between' alignItems='stretch' spacing={3} >
                    <Grid item xs={12} sm={6} md={9} >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                        <AppBar elevation={2} position='static' color='inherit' sx={{
                            borderRadius: 3,
                            marginBottom: '1rem',
                            display: 'flex',
                            padding: '16px',
                        }}>
                            <TextField name='search' variant='outlined' label='Search Memories'
                                onKeyPress={handleKeyPress} fullWidth value={search}
                                onChange={(e) => setSearch(e.target.value)} />

                            <MuiChipsInput value={tags} onChange={handleChange}
                                style={{ margin: '10px 0px', }} label="tags" variant="outlined" />

                            <Button variant="contained" onClick={searchPost} color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={2} sx={{marginTop:'16px', padding:'10px', borderRadius: 3, }}>
                            <Pagination page={page} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home