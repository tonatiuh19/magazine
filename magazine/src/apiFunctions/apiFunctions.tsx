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