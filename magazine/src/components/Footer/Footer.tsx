import React, {useState} from 'react'
import {Modal} from 'react-bootstrap-v5'
import Login from '../Login/Login';
import { FaFacebookF, FaInstagram, FaTwitter, FaArrowAltCircleRight } from 'react-icons/fa';

const Footer = () => {
    const [showLogin, setShowLogin] = useState(false);

    const handleCloseLogin = () =>{
        setShowLogin(false);
    }

    function handleChange(newValue:boolean) {
        setShowLogin(newValue);
    }

    return (
        <>
            <Modal
                show={showLogin}
                onHide={handleCloseLogin}
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Iniciar Sesión como creativo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Login onChange={handleChange}></Login>
                </Modal.Body>
            </Modal>
            <footer className="footer mt-auto py-3 bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <br></br>
                            <br></br>
                            <br></br>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <a href="#" className="btn btn-light btn-sm m-1"><FaFacebookF /></a>
                                        <a href="#" className="btn btn-light btn-sm m-1"><FaInstagram /></a>
                                        <a href="#" className="btn btn-light btn-sm m-1"><FaTwitter /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-6 text-end">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-6 ">
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <button className="btn btn-link text-white footerLinks" onClick={() => setShowLogin(true)}><small className="footerLinks"><FaArrowAltCircleRight /> Creativo</small></button>
                                    </div>
                                    <div className="col-sm-6">
                                        <a className="btn btn-link text-white" href=""><small className="footerLinks"><FaArrowAltCircleRight /> Anúnciate con nosotros</small></a>
                                        <br></br>
                                        <a className="btn btn-link text-white" href=""><small className="footerLinks"><FaArrowAltCircleRight /> Términos y condiciones</small></a>
                                        <br></br>
                                        <a className="btn btn-link text-white" href=""><small className="footerLinks"><FaArrowAltCircleRight /> Aviso de privacidad</small></a>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
