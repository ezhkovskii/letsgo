import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Header from './components/Header';
import Bloggers from './pages/Bloggers';
import Monitoring from './pages/Monitoring';
import PressTours from './pages/PressTours';
import './App/bootstrap.min.css';
import './App.css';
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

/**
 * Показ всплывающего окошка ответа от сервера.
 * @param {object} props Входные параметры
 * @returns {string} Рендер
 * @constructor
 */
function AlertMessage(props) {
    let result = '';
    const [show, setShow] = useState(true);
    if (props.show?.show) {
        result = (
            <ToastContainer className="p-3" position="bottom-end">
                <Toast onClose={() => setShow(false)} show={show} bg={props.show.variant} delay={3000} autohide>
                    <Toast.Header closeButton={true}>
                        <strong className="me-auto">{props.show.title}</strong>
                    </Toast.Header>
                    <Toast.Body>{props.show.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        );
    }
    return result;
}

/**
 * Главный компонент страницы
 * @returns {JSX.Element}
 * @constructor
 */
export default function App() {
    const [show, showPopup] = useState();
    const handleCallback = (childData) =>{
        showPopup(childData);
    }

    return (
        <>
            <Router>
                <div className="main w-100 h-100">
                    <Header openPopupCallback={handleCallback} />
                    <div className="container mt-3">
                        <Switch>
                            <Route exact path="/" component={PressTours}/>
                            <Route path="/bloggers/:id" component={Bloggers}/>
                            <Route path="/monitoring" component={Monitoring}/>
                            <Redirect to="/"/>
                        </Switch>
                    </div>
                </div>
            </Router>
            <AlertMessage show={show} setShow={showPopup}/>
        </>
    );
}


