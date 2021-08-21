import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const List = ({data}) => {
    // const [data, setData] = useState([{title: 'saassa'}, {title: 'sasasasasas'}]);

    useEffect(()=>{
        console.log(data);
    })

    return (
        <div>
            
        </div>
    );
}

export default List;
