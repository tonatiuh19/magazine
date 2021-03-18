import React, {useState} from 'react';
import {Form} from 'react-bootstrap';

const InstagramPost = (props:any) => {
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

    return (
        <div>
            <div className="col-sm-12 mt-2" >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Ingresa el link del post de Instagram</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={(e) => handleEditorChange(e.target.value)} />
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

export default InstagramPost
