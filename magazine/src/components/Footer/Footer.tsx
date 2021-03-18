import React, {useState} from 'react'
import {Modal, Button} from 'react-bootstrap'
import Login from '../Login/Login';
import {useHistory} from 'react-router-dom';

const Footer = () => {
    const [showLogin, setShowLogin] = useState(false);
    const history = useHistory();

    const handleCloseLogin = () =>{
        setShowLogin(false);
    }

    function handleChange(newValue:boolean) {
        setShowLogin(newValue);
    }

    return (
        <footer className="footer mt-auto py-3">
            <Modal
                show={showLogin}
                onHide={handleCloseLogin}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Iniciar Sesión como creativo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Login onChange={handleChange}></Login>
                </Modal.Body>
            </Modal>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4"><span className="text-muted">Place sticky footer content here.</span></div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4"><button className="btn btn-link" onClick={() => setShowLogin(true)}>Creativo</button></div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
