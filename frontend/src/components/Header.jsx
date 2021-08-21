import React, {useEffect, useState} from 'react';
import styles from "./Header.module.css"
import Login from './Popup/Dialog/Login';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom';

/**
 * Компонент шапки.
 * @param {object} props Параметры компонента.
 * @returns {JSX.Element}
 * @constructor
 */
const Header = (props) => {
    const dropDownTitle = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
        </svg>
    );

    const [modalShow, setModalShow] = useState(false);
    // Временно храним данные в localStorage
    const [forceShow] = useState(!localStorage.getItem('login') || !localStorage.getItem('password'));

    useEffect(async () => {
        setModalShow(forceShow);
    }, []);

    const handleOpenCallback = (childData) => {
        props.openPopupCallback(childData);
    }

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Nav activeKey="/home">
                        <div className="d-flex flex-grow-1 flex-shrink-1">
                            <div className="d-flex">
                                <Nav.Link as={Link} to="/">Пресс-туры</Nav.Link>
                                <Nav.Link as={Link} to="/search">Поиск</Nav.Link>
                                <Nav.Link as={Link} to="/bloggers">Обратная связь</Nav.Link>
                                <Nav.Link as={Link} to="/monitoring">Мониторинг</Nav.Link>
                            </div>
                            <div className="d-flex">
                                <NavDropdown menuVariant="dark" title={dropDownTitle} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={(e) => {setModalShow(true)}}>Настройки инстаграма</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </div>
                    </Nav>
                </Container>
            </Navbar>
            <Login
                show={modalShow}
                onHide={(e) => setModalShow(false)}
                openPopupCallback={handleOpenCallback}
            />
        </>
    );
}
  
export default Header;