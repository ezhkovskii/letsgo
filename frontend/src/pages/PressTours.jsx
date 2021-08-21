import React, { useEffect, useState } from 'react';
import PressToursList from '../components/List/PressToursList';
import axios from 'axios';

const PressTours = () => {
    let [posts, setPosts] = useState([]);

    useEffect(async () => {
        const resultPosts = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(resultPosts.data);
    }, []);

    return (
        <div className="rounded">
            <PressToursList data={posts}/>
        </div>
    );
}

export default PressTours;
