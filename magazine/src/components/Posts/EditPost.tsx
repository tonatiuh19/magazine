import React, {useState,useEffect} from 'react'
import {Form,} from 'react-bootstrap';
import {getPostAttachmentsByPost} from '../../apiFunctions/apiFunctions'
import Loading from '../../resources/Loading/Loading';
import EditorPost from './EditorPost';
import FacebookPost from './FacebookPost';
import ImagePost from './ImagePost';
import InstagramPost from './InstagramPost';
import TwitterPost from './TwitterPost';
import YoutubePost from './YoutubePost';

const EditPost = (props:any) => {
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [category, setCategory] = useState(0);
    const [loading, setLoading] = useState(true);
    const [postsAttachments, setPostsAttachments] = useState([]);
    const [editContent, setEditContent] = useState<any>([{}]);

    useEffect(() => {
        console.log(editContent);
        getPostAttachmentsByPost(props.idPost).then((x) =>{
            setPostsAttachments(x);
        }).finally(() => setLoading(false));
    }, []);

    const update = (e:any) =>{
        e.preventDefault();
    }

    return (
        <div>
            {loading ? (<div id="outer" className="container">
                <div id="inner" className="row">
                    <div className="col-12 text-center">
                        <Loading></Loading>
                    </div>   
                </div>
            </div>) 
            : 
            (<Form>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Titulo del Articulo/Post/Noticia/Nota</Form.Label>
                <Form.Control 
                type="text" 
                maxLength={115}
                onChange={e => {setTitle(e.target.value)}}
                value={props.title}
                placeholder="Ej. Facebook: Ahora facebook permite publicar videos..." />
                <Form.Text className="text-muted">
                Debe ser menor a 115 caracteres.
                </Form.Text>
                {titleError ? (<div className="alert alert-danger p-1" role="alert">Esta campo no puede estar vacio</div>) : null}
                </Form.Group>

                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>¿Que categoría?</Form.Label>
                    <Form.Control as="select" custom defaultValue={props.type} onChange={(e:any) => {setCategory(e.target.value)}}>
                        {props.postTypes.map((x:any, index:number) => {
                            return (<option key={x.id_post_type} value={x.id_post_type}>{x.name}</option>);
                        })}
                    </Form.Control>
                </Form.Group>
                {postsAttachments.sort((a:any, b:any) => a.order_post - b.order_post).map((x:any, index:any) =>{
                    
                    if(x.id_post_attachment_type === 6){

                        const handleEditorChange = (content:any) => {
                            
                        }
                        return (
                            <div key={index}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <span className="btn btn-dark btn-sm float-left">{x.order_post}</span>
                                    </div>
                                    <EditorPost onChange={handleEditorChange} content={x.content} isEditing={1}></EditorPost>
                                </div>
                                <hr></hr>
                            </div>
                        );
                        
                    }else if(x.id_post_attachment_type === 1){
                       
                        const handleEditorChange = (content:any) => {
                            
                        }
                        return (
                            <div key={index}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <span className="btn btn-dark btn-sm float-left">{x.order_post}</span>
                                    </div>
                                    <YoutubePost onChange={handleEditorChange} content={x.content} isEditing={1}></YoutubePost>
                                </div>
                                <hr></hr>
                            </div>
                        );

                    }else if(x.id_post_attachment_type === 2){
                        
                        const handleEditorChange = (content:any) => {
                        
                        }
                        return (
                            <div key={index}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <span className="btn btn-dark btn-sm float-left">{x.order_post}</span>
                                        
                                    </div>
                                    <InstagramPost onChange={handleEditorChange} content={x.content} isEditing={1}></InstagramPost>
                                </div>
                                <hr></hr>
                            </div>
                        );

                    }else if(x.id_post_attachment_type === 3){
                        
                        const handleEditorChange = (content:any) => {
                            
                        }
                        return (
                            <div key={index}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <span className="btn btn-dark btn-sm float-left">{x.order_post}</span>
                                        
                                    </div>
                                    <div className="col-sm-12 mt-2" >
                                        <TwitterPost onChange={handleEditorChange} content={x.content} isEditing={1}></TwitterPost>
                                    </div>
                                </div>
                                <hr></hr>
                            </div>
                        );

                    }else if(x.id_post_attachment_type === 4){
                        
                        const handleEditorChange = (content:any) => {
                            
                            
                        }
                        return (
                            <div key={index}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <span className="btn btn-dark btn-sm float-left">{x.order_post}</span>
                                        
                                    </div>
                                    <div className="col-sm-12 mt-2" >
                                        <FacebookPost onChange={handleEditorChange} content={x.content} isEditing={1}></FacebookPost>
                                    </div>
                                </div>
                                <hr></hr>
                            </div>
                        );

                    }else if(x.id_post_attachment_type === 5){

                        const handleEditorChange = (content:string) => {
                            
                        }

                        const handleChangeImage = (e:any) => {
                            
                        };
                        return (
                            <div key={index}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <span className="btn btn-dark btn-sm float-left">{x.order_post}</span>
                                        
                                    </div>
                                    <div className="col-sm-12 mt-2 justify-content-center" >
                                        <ImagePost onChange={handleChangeImage} idPostAttach={x.id_post_attachment} order={index} isEditing={1}></ImagePost>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Pie de foto</Form.Label>
                                            <Form.Control type="text" value={x.content} onChange={(e) => handleEditorChange(e.target.value)} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <hr></hr>
                            </div>
                        );
                    }
                })}
                {editContent.length >= 2 ? (<button className="btn btn-primary float-right" onClick={(e) => update(e)}>Actualizar</button>) : null}
            </Form>)}
            
            
        </div>
    )
}

export default EditPost
