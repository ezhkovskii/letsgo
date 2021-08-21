import React, {useEffect, useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import Popup from '../Popup/Dialog/Base'

const BloggersList = ({data}) => {
    return (
        <ListGroup>
            {data.map(item =>
                <ListGroup.Item key={item.pk}
                                className="d-flex align-items-center justify-content-between">
                    {/* <img className="rounded" style={{width: 50, height: 50}} src={item.profile_pic_url}/> */}
                    <span className="px-2 text-left w-100">{item.username}</span>
                    <span className="px-2 text-left w-100">{item.full_name}</span>
                    <Popup variant="primary" size="sm">Отправить сообщение</Popup>
                </ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default BloggersList;
