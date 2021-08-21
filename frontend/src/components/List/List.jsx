import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

const List = ({data}) => {
    // const [data, setData] = useState([{title: 'saassa'}, {title: 'sasasasasas'}]);

    // useEffect(()=>{
    //     console.log(data);
    // })

    return (
            <ListGroup>
                {data.map(item=>
                    <ListGroup.Item action key={item.id}>{item.title}</ListGroup.Item>
                )}
            </ListGroup>
            
    );
}

export default List;
