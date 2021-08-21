import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import axios from "axios";
import {SERVER_HOST} from "../../../Utils/Constants";

const PressToursList = (props) => {
    const [showLoadingButton, setShowLoadingButton] = useState();
    const [login, editLogin] = useState('');
    const [password, editPassword] = useState('');

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
            await axios.post(`${SERVER_HOST}api/v1/auth-inst/`, {
                username: login,
                password
            });
            // Временно храним данные в localStorage
            localStorage.setItem('login', login);
            localStorage.setItem('password', login);
        } catch (e) {
            props.openPopupCallback({show: true, variant: 'danger', title: 'Ошибка!', message: JSON.parse(e?.response?.data?.msg?.[0])?.detail});
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
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Данные Instagram аккаунта</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Логин"
                      className="mb-3"
                  >
                      <Form.Control onChange={(e) => {editLogin(e.target.value)}} type="email" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Пароль">
                      <Form.Control onChange={(e) => {editPassword(e.target.value)}} type="password" placeholder="Пароль" />
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
      </>
    );
}

export default PressToursList;
