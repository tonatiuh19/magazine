import React, {useEffect, useState} from 'react';
import { useHistory, Link } from "react-router-dom";
import Loading from '../../resources/Loading/Loading';
import {Form, Row, Col} from 'react-bootstrap';
import {getSocialNetworks} from '../../apiFunctions/apiFunctions';
import SocialNetworks from './SocialNetworks';
import { FaExclamationCircle } from 'react-icons/fa';

const NewProfile = () => {

    const [loading, setLoading] = useState(true);
    const [socials, setSocials] = useState([]);
    const [socialsSelected, setSocialsSelected] = useState<any>([]);
    const history = useHistory();

    const signOff = () =>{
        localStorage.clear();
        history.push("/");
    }

    const getUser = () =>{
        return Number(localStorage.getItem("08191993"));
    }

    const userLoggedIn = () =>{
        if (localStorage.getItem("08191993") === null) {
            return false;
        }else{
            return true;
        }
    }



    useEffect(() => {
        if(userLoggedIn()){
            history.push("/creatives");
        }else{
            getSocialNetworks().then((x) => {
                setSocials(x);
            }).finally(() => setLoading(false));
        }
    }, []);

    const sendForm = (e:any) =>{
        e.preventDefault();
        console.log(socials);
    }

    return (
        <div className="container">
            {loading ? (<div id="outer" className="container">
                <div id="inner" className="row">
                    <div className="col-sm-12 text-center">
                        <Loading></Loading>
                    </div>   
                </div>
            </div>) :
            (<div className="container mt-5">
                <div className="row text-center">
                    <div className="col-sm-12">
                        <h1>Bienvenido</h1>
                    </div>
                </div>
                <div className="row text-center justify-content-center">
                    <div className="col-sm-8">
                        
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" className="border border-danger" placeholder="Escribe tu correo electronico" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" className="border border-secondary" placeholder="Escribe una contraseña" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Row>
                                    <Col>
                                        <Form.Control className="border border-secondary" placeholder="Primer Nombre" />
                                    </Col>
                                    <Col>
                                        <Form.Control className="border border-secondary" placeholder="Apellido" />
                                    </Col>
                                </Row>
                            </Form.Group>
                            
                            <div className="container border border-secondary rounded mb-2">
                                <div className="row text-left">
                                    <div className="col-sm-12">
                                        <p>
                                            <label className="mt-1 text-muted">Selecciona e indica cuales son tus perfiles sociales:</label>
                                        </p>
                                    </div>
                                </div>
                                
                                {socials.map((x:any, index:any) => {

                                    const handleSocialContent = (val:any) =>{
                                        x.value = val.value;
                                    }
                                    return (<SocialNetworks key={index} type={x.id_creatives_social_networks_types} value={x.title} onChange={handleSocialContent}></SocialNetworks>);
                                })}
                                
                            </div>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control className="border border-secondary" placeholder="¿Porque te gustaría publicar en pocas palabras tus articulos/notas/noticias/... en Agustirri?" as="textarea" rows={3} />
                            </Form.Group>
                            
                            <Form.Group controlId="formBasicPassword">
                                <button className="btn btn-outline-success col-sm-12" onClick={(e) =>sendForm(e)}>Enviar</button>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <div className="form-check">
                                    <label className="form-check-label text-muted" >Al enviar acepto <a href="">Terminos y condiciones</a> y <a href="">Politicas de privacidad.</a></label>
                                </div>
                            </Form.Group>
                          
                            
                        </Form>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default NewProfile
