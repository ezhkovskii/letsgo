import React, { useEffect, useState } from 'react';
import PressToursList from '../components/List/PressToursList';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import CreatePost from '../components/Popup/Dialog/CreatePost';
import {SERVER_HOST} from "../Utils/Constants";

const PressTours = () => {
    let [posts, setPosts] = useState([]);
    const update = async () => {
        const resultPosts = await axios.get(`${SERVER_HOST}api/v1/press-tours/?format=json`);
        setPosts(resultPosts.data);
    };
    useEffect(update, []);
    const [modalShow, setModalShow] = useState(false);
    return (
        <div className="rounded">
            <div className="pb-3 justify-content-end d-flex">
                <Button variant="secondary" onClick={() => {setModalShow(true)}}>Создать</Button>
            </div>
            <PressToursList data={posts} onDelete={() => update()}/>
            <CreatePost
                show={modalShow}
                onHide={(e) => {setModalShow(false); update()}}
            />
        </div>
    );
}

export default PressTours;
