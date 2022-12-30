import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';


//
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';


// console.log('just env', process.env);


const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log('is user exist?', user);

    return (
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}>
            <BrowserRouter>
                <Navbar />
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" exact element={<Navigate to="/posts" />} />
                        <Route path="/posts" exact element={<Home />} />
                        <Route path="/posts/search" exact element={<Home />} />
                        <Route path="/posts/:id" exact element={<PostDetails />} />


                        {/* <Route path="/auth" exact element={ !user ? <Auth /> : <Navigate to= "/posts" /> } /> */}
                        {/* <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts" />} /> */}
                        <Route path="/auth" exact element={<Auth />} />


                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;