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
    const [styleBtn, setStyleBtn] = useState<any>({});
    const [styleBGcard, setstyleBGcard] = useState<any>("");
    const [styleTypecard, setstyleTypecard] = useState<any>("");

    useEffect(() =>{
        getPostInfo(props.idPost).then((x) =>{
            btnTypes(x[0].id_post_type);
            getMinImage(props.idPost).then((y) =>{
                setImg(y);
                setTitle(x[0].titulo);
                setTypeName(x[0].name);
                if(props.isHeader === 1){
                    setstyleBGcard("card-body text-dark");
                    setstyleTypecard("btn btn-outline-dark btn-sm");
                }else{
                    setstyleBGcard("card-body bg-dark text-white");
                    setstyleTypecard("btn btn-outline-light btn-sm");
                }
            }).finally(() => setLoading(false));
        });
    }, [loading]);

    const btnTypes = (type:number) =>{
        if(type === 1){
            setStyleBtn({
                color: '#4080FF'
            });
        }else if(type === 2){
            setStyleBtn({
                color: '#219634'
            });
        }else if(type === 3){
            setStyleBtn({
                color: '#123456'
            });
        }else if(type === 4){
            setStyleBtn({
                color: '#ad8980'
            });
        }else if(type === 5){
            setStyleBtn({
                color: '#617B92'
            });
        }else if(type === 6){
            setStyleBtn({
                color: '#F00000'
            });
        }else if(type === 7){
            setStyleBtn({
                color: '#098765'
            });
        }else if(type === 8){
            setStyleBtn({
                color: '#955286'
            });
        }
    }   


    return (
        <div>
            {loading ? (<div className="container">
                <div id="inner" className="row">
                <div className="col-12 text-center">
                    <Loading></Loading>
                </div>   
                </div>
            </div>
            ) 
            : (<div className="card h-100 border-dark post-card">
                <a href="" style={{textDecoration: 'none'}}>
                <img src={img} className="card-img-top p-2" alt="..." />
                <div className={styleBGcard}>
                    <div className="row text-center">
                        <div className="col-sm-12 mb-2">
                            <button className={styleTypecard} style={styleBtn}>{decode_utf8(typeName)}</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h5 className="card-title">{decode_utf8(title)}</h5>
                        </div>
                    </div>
                </div>
                </a>
            </div>
            )}
        </div>  
       
    )
}

export default PostCard
