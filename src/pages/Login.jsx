import Verificacion from "../jwt/Verificacion";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

class Login extends React.Component{

    state = {
        discoteca: '',
        password: '',
        message: '',
        userMessage: '',
        passwordMessage: '',
    }
    login = (e) => {
        e.preventDefault();
        Verificacion.login(this.state.discoteca,this.state.password)
        .then(()=>{
            localStorage.setItem('discoteca',this.state.discoteca);
            window.location.href = '/';
        },
        error =>{
            this.setState({message:"Te equivocaste en algo"})
        })
    }
    render(){

        return(
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={this.login}>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    value = {this.state.discoteca} onChange={(e)=>this.setState({discoteca: e.target.value})}
                                                    />
                                                    <label >Discoteca</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="password"
                                                    value = {this.state.password} onChange={(e)=>this.setState({password: e.target.value})}
                                                    />
                                                    <label >Password</label>
                                                   
                                                    {
                                                        this.state.message && (
                                                            <div className="form-group" >
                                                                <div className="alert alert-danger" >
                                                                    {this.state.message}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <div style={{ justifyContent:'center',textAlign:'center', alignItems:'center', display:'flex'}}>
                                                    <input type="submit" className="btn btn-primary" value="Ingresar"/>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center py-3">
                                            <div className="small">
                                                <a href="/agregarDisco">Registra tu discoteca!!</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div id="layoutAuthentication_footer" style={{ display:'flex', justifyContent:'center', paddingTop: '2vh', width:'100%'}}>
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Security 0.0</div>
                                <div>
    
                                    &middot;
    
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
    )
    }
}
export default Login;