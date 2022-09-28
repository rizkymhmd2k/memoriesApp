import { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider, Box } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useNavigate, useParams } from "react-router-dom";
import { getPost, getPostsBySearch } from '../../redux/postSlice';





const PostDetails = () => {
  const { posts: { posts, post }, isLoading } = useSelector(state => state.memoryPosts)

  // const { posts, isLoading } = useSelector(state => state.memoryPosts)
  // console.log('postsssdetails', posts);
  console.log('xxxxposts', posts);
  console.log('apost', post);


  const dispatch = useDispatch()
  const navigate = useNavigate()

  //get the id of params which is 123 : posts/123
  const { id } = useParams()
  console.log('id', id);

  //so we useEffect first for getPost(id) hence it will fill the post object in redux. when there is post we use
  //Effect for fetching getPostBysearch by tags.. it will populate the posts...

  useEffect(() => {
    dispatch(getPost(id))
  }, [id]);

  useEffect(() => {
    if (post) {
      ////we are only looking for tags.
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);



  // to prevent error
  if (!post) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} >
        <CircularProgress size="7em" sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
        }} />
      </Paper>
    );
  }


  //posts.filter is each post inside posts then we want to destructure each post by the _id then if the _id is
  //the same as post._id(from the one post we click bro) filter it...
  const recommendedPosts = posts?.filter(({ _id }) => _id !== post._id)
  console.log('recommendedpost', recommendedPosts)
  // console.log('length', recommendedPosts?.length)



  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      {/* change div into box bro for dealing with mui */}
      <Box
        sx={(theme) => ({
          display: 'flex',
          width: '100%',
          [theme.breakpoints.down("sm")]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
          }
        })}>
        <Box sx={{
          borderRadius: '20px',
          margin: '10px',
          flex: 1,
        }}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </Box>
        <Box sx={(theme) => ({
          marginLeft: '20px',
          [theme.breakpoints.down("sm")]: {
            marginLeft: 0,
          }
        })}>
          {/* change image component into box for better */}
          <Box component="img" src={post.selectedFile || null} alt={post.title} sx={{
            borderRadius: '20px',
            objectFit: 'cover',
            width: '100%',
            maxHeight: '600px',
          }} />
        </Box>
      </Box>
      {!!recommendedPosts.length && (
        <Box sx={{
          borderRadius: '20px',
          margin: '10px',
          flex: 1,
        }}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <Box sx={(theme) => ({
            display: 'flex',
            [theme.breakpoints.down("sm")]: {
              flexDirection: 'column',
            }
          })}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <Box style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)}  key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Paper>


  )
}

export default PostDetails