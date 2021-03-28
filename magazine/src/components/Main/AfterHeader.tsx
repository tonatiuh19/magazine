import React, {useState, useEffect} from 'react';
import {getMainPostsbyType} from '../../apiFunctions/apiFunctions';
import PostCard from '../Post/PostCard';

const AfterHeader = (props:any) => {
    const [posts, setposts] = useState<any>([]);
    const [loading, seLloading] = useState(true);

    useEffect(() => {
        getMainPostsbyType(props.type).then((x) =>{
            setposts(x);
        });
    }, []);

    return (
        <div className="container">
            <div className="row text-center">
                <h1>{props.title}</h1>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4 p-5 justify-content-center">
                {posts.map((x:any, index:number) =>{
                    return (<div className="col" key={index}>
                    <PostCard idPost={x.id_post}></PostCard>
                </div>);
                })}
            </div>
            <div className="row text-center mb-5">
                <div className="d-grid gap-2">
                    <a href="" className="btn btn-dark post-card">Ver mas</a>
                </div>
            </div>
        </div>
    )
}

export default AfterHeader
