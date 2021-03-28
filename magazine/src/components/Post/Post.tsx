import React, {useEffect, useState} from 'react';
import Loading from '../../resources/Loading/Loading';
import {getPostContent, getFullUserInfo} from '../../apiFunctions/apiFunctions';
import { useHistory } from "react-router-dom";
import {decode_utf8, firsLetterUpperCase} from '../../resources/Decode/Decode';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaGithub } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import moment from 'moment';
import 'moment/locale/es';

const Post = (props:any) => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<any>([]);
    const [socialUserNetworks, setSocialUserNetworks] = useState<any>([]);
    const [date, setDate] = useState('');
    const [author, setAuthor] = useState('');
    const [styleBtn, setStyleBtn] = useState<any>({});
    const history = useHistory();

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

    useEffect(() => {
        getPostContent(props.id).then((x) =>{
            if(x===0){
                history.push("/");
            }
            document.title = 'Agustirri | '+props.titulo;
            getFullUserInfo(x[0].id_user).then((y)=>{
                setSocialUserNetworks(y);
                btnTypes(x[0].id_post_type);
                setAuthor(y[0].nombre+' '+y[0].apellido);
                
                moment.locale('es');
                setDate(moment(x[0].date_created).format('LLLL'));
                setPost(x);
            }).finally(() => setLoading(false));
        });
    }, [])

    return (
        <div>
            {loading ? (
            <div id="outer" className="container">
                <div id="inner" className="row">
                    <div className="col-12 text-center">
                        <Loading></Loading>
                    </div>   
                </div>
            </div>
            ) 
            : (<>
            <div className="col-sm-12 bg-dark">
                <div className="row p-5 text-white">
                    <div className="col-sm-3 m-2">
                        <button className="btn btn-outline-light btn-sm" style={styleBtn}>{decode_utf8(post[0].name)}</button>
                    </div>
                    <h1>{props.titulo}</h1>
                    <h5 className="mt-2">{decode_utf8(post[0].short_content)}</h5>
                    <small className="mt-2">{'por: '+author+' | '+firsLetterUpperCase(date)+' | '}{ 
                        socialUserNetworks.map((x:any, index:any) =>{
                            if(x.id_creatives_social_networks_type === 1){
                                return (<a className="btn btn-link btn-sm p-1 me-1 text-white" href={x.value} target="_blank"><FaInstagram /></a>);
                            }else if(x.id_creatives_social_networks_type === 2){
                                return (<a className="btn btn-link btn-sm p-1 me-1 text-white" href={x.value} target="_blank"><FaFacebookF /></a>);
                            }else if(x.id_creatives_social_networks_type === 3){
                                return (<a className="btn btn-link btn-sm p-1 me-1 text-white" href={x.value} target="_blank"><FaTwitter /></a>);
                            }else if(x.id_creatives_social_networks_type === 4){
                                return (<a className="btn btn-link btn-sm p-1 me-1 text-white" href={x.value} target="_blank"><FaLinkedinIn /></a>);
                            }else if(x.id_creatives_social_networks_type === 5){
                                return (<a className="btn btn-link btn-sm p-1 me-1 text-white" href={x.value} target="_blank"><SiTiktok /></a>);
                            }else if(x.id_creatives_social_networks_type === 6){
                                return (<a className="btn btn-link btn-sm p-1 me-1 text-white" href={x.value} target="_blank"><FaYoutube /></a>);
                            }else if(x.id_creatives_social_networks_type === 7){
                                return (<a className="btn btn-link btn-sm p-1 me-1 text-white" href={x.value} target="_blank"><FaGithub /></a>);
                            }
                        })
                    }</small>
                </div>
            </div>
            <div className="container">
                <div className="row p-1 justify-content-center">
                    <div className="col-sm-12">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8">
                                    dkoekdeo
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
            )}
        </div>
    )
}

export default Post
