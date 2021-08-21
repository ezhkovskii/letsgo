import React, { useEffect, useState } from 'react';
import BlogersList from '../components/List/BlogersList';
import axios from 'axios';

const Bloggers = () => {
    let [posts, setPosts] = useState([]);

    useEffect(async () => {
        const resultPosts = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(resultPosts.data);
    }, []);

    return (
        <BlogersList data={posts}/>
    );
}

export default Bloggers;
