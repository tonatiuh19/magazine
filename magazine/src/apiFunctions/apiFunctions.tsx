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

export const getUserInfo = async (idUser:Number) =>{
    try {
        const response = await axios.post('http://localhost:8015/getUserInfoByUser.php', 
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

export const getSocialNetworks = async () =>{
    try {
        const response = await axios.post('http://localhost:8015/getSocialNetworks.php',{}
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

export const insertPost = async (idUser:number, title:string, category:number, short:string) =>{
    try {
        const response = await axios.post('http://localhost:8015/insertPost.php',
            { 
                id_user: idUser,
                title: title,
                category: category,
                short: short,
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

export const getPostAttachmentsByPost = async (idPost:number) =>{
    try {
        const response = await axios.post('http://localhost:8015/getPostAttachmentsByPost.php', 
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

export const getImageAttachment = async (idPostAttachment:number) =>{
    try {
        const response = await axios.post('http://localhost:8015/http://localhost:8015/getImage.php', 
            { 
                id_post_attachment_type: idPostAttachment,
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

export const updatePost = async (idUser:number, title:string, category:number, idPost:number, short:string) =>{
    try {
        const response = await axios.post('http://localhost:8015/updatePost.php',
            { 
                id_user: idUser,
                id_post: idPost,
                title: title,
                category: category,
                short: short
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

export const updatePostTypes = async (idPost:number, type:number, content:string, order:number, idPostAttach:number) =>{
    try {
        const response = await axios.post('http://localhost:8015/updatePostTypes.php',
            {
                id_post: idPost,
                id_post_attachment_type: type,
                content: content,
                order_post: order,
                id_post_attachment: idPostAttach,
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

export const updatePostTypesWithImage = async (imageRaw:any, idPost:number, type:number, content:string, order:number, editing:number, oldIdPost:number) =>{
    //console.log("Img", imageRaw, "Id_post", String(idPost), "id_post_attachment_type", String(type), "content", content, "order_post", String(order));

    const formData = new FormData();
    formData.append("avatar", imageRaw);
    formData.append("id_post", String(idPost));
    formData.append("id_post_attachment_type", String(type));
    formData.append("content", content);
    formData.append("order_post", String(order));
    formData.append("editing", String(editing));
    formData.append("old_id_post", String(oldIdPost));
    axios.post( 'http://localhost:8015/updatePostTypesWithimage.php',
    formData,
    {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    }
    ).then(function(res){
        console.log('SUCCESS!!', res);
        return 1;
    })
    .catch(function(){
        console.log('FAILURE!!');
    });
};

export const updatePostImage = async (imageRaw:any, idPost:number, oldIdPost:number, isEditing:number) =>{
    //console.log("Img", imageRaw, "Id_post", String(idPost), "id_post_attachment_type", String(type), "content", content, "order_post", String(order));

    const formData = new FormData();
    formData.append("avatar", imageRaw);
    formData.append("id_post", String(idPost));
    formData.append("old_id_post", String(oldIdPost));
    formData.append("editing", String(isEditing));
    axios.post( 'http://localhost:8015/updatePostImage.php',
    formData,
    {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    }
    ).then(function(res){
        console.log('SUCCESS!!', res);
        return 1;
    })
    .catch(function(){
        console.log('FAILURE!!');
    });
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
        console.log('SUCCESS!!', res);
        return 1;
    })
    .catch(function(){
        console.log('FAILURE!!');
    });
};

export const insertPostImage = async (imageRaw:any, idPost:number) =>{
    //console.log("Img", imageRaw, "Id_post", String(idPost), "id_post_attachment_type", String(type), "content", content, "order_post", String(order));

    const formData = new FormData();
    formData.append("avatar", imageRaw);
    formData.append("id_post", String(idPost));
    axios.post( 'http://localhost:8015/insertPostImage.php',
    formData,
    {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    }
    ).then(function(res){
        console.log('SUCCESS!!', res);
        return 1;
    })
    .catch(function(){
        console.log('FAILURE!!');
    });
};

export const insertCreactive = async (email:string, pwd:string, name:string, lastName:string, justification:string) =>{
    try {
        const response = await axios.post('http://localhost:8015/insertCreative.php',
            { 
                email: email,
                pwd: pwd,
                name: name,
                lastName: lastName,
                justification: justification,
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

export const insertCreactiveSocials = async (idUser:number, type:number, value:string) =>{
    try {
        const response = await axios.post('http://localhost:8015/insertCreativeSocials.php',
            { 
                id_user: idUser,
                type: type,
                value: value,
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

export const getFullUserInfo = async (idUser:Number) =>{
    try {
        const response = await axios.post('http://localhost:8015/getFullUserInfoByUser.php', 
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

export const updateCreative = async (email:string, pwd:string, name:string, lastName:string, idUser:number) =>{
    try {
        const response = await axios.post('http://localhost:8015/updateCreative.php',
            { 
                email: email,
                pwd: pwd,
                name: name,
                lastName: lastName,
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

//DRAW

export const getPostsTypesNavBar = async () =>{
    try {
        const response = await axios.post('http://localhost:8015/getPostTypesNavBar.php',{}
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

export const getPostsHeader = async () =>{
    try {
        const response = await axios.post('http://localhost:8015/getPostHeader.php',{}
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

export const getMainPostsbyType = async (type:number) =>{
    try {
        const response = await axios.post('http://localhost:8015/getMainPostsbyType.php',
            { 
                id_post_type: type,
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

export const getPostInfo = async (idPost:number) =>{
    try {
        const response = await axios.post('http://localhost:8015/getPostInfo.php',
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

export const getMinImage = async (idPost:number) =>{
    try {
        const response = await axios.post('http://localhost:8015/getMinImage.php',
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

export const getPostContent = async (idPost:number) =>{
    try {
        const response = await axios.post('http://localhost:8015/getPostContent.php',
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