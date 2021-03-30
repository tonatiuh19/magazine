import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from "react-router-dom";
import Loading from '../../resources/Loading/Loading';
import {getPostsByType} from '../../apiFunctions/apiFunctions';
import Post from '../Post/Post';
import PostsType from '../Post/PostsType';

const Principal = (props:any) => {
    const { id, titulo }:any = useParams();
    const history = useHistory();
    if(id === undefined || titulo === undefined){
        return (
            <div>
                <PostsType idType={props.idType} type={props.type}></PostsType>
            </div>
        );
    }else{
        return (
            <div>
                <Post id={id} titulo={titulo}></Post>
            </div>
        );
    }
    
}

export default Principal
