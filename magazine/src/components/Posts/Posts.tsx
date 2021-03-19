import React, { useEffect, useState } from 'react'
import './styles/posts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { BsFillImageFill, BsTextIndentLeft } from 'react-icons/bs';
import { FiDelete } from 'react-icons/fi';
import { GrYoutube, GrFacebook, GrInstagram, GrTwitter } from 'react-icons/gr';
import { useHistory } from "react-router-dom";
import { getPostsbyUser, getPostsTypes } from '../../apiFunctions/apiFunctions';
import Loading from '../../resources/Loading/Loading';
import {Form} from 'react-bootstrap';

import ImagePost from './ImagePost';
import EditorPost from './EditorPost';
import YoutubePost from './YoutubePost';
import InstagramPost from './InstagramPost';
import TwitterPost from './TwitterPost';
import FacebookPost from './FacebookPost';

const Posts = () => {
    const [loading, setLoading] = useState(true);
    const [noPosts, setNoPosts] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postsTypes, setPostsTypes] = useState([]);
    const [postNewContent, setPostNewContent] = useState([{}]);
    const [newPostStatus, setNewPostStatus] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [category, setCategory] = useState(0);
    const [categoryError, setCategoryError] = useState(false);
    const history = useHistory();

    const signOff = () =>{
        localStorage.clear();
        history.push("/");
    }

    const getUser = () =>{
        return Number(localStorage.getItem("08191993"));
    }

    const addTotEditor = (e:any, type:number) =>{
        e.preventDefault();
        console.log(postNewContent);
        setPostNewContent([...postNewContent, {
            id: 0,
            type: type,
            content: '',
            valid: false
        }]);
    }

    const renderAdd = () =>{
        return (<div className="container">
            <div className="row">
                <div className="col-sm-2"><button className="btn btn-outline-dark" onClick={(e) => addTotEditor(e, 6)}><BsTextIndentLeft /></button></div>
                <div className="col-sm-2"><button className="btn btn-outline-dark" onClick={(e) => addTotEditor(e, 5)}><BsFillImageFill /></button></div>
                <div className="col-sm-2"><button className="btn btn-outline-dark" onClick={(e) => addTotEditor(e, 1)}><GrYoutube /></button></div>
                <div className="col-sm-2"><button className="btn btn-outline-dark" onClick={(e) => addTotEditor(e, 2)}><GrInstagram /></button></div>
                <div className="col-sm-2"><button className="btn btn-outline-dark" onClick={(e) => addTotEditor(e, 4)}><GrFacebook /></button></div>
                <div className="col-sm-2"><button className="btn btn-outline-dark" onClick={(e) => addTotEditor(e, 3)}><GrTwitter /></button></div>
            </div>
        </div>);
    }

    const handleRemoveItem = (e:any, id:number) => {
        //console.log(postNewContent);
        e.preventDefault();
        setPostNewContent(postNewContent.filter((item:any) => item.id !== id));
    };

    const validatePost = () =>{
        if(title === ''){
            setTitleError(true);
            return false;
        }else{
            setTitleError(false);
        }

        if(category === 0){
            setCategoryError(true);
            return false;
        }else{
            setCategoryError(false);
        }

        for (let index = 1; index < postNewContent.length; index++) {
            if(postNewContent[index].valid === false){
                return false;
            }
        }
        return true;
    }

    const publish = (e:any) => {
        e.preventDefault();
        if(!validatePost()){
            setError(true);
            setErrorText('Necesitas completar todos los campos');
        }else{
            setError(false);
            console.log(title);
            console.log(category);
            console.log(postNewContent);
        }
        
    };

    const cancelPost = () =>{
        setErrorText('');
        setPostNewContent([{}]);
        setError(false);
        setNewPostStatus(false);
    }

    useEffect(() => {
        getPostsbyUser(getUser()).then((x) =>{
            getPostsTypes().then((y) => {
                setPostsTypes(y);
            });
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
                                (
                                    <div className="container">
                                        <div className="row justify-content-center">
                                            <div className="col-sm-12">
                                                <div className="float-right"><button className="btn btn-outline-danger" onClick={() => cancelPost()}><FontAwesomeIcon icon={faTimesCircle} /> Cancelar</button></div>
                                            </div>
                                            <div className="col-sm-8">
                                                <Form>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>Titulo del Articulo/Post/Noticia/Nota</Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            maxLength={115}
                                                            onChange={e => {setTitle(e.target.value)}}
                                                            placeholder="Ej. Facebook: Ahora facebook permite publicar videos..." />
                                                        <Form.Text className="text-muted">
                                                        Debe ser menor a 115 caracteres.
                                                        </Form.Text>
                                                        {titleError ? (<div className="alert alert-danger p-1" role="alert">Esta campo no puede estar vacio</div>) : null}
                                                    </Form.Group>

                                                    <Form.Group controlId="exampleForm.SelectCustom">
                                                        <Form.Label>¿Que categoría?</Form.Label>
                                                        <Form.Control as="select" custom onChange={(e:any) => {setCategory(e.target.value)}}>
                                                            <option value={category}>...</option>
                                                            {postsTypes.map((x:any, index) => {
                                                                return (<option key={x.id_post_type} value={x.id_post_type}>{x.name}</option>);
                                                            })}
                                                        </Form.Control>
                                                        {categoryError ? (<div className="alert alert-danger p-1" role="alert">Esta campo no puede estar vacio</div>) : null}
                                                    </Form.Group>
                                                    <label>¿Que quisieras añadir?</label>
                                                    <div className="col-sm-12">
                                                        {renderAdd()}
                                                        <hr></hr>
                                                        <div className="container">
                                                                {postNewContent.map((x:any, index) =>{
                                                                    if(x.type === 6){
                                                                        x.id = index;
                                                                        const handleEditorChange = (content:any) => {
                                                                            x.content = content.content;
                                                                            x.valid = content.valid
                                                                        }
                                                                        return (
                                                                            <div key={index}>
                                                                                <div className="row">
                                                                                    <div className="col-sm-12">
                                                                                        <span className="btn btn-dark btn-sm float-left">{index}</span>
                                                                                        <button className="btn btn-danger btn-sm float-right" onClick={(e) => handleRemoveItem(e, index)}><FiDelete /></button>
                                                                                    </div>
                                                                                    <EditorPost onChange={handleEditorChange}></EditorPost>
                                                                                </div>
                                                                                <hr></hr>
                                                                            </div>
                                                                        );
                                                                        
                                                                    }else if(x.type === 1){
                                                                        x.id = index;
                                                                        const handleEditorChange = (content:any) => {
                                                                            x.content = content.content;
                                                                            x.valid = content.valid
                                                                        }
                                                                        return (
                                                                            <div key={index}>
                                                                                <div className="row">
                                                                                    <div className="col-sm-12">
                                                                                        <span className="btn btn-dark btn-sm float-left">{index}</span>
                                                                                        <button className="btn btn-danger btn-sm float-right" onClick={(e) => handleRemoveItem(e, index)}><FiDelete /></button>
                                                                                    </div>
                                                                                    <YoutubePost onChange={handleEditorChange}></YoutubePost>
                                                                                </div>
                                                                                <hr></hr>
                                                                            </div>
                                                                        );

                                                                    }else if(x.type === 2){
                                                                        x.id = index;
                                                                        const handleEditorChange = (content:any) => {
                                                                            x.content = content.content;
                                                                            x.valid = content.valid
                                                                        }
                                                                        return (
                                                                            <div key={index}>
                                                                                <div className="row">
                                                                                    <div className="col-sm-12">
                                                                                        <span className="btn btn-dark btn-sm float-left">{index}</span>
                                                                                        <button className="btn btn-danger btn-sm float-right" onClick={(e) => handleRemoveItem(e, index)}><FiDelete /></button>
                                                                                    </div>
                                                                                    <InstagramPost onChange={handleEditorChange}></InstagramPost>
                                                                                </div>
                                                                                <hr></hr>
                                                                            </div>
                                                                        );

                                                                    }else if(x.type === 3){
                                                                        x.id = index;
                                                                        const handleEditorChange = (content:any) => {
                                                                            x.content = content.content;
                                                                            x.valid = content.valid
                                                                        }
                                                                        return (
                                                                            <div key={index}>
                                                                                <div className="row">
                                                                                    <div className="col-sm-12">
                                                                                        <span className="btn btn-dark btn-sm float-left">{index}</span>
                                                                                        <button className="btn btn-danger btn-sm float-right" onClick={(e) => handleRemoveItem(e, index)}><FiDelete /></button>
                                                                                    </div>
                                                                                    <div className="col-sm-12 mt-2" >
                                                                                    <TwitterPost onChange={handleEditorChange}></TwitterPost>
                                                                                    </div>
                                                                                </div>
                                                                                <hr></hr>
                                                                            </div>
                                                                        );

                                                                    }else if(x.type === 4){
                                                                        x.id = index;
                                                                        const handleEditorChange = (content:any) => {
                                                                            x.content = content.content;
                                                                            x.valid = content.valid
                                                                            
                                                                        }
                                                                        return (
                                                                            <div key={index}>
                                                                                <div className="row">
                                                                                    <div className="col-sm-12">
                                                                                        <span className="btn btn-dark btn-sm float-left">{index}</span>
                                                                                        <button className="btn btn-danger btn-sm float-right" onClick={(e) => handleRemoveItem(e, index)}><FiDelete /></button>
                                                                                    </div>
                                                                                    <div className="col-sm-12 mt-2" >
                                                                                    <FacebookPost onChange={handleEditorChange}></FacebookPost>
                                                                                    </div>
                                                                                </div>
                                                                                <hr></hr>
                                                                            </div>
                                                                        );

                                                                    }else if(x.type === 5){
                                                                        x.id = index;

                                                                        const handleEditorChange = (content:string) => {
                                                                            x.content = content;
                                                                            console.log(x);
                                                                        }

                                                                        const handleChangeImage = (e:any) => {
                                                                            if (e.target.files.length) {
                                                                                x.preview = URL.createObjectURL(e.target.files[0]);
                                                                                x.raw = e.target.files[0];
                                                                                x.valid = true;
                                                                            }
                                                                        };
                                                                        return (
                                                                            <div key={index}>
                                                                                <div className="row">
                                                                                    <div className="col-sm-12">
                                                                                        <span className="btn btn-dark btn-sm float-left">{index}</span>
                                                                                        <button className="btn btn-danger btn-sm float-right" onClick={(e) => handleRemoveItem(e, index)}><FiDelete /></button>
                                                                                    </div>
                                                                                    <div className="col-sm-12 mt-2 justify-content-center" >
                                                                                        <ImagePost onChange={handleChangeImage}></ImagePost>
                                                                                        <Form.Group controlId="formBasicEmail">
                                                                                            <Form.Label>Pie de foto</Form.Label>
                                                                                            <Form.Control type="text" placeholder="" onChange={(e) => handleEditorChange(e.target.value)} />
                                                                                        </Form.Group>
                                                                                    </div>
                                                                                </div>
                                                                                <hr></hr>
                                                                            </div>
                                                                        );
                                                                    }
                                                                })}
                                                           
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            {error ? (<div className="alert alert-danger" role="alert">{errorText}</div>) : null}
                                                            
                                                            {postNewContent.length >= 2 ? (<button className="btn btn-success float-right" onClick={(e) => publish(e)}>Publicar</button>) : null}
                                                        </div>        
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
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
