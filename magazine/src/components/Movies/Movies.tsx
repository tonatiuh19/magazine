import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from "react-router-dom";
import Post from '../Post/Post';

const Movies = () => {
    const { id, titulo }:any = useParams();

    return (
        <div>
            <Post id={id} titulo={titulo}></Post>
        </div>
    )
}

export default Movies
