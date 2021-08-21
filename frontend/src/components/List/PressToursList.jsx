import React, {useEffect, useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const PressToursList = ({data, content}) => {
    const history = useHistory();
    return (
        <ListGroup>
            {data.map(item=>
                <ListGroup.Item action key={item.id} onClick={() => history.push('/bloggers')}>{item.title}</ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default PressToursList;
