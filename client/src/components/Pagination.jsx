import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";


import { Pagination, PaginationItem } from '@mui/material';
import { Link } from "react-router-dom";
import { getAllPosts } from '../redux/postSlice';

const Paginate = ({ page }) => {

    const dispatch = useDispatch();

    console.log('page from  home', page);

    const {numberOfPages} = useSelector((state) => state.memoryPosts.posts);
    // console.log('pages', numberOfPages);


    //fetch the post anytime the page changes
    useEffect(() => {
        if (page) {
            //we dont want to fetch all posts, only spesific posts on a page
            dispatch(getAllPosts(page));
        }
    }, [page]);

    return (
        <Pagination
            count={numberOfPages}
            page={page || 1}
            variant="outlined"
            color='primary'
            renderItem={(item) => (
                <PaginationItem
                    // components={ { previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    component={Link} to={`/posts?page=${item.page}`} //page property coming from pagination
                    {...item}
                />
            )}
        />
    )
}

export default Paginate;