import axios from "axios";

export const signIn = async (email: String, password: String) =>{
    try {
        const response = await axios.post('http://localhost:8015/login.php', 
            { 
                email: email,
                pwd: password 
            }
        );
        if(response.data === 0){
            return 0;
        }else{
            return response.data;
        }
    } catch (e) {
        return `😱 Request failed: ${e}`;
    }
};

export const getPostsbyUser = async (idUser:Number) =>{
    try {
        const response = await axios.post('http://localhost:8015/getPostsbyUser.php', 
            { 
                id_user: idUser,
            }
        );
        if(response.data === 0){
            return 0;
        }else{
            return response.data;
        }
    } catch (e) {
        return `😱 Request failed: ${e}`;
    }
};

export const getPostsTypes = async () =>{
    try {
        const response = await axios.post('http://localhost:8015/getPostsTypes.php',{}
        );
        if(response.data === 0){
            return 0;
        }else{
            return response.data;
        }
    } catch (e) {
        return `😱 Request failed: ${e}`;
    }
};

export const insertPost = async (idUser:number, title:string, category:number) =>{
    try {
        const response = await axios.post('http://localhost:8015/insertPost.php',
            { 
                id_user: idUser,
                title: title,
                category: category,
            }
        );
        if(response.data === 0){
            return 0;
        }else{
            return response.data;
        }
    } catch (e) {
        return `😱 Request failed: ${e}`;
    }
};

export const insertPostTypes = async (idPost:number, type:number, content:string, order:number) =>{
    try {
        const response = await axios.post('http://localhost:8015/insertPostTypes.php',
            {
                id_post: idPost,
                id_post_attachment_type: type,
                content: content,
                order_post: order
            }
        );
        if(response.data === 0){
            return 0;
        }else{
            return response.data;
        }
    } catch (e) {
        return `😱 Request failed: ${e}`;
    }
};