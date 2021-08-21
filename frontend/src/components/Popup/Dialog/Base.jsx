import React, {useEffect, useState} from 'react';
import { Button, Modal, ButtonGroup, Form } from 'react-bootstrap';

const PressToursList = ({data, children, content, show1}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
            {children}
        </Button>
  
        <Modal
          show={show1}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Чат</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Сообщение</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          </Modal.Body>
          <Modal.Footer>
          <ButtonGroup aria-label="Basic example">
            <Button variant="danger" onClick={handleClose}>Отказался</Button>
            <Button variant="success" onClick={handleClose}>Согласился</Button>
           </ButtonGroup>
            <Button variant="primary">Отправить сообщение</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default PressToursList;
