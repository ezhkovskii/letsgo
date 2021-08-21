import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import axios from "axios";
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

function AlertMessage(props) {
    let result = '';
    if (props.show) {
        result = (
            <div
                aria-live="polite"
                aria-atomic="true"
                className="bg-dark position-relative"
                style={{ minHeight: '240px' }}
            >
                <ToastContainer className="p-3" position="bottom-end">
                    <Toast>
                        <Toast.Header closeButton={false}>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
        );
    }
    return result;
}

const PressToursList = (props) => {
    const [showLoadingButton, setShowLoadingButton] = useState();
    const [error, showError] = useState();

    const disableButton = () => {
        return(
            <Button variant="primary" type="submit">
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Загрузка...
            </Button>
        );
    };

    const normalButton = () => {
        return(
            <Button variant="primary" onClick={saveRequest}>Войти</Button>
        );
    }

    const saveRequest = async () => {
        setShowLoadingButton(true);
        try {
            await axios.post('https://e66a-193-233-144-81.ngrok.io/api/v1/auth-inst/', {
                username: "mid.fin",
                password: "AromatVishni0611"
            });

        } catch (e) {
            showError(true);
        }
        setShowLoadingButton(false);
    }
    return (
      <>
          <Form>
            <Modal
              {...props}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Данные Instagram аккаунта</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Email адрес"
                      className="mb-3"
                  >
                      <Form.Control type="email" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Пароль">
                      <Form.Control type="password" placeholder="Пароль" />
                  </FloatingLabel>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                  Закрыть
                </Button>
                  {showLoadingButton ? disableButton() : normalButton()}
              </Modal.Footer>
            </Modal>
          </Form>
          <AlertMessage show={error} setShow={showError}/>
      </>
    );
}

export default PressToursList;
