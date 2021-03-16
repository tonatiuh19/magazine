import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';
import './styles/login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const signInValidation = () =>{

    }

    return (
        <div className="App">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <div>
                        <a href="https://tienditacafe.com/">
                            El Logo
                        </a>
                        <h3></h3>

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
