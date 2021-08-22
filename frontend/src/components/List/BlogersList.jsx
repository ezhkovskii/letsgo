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
                    <div className="w-100 d-flex justify-content-between">
                        <div className="d-flex flex-column" style={{width: 250}}>
                            <span className="px-2 text-left w-100">{item.username}</span>
                            <span className="px-2 text-left text-black-50 w-100 font-italic">{item.full_name}</span>
                        </div>
                        <div className="d-flex justify-content-start flex-column text-left">
                            <span className="px-2 text-left text-black-50">Подписчиков: {item.follower_count}</span>
                            <span className="px-2 text-left text-black-50">Публикаций: {item.media_count}</span>
                        </div>
                        <div>
                            <Popup variant="primary" size="sm">Отправить сообщение</Popup>
                        </div>
                    </div>
                </ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default BloggersList;
