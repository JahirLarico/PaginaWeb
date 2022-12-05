import axios from 'axios';

//const api_url = "http://jahirlarico.enarequipa.org:8000/";

//Declarando la url base 
const api_url = "http://jahirlarico.enarequipa.org:8000/";
class Verificacion{
    login (usuario, password){
        return axios.post(api_url+ "login",{
            username : usuario,
            password : password
        }).then(res=>{
            if(res.data.access){
                localStorage.setItem('token',JSON.stringify(res.data.access));
            }
            return res.data
        })
    }
    getToken(){
        return JSON.parse(localStorage.getItem('token'))
    }
    destroyToken(){
        localStorage.removeItem('token')
    }
}
export default new Verificacion();