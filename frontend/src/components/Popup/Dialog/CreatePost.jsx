import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import {Form, Dropdown,DropdownButton} from 'react-bootstrap'
import axios from "axios";
import {SERVER_HOST} from "../../../Utils/Constants";

const PressToursList = (props) => {
    const [title, setTitle] = useState();
    const [status, setStatus] = useState(1);
    const [number_bloggers, setNumberbloggers] = useState(1);
 
    const saveRequest = async () => {
        await axios.post(`${SERVER_HOST}api/v1/press-tours/`, {
            title,
            status: Number(status),
            number_bloggers
        });
        props.onHide()
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
                <Modal.Title>Создать пресс-тур</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div class="form-group">
                     <label for="formGroupExampleInput">Название</label>
                     <input type="text"
                        class="form-control"
                        onChange={(e)=>setTitle(e.target.value)}
                        id="formGroupExampleInput"
                        placeholder="Введите название"/>
                </div>
                <div class="form-group">
                     <label for="formGroupExampleInput">Кол-во блогеров</label>
                     <input type="text"
                        class="form-control"
                        onChange={(e)=>setNumberbloggers(e.target.value)}
                        id="formGroupExampleInput"
                        placeholder="Введите кол-во блогеров"/>
                </div>
                <div class="form-group">
                <label for="inputState">Статус</label>
                    <select id="inputState" class="form-control"onChange={(e)=>setStatus(e.target.value)}>
                        <option selected value="1">Набор блогеров</option>
                        <option value="2">Проведение</option>
                        <option value="3">Завершен</option>
                        </select>
                    </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                  Закрыть
                </Button>
                  <Button variant="primary" onClick={saveRequest}>Создать</Button>
              </Modal.Footer>
              </Modal.Body>
            </Modal>
          </Form>
      </>
    );
}

export default PressToursList;
