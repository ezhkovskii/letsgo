import React, {useEffect, useState} from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import {SERVER_HOST} from "../../Utils/Constants";

const PressToursList = ({data, content, onDelete}) => {
    const [status] = useState(['Набор блогеров', 'Проведение', 'Завершен']);
    const deleteRequest = async (id) => {
        await axios.delete(`${SERVER_HOST}api/v1/press-tours/${id}/`);
        onDelete();
    }
    return (
        <ListGroup>
            {data.map(item =>
                <ListGroup.Item as={Link} action key={item.id} to={'/bloggers/' + item.id}>
                    <div class="container">
                    <div class="row">
                            <div class="col">
                                <h3 class="col">{item.title}</h3>
                            </div>
                            <div class="col">
                                <div class="row">
                                    <div class="text-black-50">Дата создания: {item.created}</div>
                                    <div class="text-black-50">Кол-во блогеров: {item.number_bloggers}</div>
                                    <div class="text-black-50">Статус: {item.status ? status[item.status] : ''}</div>
                                </div>
                            </div>
                            <div class="col-2">
                                <Button variant="link" size="sm" onClick={(e)=>{e.preventDefault(); deleteRequest(item.id)}}>Удалить</Button>
                            </div>
                    </div>
                    
                    </div>
                </ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default PressToursList;
