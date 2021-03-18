import React from 'react'
import './styles/posts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";

const Posts = () => {
    const history = useHistory();

    const signOff = () =>{
        localStorage.clear();
        history.push("/");
    }

    return (
        <div >
            <div className="d-flex" id="wrapper">

                <div className="bg-light border-right " id="sidebar-wrapper">
                    <div className="sidebar-heading">Publicaciones</div>
                    <div className="sidebar-heading"><button className="btn btn-sm btn-outline-dark" onClick={() => signOff()}><FontAwesomeIcon icon={faPowerOff} /></button> @alias</div>
                    <div className="list-group list-group-flush">
                        <a href="#" className="list-group-item list-group-item-action bg-light">Mis Posts</a>
                        <a href="#" className="list-group-item list-group-item-action bg-light">Mi Perfil</a>
                    </div>
                </div>

                <div id="page-content-wrapper">

                <div className="container-fluid">
                    <h1 className="mt-4">Simple Sidebar</h1>
                    <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
                    <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
                </div>
                </div>

            </div>
        </div>
    )
}

export default Posts
