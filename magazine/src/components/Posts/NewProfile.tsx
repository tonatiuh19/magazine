import React, {useEffect, useState} from 'react';
import { useHistory, Link } from "react-router-dom";
import Loading from '../../resources/Loading/Loading';
import {Form} from 'react-bootstrap';

const NewProfile = () => {

    const [loading, setLoading] = useState(true);
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
            setLoading(false);
        }
    }, []);

    return (
        <div className="container">
            {loading ? (<div id="outer" className="container">
                <div id="inner" className="row">
                    <div className="col-sm-12 text-center">
                        <Loading></Loading>
                    </div>   
                </div>
            </div>) :
            (<div className="container card mt-5">
                <div className="row text-center">
                    <div className="col-sm-12">
                        <h1>Bienvenido</h1>
                    </div>
                </div>
                <div className="row card-body text-center justify-content-center">
                    <div className="col-sm-8">
                        
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Escribe tu correo electronico" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Escribe una contraseña" />
                            </Form.Group>
                            
                            <div className="container bg-light rounded">
                                <div className="row text-left">
                                    <div className="col-sm-12">
                                        <p>
                                            <label className="">¿Cuales son tus redes sociales?</label>
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                                            <label className="form-check-label">Check me out</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-8"><input type="text" className="form-control" id="exampleCheck1"></input></div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default NewProfile
