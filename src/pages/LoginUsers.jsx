import React from "react";

class LoginUsers extends React.Component{

    state = {
        
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
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Login de usuarios</h3></div>
                                        <div className="card-body">
                                            <form >
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    id="inputText"
                                                    type="text"
                                                    placeholder="usuario"
                                                   //value = {this.state.usuario} onChange={(e)=>this.setState({usuario: e.target.value})}
                                                    />
                                                    <label >Usuario</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    id="inputPassword"
                                                    type="password"
                                                    placeholder="Password"
                                                    //value = {this.state.password} onChange={(e)=>this.setState({password: e.target.value})}
                                                    />
                                                    <label >Password</label>
                                                   
                                                    {/*
                                                        this.state.message && (
                                                            <div className="form-group" >
                                                                <div className="alert alert-danger" >
                                                                    {this.state.message}
                                                                </div>
                                                            </div>
                                                        )
                                                    */}
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <p> Olvidaste tu contraseña?</p>
                                                    <input type="submit" className="btn btn-primary" value="Login"/>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center py-3">
                                            <div className="small">
                                                <a href="/login">Regresar</a>
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

export default LoginUsers;