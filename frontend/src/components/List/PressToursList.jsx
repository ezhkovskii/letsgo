import React, {useEffect, useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PressToursList = ({data, content}) => {
    return (
        <ListGroup>
            {data.map(item=>
                <ListGroup.Item as={Link} action key={item.id} to='/bloggers'>
                    {item.title}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default PressToursList;
