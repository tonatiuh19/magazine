import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';
import './styles/login.css';
import {signIn} from '../../apiFunctions/apiFunctions';
import { useHistory } from "react-router-dom";

const Login = (props:any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();

    const signInValidation = () =>{
        if(email === '' || password === ''){
            setError(true);
            setErrorMessage('Necesitas incluir tu correo y contraseña');
        }else{
            if(validateEmail(email)){
                setError(false);
                setLoading(true);
                signIn(email, password).then((x) => {
                    if(x !== 0 && typeof(x) === 'string'){
                        setError(true);
                        setErrorMessage(x);
                    }else if (Array.isArray(x)){
                        localStorage.setItem("08191993", x[0].email)
                        history.push("creatives/");
                        handleChange(false);
                    }else{
                        setError(true);
                        setErrorMessage('El correo o contraseña es incorrecto');
                    }
                }).catch((x) =>{
                    setError(true);
                    setErrorMessage(x);
                })
                .finally(() => setLoading(false));
            }else{
                setError(true);
                setErrorMessage('El correo es incorrecto');
            }
            
        }
    }

    function validateEmail(email: String) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const session = () => {
        const loggedInUser = localStorage.getItem("08191993");
        if (loggedInUser) {
            history.push("creatives/");
            handleChange(false);
        }
    };

    function handleChange(event:boolean) {
        // Here, we invoke the callback with the new value
        props.onChange(event);
    }

    useEffect(() => {
        session();
    }, []);

    return (
        <div className="App">
            <div className="">
                <div className="">
                    <div>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Correo electronico" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>
                        {error ? (<div className="alert alert-danger" role="alert">{errorMessage}</div>) : null}
                        <button type="submit" className="btn btn-primary btn-block" onClick={() => signInValidation()}>Entrar</button>
                        <p className="forgot-password text-right">
                            {/*<a href="#">Olvide mi contraseña</a>*/}
                        </p>
                        {loading ?
                        (<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            <FontAwesomeIcon icon={faHatWizard} pulse />
                        </div>)
                        : null}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
