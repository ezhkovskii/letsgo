import React, {useEffect, useState} from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import Popup from '../Popup/Dialog/Base'

const BloggersList = ({data, content}) => {
    return (
        <ListGroup>
            {data.map(item=>
                <ListGroup.Item key={item.id}
                                style={{display: 'flex', justifyContent: 'space-between'}}>
                    {item.title}<Popup variant="primary">Отправить сообщение</Popup>
                </ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default BloggersList;
