import React, {useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';

const FacebookPost = (props:any) => {
    const [valid, setValid] = useState(true);

    const handleEditorChange = (content:string) => {
        if(content.length !== 0){
            props.onChange({
                content: content,
                valid: true
            });
            setValid(false);
        }else{
            props.onChange({
                content: content,
                valid: false
            });
            setValid(true);
        }
    }

    useEffect(() => {
        if(props.isEditing === 1){
            setValid(false);
        }
    }, []);

    return (
        <div >
            <div className="col-sm-12 mt-2" >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Ingresa el embed del post de Facebook</Form.Label>
                    <Form.Control type="text" defaultValue={props.content} onChange={(e) => handleEditorChange(e.target.value)} />
                </Form.Group>
            </div>
            {
                valid ? 
                    (<div className="alert alert-danger p-1" role="alert">
                        Esta campo no puede estar vacio
                    </div>) 
                    :  null
            }
        </div>
    )
}

export default FacebookPost

