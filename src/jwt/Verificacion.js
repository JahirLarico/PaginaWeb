import axios from 'axios';
import urls from '../urls/urls';

const api_url = urls.getApiUrl();
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