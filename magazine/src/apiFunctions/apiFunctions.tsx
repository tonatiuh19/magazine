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

export const deActivatePost = async (idPost:number) =>{
    try {
        const response = await axios.post('http://localhost:8015/deActivatePost.php',
            {
                id_post: idPost,
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

export const insertPostTypesWithImage = async (imageRaw:any, idPost:number, type:number, content:string, order:number) =>{
    //console.log("Img", imageRaw, "Id_post", String(idPost), "id_post_attachment_type", String(type), "content", content, "order_post", String(order));

    const formData = new FormData();
    formData.append("avatar", imageRaw);
    formData.append("id_post", String(idPost));
    formData.append("id_post_attachment_type", String(type));
    formData.append("content", content);
    formData.append("order_post", String(order));
    axios.post( 'http://localhost:8015/insertPostTypesWithimage.php',
    formData,
    {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    }
    ).then(function(res){
        //console.log('SUCCESS!!', res);
        return 1;
    })
    .catch(function(){
        console.log('FAILURE!!');
    });
};