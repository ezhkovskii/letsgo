import React, { useEffect, useState } from 'react';
import List from '../components/List/List';
import axios from 'axios';

const PressTours = () => {
    let [posts, setPosts] = useState([]);

    useEffect(async () => {
        const resultPosts = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(resultPosts);
    });

    return (
        <div>
            <List data={posts}/>
        </div>
    );
}

export default PressTours;
