import React, {useEffect, useState} from 'react';
import {getPostsHeader, getMainPostsbyType} from '../../apiFunctions/apiFunctions';
import Loading from '../../resources/Loading/Loading';
import {decode_utf8} from '../../resources/Decode/Decode';
import PostCard from '../Post/PostCard';

const Main = () => {
    const [postsHeader, setPostsHeader] = useState<any>([]);
    const [mainPosts, setMainPosts] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPostsHeader().then((x) => {
            setPostsHeader(x);
        }).finally(() => setLoading(false));
    }, []);

    return (
        <div>
            {loading ? (<Loading></Loading>) 
            : (<><div className="col-sm-12 bg-dark">
                <div className="row p-5 justify-content-center">
                    {postsHeader.map((x:any, index:number)=>{
                        console.log(x);
                        return (<div className="col-sm-3 d-flex align-items-stretch">
                            <PostCard idPost={x.id_post}></PostCard>
                        </div>)
                    })}
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Main</h1>
                    </div>
                </div>
            </div></>
            )}
            
        </div>
    )
}

export default Main
