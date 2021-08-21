import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header';
import Bloggers from './pages/Bloggers';
import Search from './pages/Search';
import Monitoring from './pages/Monitoring';
import PressTours from './pages/PressTours';
import './App/bootstrap.min.css';
import './App.css';
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

function AlertMessage(props) {
    let result = '';
    if (props.show?.show) {
        result = (
            <div
                aria-atomic="true"
                style={{ minHeight: '240px' }}
            >
                <ToastContainer className="p-3" position="bottom-end">
                    <Toast bg={props.show.variant} delay={500} autohide={true}>
                        <Toast.Header closeButton={true}>
                            <strong className="me-auto">{props.show.title}</strong>
                        </Toast.Header>
                        <Toast.Body>{props.show.message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
        );
    }
    return result;
}

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
                            <Route exact path="/">
                                <PressTours />
                            </Route>
                            <Route path="/search">
                                <Search />
                            </Route>
                            <Route path="/bloggers">
                                <Bloggers />
                            </Route>
                            <Route path="/monitoring">
                                <Monitoring />
                            </Route>
                            <Route path="/bloggers">
                                <Bloggers />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
            <AlertMessage show={show} setShow={showPopup}/>
        </>
    );
}


