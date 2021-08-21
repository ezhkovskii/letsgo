import React, { useEffect, useState } from 'react';
import BlogersList from '../components/List/BlogersList';
import axios from 'axios';
import { Tabs, Tab } from 'react-bootstrap';
import {SERVER_HOST} from "../Utils/Constants";

const Bloggers = (props) => {
    let [posts, setPosts] = useState([]);
    let [curTour, setCurTour] = useState({});

    useEffect(async () => {
        const tourId = props?.match?.params?.id;
        if (tourId) {
            const tourData = await axios.get(`${SERVER_HOST}api/v1/press-tours/${tourId}/?format=json`);
            setCurTour(tourData.data);
        }
        const resultPosts = await axios.get(`${SERVER_HOST}api/v1/get-bloggers-from-instagram-by-params/?key_words=самара`);
        setPosts(resultPosts.data);
    }, []);

    return (
        <>
            <h1>{curTour.title}</h1>
            <Tabs defaultActiveKey="find" id="uncontrolled-tab-example">
                <Tab eventKey="find" title="Поиск">
                    <BlogersList data={posts}/>
                </Tab>
                <Tab eventKey="wait" title="В ожидании">
                    <BlogersList data={posts}/>
                </Tab>
                <Tab eventKey="accept" title="Согласились" tabClassName="text-success">
                    <BlogersList data={posts}/>
                </Tab>
                <Tab eventKey="reject" title="Отказались" tabClassName="text-danger">
                    <BlogersList data={posts}/>
                </Tab>
            </Tabs>
        </>
    );
}

export default Bloggers;
