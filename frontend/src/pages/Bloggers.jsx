import React, { useEffect, useState } from 'react';
import BlogersList from '../components/List/BlogersList';
import axios from 'axios';
import { Tabs, Tab, InputGroup, Button, FormControl } from 'react-bootstrap';
import {SERVER_HOST} from "../Utils/Constants";
import LoadingIndiacator from '../components/LoadingIndicator';

const Bloggers = (props) => {
    let [posts, setPosts] = useState([]);
    let [curTour, setCurTour] = useState({});
    let [keyWords, setKeyWords] = useState('');
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState('');

    const updatePosts = async () => {
        if (keyWords) {
            setError('');
            setIsLoading(true);
            try {
                const resultPosts = await axios.get(`${SERVER_HOST}api/v1/get-bloggers-from-instagram-by-params/?key_words=${keyWords}`)
                setPosts(resultPosts.data);
            } catch (e) {
                setError('Произошла ошибка... Повторите попытку позже')
            } finally {
                setIsLoading(false);
            }
        }
    }
    useEffect(async () => {
        const tourId = props?.match?.params?.id;
        if (tourId) {
            const tourData = await axios.get(`${SERVER_HOST}api/v1/press-tours/${tourId}/?format=json`);
            setCurTour(tourData.data);
        }
        updatePosts();
    }, []);

    return (
        <>
            <h1>{curTour.title}</h1>
            <Tabs defaultActiveKey="find" id="uncontrolled-tab-example">
                <Tab eventKey="find" title="Поиск">
                    <div class="form-group d-flex flex-content-between">
                        <input type="text"
                            class="form-control"
                            onChange={(e)=>setKeyWords(e.target.value)}
                            id="formGroupExampleInput"
                            placeholder="Введите хэштеги через запятую"/>
                        <Button variant="secondary"
                                size="sm"
                                onClick={updatePosts}>
                            Начать поиск
                        </Button>
                    </div>
                    {isLoading ? <LoadingIndiacator/> : <BlogersList data={posts}/>}
                    {error}
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
