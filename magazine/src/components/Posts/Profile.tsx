import React, { useEffect, useState } from 'react'
import './styles/posts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../resources/Loading/Loading';
import { useHistory, Link } from "react-router-dom";
import { getUserInfo } from '../../apiFunctions/apiFunctions';


const Posts = () => {
    const [loading, setLoading] = useState(true);
    const [fullName, setFullName] = useState('');
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
            getUserInfo(getUser()).then((x) =>{
                setFullName(x[0].nombre+' '+x[0].apellido);
            }).finally(() => setLoading(false));
        }else{
            signOff();
        }
    }, []);

    return (
        <div >
            <div className="d-flex" id="wrapper">

                <div className="bg-light border-right " id="sidebar-wrapper">
                    <div className="sidebar-heading"><h3>Publicaciones</h3></div>
                    <div className="sidebar-heading"><button className="btn btn-sm btn-outline-dark" onClick={() => signOff()}><FontAwesomeIcon icon={faPowerOff} /></button> {fullName}</div>
                    <div className="list-group list-group-flush">
                        
                        <Link to="/creatives/" className="list-group-item list-group-item-action bg-light">Mis Posts</Link>
                        <Link to="/profile/" className="list-group-item list-group-item-action bg-dark text-white">Mi Perfil</Link>
                        
                    </div>
                </div>

                <div id="page-content-wrapper">

                <div className="container-fluid">
                    {loading ? (
                        <div id="outer" className="container">
                            <div id="inner" className="row">
                                <div className="col-12 text-center">
                                    <Loading></Loading>
                                </div>   
                            </div>
                        </div>
                    ) : 
                        (<>
                            <div>hola</div>
                            
                        </>)
                    }
                    
                    
                </div>
                </div>

            </div>
        </div>
    )
}

export default Posts
