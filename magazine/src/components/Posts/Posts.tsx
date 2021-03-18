import React, { useEffect, useState } from 'react'
import './styles/posts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";
import { getPostsbyUser } from '../../apiFunctions/apiFunctions';
import Loading from '../../resources/Loading/Loading';

const Posts = () => {
    const [idUser, setIdUser] = useState(0);
    const [loading, setLoading] = useState(true);
    const [noPosts, setNoPosts] = useState(false);
    const [posts, setPosts] = useState([]);
    const [newPostStatus, setNewPostStatus] = useState(false);
    const history = useHistory();

    const signOff = () =>{
        localStorage.clear();
        history.push("/");
    }

    const getUser = () =>{
        return Number(localStorage.getItem("08191993"));
    }

    useEffect(() => {
        getPostsbyUser(getUser()).then((x) =>{
            if(x === 0){
                setNoPosts(true);
            }else{
                setPosts(x);
            }

        }).finally(() => setLoading(false));
    }, []);

    return (
        <div >
            <div className="d-flex" id="wrapper">

                <div className="bg-light border-right " id="sidebar-wrapper">
                    <div className="sidebar-heading"><h3>Publicaciones</h3></div>
                    <div className="sidebar-heading"><button className="btn btn-sm btn-outline-dark" onClick={() => signOff()}><FontAwesomeIcon icon={faPowerOff} /></button> @alias</div>
                    <div className="list-group list-group-flush">
                        <a href="#" className="list-group-item list-group-item-action bg-dark text-white">Mis Posts</a>
                        <a href="#" className="list-group-item list-group-item-action bg-light">Mi Perfil</a>
                    </div>
                </div>

                <div id="page-content-wrapper">

                <div className="container-fluid">
                    {loading ? (<Loading></Loading>) : 
                        (<>
                            {newPostStatus ? 
                                (<div className="float-right"><button className="btn btn-outline-danger" onClick={() => setNewPostStatus(false)}><FontAwesomeIcon icon={faTimesCircle} /> Cancelar</button></div>
                                    
                                ) 
                                
                                : (
                                <>
                                    {noPosts ? (
                                        <div id="outer" className="container">
                                            <div id="inner" className="row">
                                                <div className="col-12 text-center">
                                                    <h4>Aun no tienes posts</h4>
                                                    <button className="btn btn-outline-success" onClick={() => setNewPostStatus(true)}><FontAwesomeIcon icon={faPlusCircle} /> Nuevo post</button>
                                                </div>   
                                            </div>
                                        </div>
                                    ): (
                                        <div>Lista Posts</div>
                                    )}
                                </>
                            )}
                            
                        </>)
                    }
                    
                    
                </div>
                </div>

            </div>
        </div>
    )
}

export default Posts
