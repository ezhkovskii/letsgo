import React from 'react';
import {Spinner} from 'react-bootstrap';

const LoadingIndicator = () => {
    return (
        <div className="d-flex justify-content-center align-items-center"
                                      style={{height: 200}}>
            <Spinner animation="border" role="status" />
            <div className="m-3">Выполяняется поиск...</div>
        </div>
    );
}

export default LoadingIndicator;
