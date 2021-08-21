import React, {useEffect, useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PressToursList = ({data, content}) => {
    return (
        <ListGroup>
            {data.map(item=>
                <ListGroup.Item action key={item.id}><Link to="/bloggers">{item.title}</Link></ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default PressToursList;
