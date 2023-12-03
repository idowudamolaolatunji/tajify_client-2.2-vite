import axios from 'axios';

export default axios.create({
    // baseURL: 'http://localhost:3500/api'
    baseURL: 'http://api.tajify.com/api/users',
    // FOLLOW_USER_URL : `http://localhost:3005/api/users/${userId}/request-follow`,
    // USER_URL : `http://localhost:3005/api/users/${id}`,
    // USERS_BLOG_URL : `http://localhost:3005/api/blogs/creator/${creatorslug}`
    // POST_COMMENTS : `http://localhost:3005/api/blogs/post-comment/${id}`,


});
