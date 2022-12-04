import React from "react";
import axios from "axios";
class AgregarDisco extends React.Component{

    state = {
        nombreDisco: '',
        ubicacionDisco: '',
        password: '',
        nombreMessage: '',
        passwordMessage: ''

    }
    validarNombre = (nombre) => {
        if(/^([A-Z]).[\w_]*$/.test(nombre)){
            this.setState({nombreDisco : nombre})
            this.setState({nombreMessage: ''});
        }
        else{
            this.setState({nombreMessage: 'El nombre debe comenzar con una mayuscula'});
        }
    }
    validadContrasena = (contrasena) => {
        if(/(?=[A-Z])(?=.*[0-9].*)[\w_]{8,}/.test(contrasena)){
            this.setState({password : contrasena})
            this.setState({passwordMessage: ''});
        }
        else{
            this.setState({passwordMessage: 'La contraseña debe comenzar con una mayuscula , tener almenos un numero y no tener espacios'});
        }
    }

    agregarDiscoteca = (e) => {
        e.preventDefault();
        const data = {
            username: this.state.nombreDisco,
            UbicacionDiscoteca: this.state.ubicacionDisco,
            password: this.state.password
        }
        axios.post("http://localhost:8000/discoteca", data)
        .then((res) => {
          
            const seguridad = {
                username: res.data.username,
                UbicacionDiscoteca: res.data.UbicacionDiscoteca,
                password: res.data.password,
            }
            axios.put("http://localhost:8000/discoteca/"+ this.state.nombreDisco, seguridad)
            window.location.href = "/login";
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
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Agregando tu discoteca</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={this.agregarDiscoteca}>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    placeholder="usuario"
                                                    onChange={(e)=>this.validarNombre(e.target.value)}
                                                    />
                                                    <label >Nombre de la discoteca</label>
                                                    {this.state.nombreMessage && <p className="text-danger">{this.state.nombreMessage}</p>}
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="password"
                                                    placeholder="Password"
                                                    onChange={(e)=>this.validadContrasena(e.target.value)}
                                                    />
                                                    <label >Password</label>
                                                    {this.state.passwordMessage && <p className="text-danger">{this.state.passwordMessage}</p>}
                                              
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    placeholder="Password"
                                                    value = {this.state.ubicacionDisco} onChange={(e)=>this.setState({ubicacionDisco: e.target.value})}
                                                    />
                                                    <label >Ubicacion de la discoteca</label>
                                                </div>
                                                
                                                <div style={{ justifyContent:'center',textAlign:'center', alignItems:'center', display:'flex'}}>
                                                    { (!this.state.nombreMessage && !this.state.passwordMessage) && (<input type="submit" className="btn btn-primary" value="Agregar Discoteca"/>)}
                                                    { (this.state.nombreMessage||this.state.passwordMessage) && (<input type="submit" disabled={true} className="btn btn-primary" value="Agregar Discoteca"/>)}
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center py-3">
                                            <div className="small">
                                                <a href="/login">Cancelar</a>
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

export default AgregarDisco;