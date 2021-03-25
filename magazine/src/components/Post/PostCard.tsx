import React, {useEffect, useState} from 'react';
import {getPostInfo, getMinImage} from '../../apiFunctions/apiFunctions';
import {decode_utf8} from '../../resources/Decode/Decode';
import Loading from '../../resources/Loading/Loading';

const PostCard = (props:any) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState(0);
    const [typeName, setTypeName] = useState('');
    const [img, setImg] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        getPostInfo(props.idPost).then((x) =>{
            console.log(x);
            getMinImage(props.idPost).then((y) =>{
                setImg(y);
                setTitle(x[0].titulo);
                setTypeName(x[0].name);
                setType(x[0].id_post_type);
            }).finally(() => setLoading(false));
        });
    });


    return (
        <a href="" className="text-dark card">
            {loading ? (<div className="container">
                <div id="inner" className="row">
                <div className="col-12 text-center">
                    <Loading></Loading>
                </div>   
                </div>
            </div>
            ) 
            : (<div className="card col-sm-12">
                <img src={img} className="card-img-top p-2" height="195" alt="..." />
                <div className="card-body">
                    <div className="row text-center">
                        <div className="col-sm-12 mb-2">
                            <button className="btn btn-outline-cyan btn-sm">{decode_utf8(typeName)}</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h5 className="card-title">{decode_utf8(title)}</h5>
                        </div>
                    </div>
                </div>
            </div>
            )}
            
        </a>
    )
}

export default PostCard
