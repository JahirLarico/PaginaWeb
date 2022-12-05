import axios from "axios";
import React from "react";

class AgregarCliente extends React.Component{
    
    state = {
        tipo : localStorage.getItem('tipo'),
        discoteca : localStorage.getItem('discoteca'),
        dniCliente : localStorage.getItem('dnicliente'),
        nombre: '',
        edad : '',
        dni : '',
        edadMessage: '',
        dniMessage: '',
        horaActual: '',
        fechaActual: '',
    }

    componentDidMount(){
        if (this.state.tipo === 'editar'){
            axios.get("http://jahirlarico.enarequipa.org:8000/discoteca/"+this.state.discoteca+"/clientes/"+this.state.dniCliente)
            .then(data =>{
                this.setState({nombre: data.data.nombre});
                this.setState({edad: data.data.edad});
                this.setState({dni: data.data.dni});
                console.log(data);
            })
            
        }
    
    }

    añadirCliente =(e)=>{
        e.preventDefault();
        const data = {
            nombre: this.state.nombre,
            dni: this.state.dni,
            edad: this.state.edad
            
        }
        axios.post('http://jahirlarico.enarequipa.org:8000/discoteca/'+this.state.discoteca +'/clientes', data)
        .then(res =>{
            console.log(data)
            window.location.href = "/";
        })
        .catch(error => {
            alert('Ese DNI ya se se enceuntra en uso')
        })
        
        

    }

    editarCliente =(e)=>{
        e.preventDefault();
        const data = {
            nombre: this.state.nombre,
            dni: this.state.dni,
            edad: this.state.edad
            
        }
        axios.put("http://jahirlarico.enarequipa.org:8000/discoteca/"+this.state.discoteca+"/clientes/"+this.state.dniCliente, data)
        window.location.href = '/'
        
    }
    
    validarEdad = (edad) =>{
        if(/^([0-9]){0,3}$/.test(edad)){
            this.setState({edad : edad})
            this.setState({edadMessage: ''});
        }
        else {
            this.setState({edadMessage: 'Ingrese una edad valida'});
        }
    }
    validarDNI = (dni) =>{
        if(/^([0-9]){8}$/.test(dni)){
            this.setState({dni : dni})
            this.setState({dniMessage: ''});
        }
        else {
            this.setState({dniMessage: 'Ingrese un DNI valido de 8 digitos'});
        }
    }
    generarHorayFechaActual = (e) =>{
        e.preventDefault();
        let fecha = new Date();
        let hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        let fechaActual = fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate();
        this.setState({horaActual: hora});
        this.setState({fechaActual: fechaActual});
        console.log(this.state.horaActual);
        console.log(this.state.fechaActual);
    }
    render(){
        return(
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    { this.state.tipo === "agregar" && ( <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Agregando clientes</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={this.añadirCliente} >
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    //value = {this.state.nombre} 
                                                    onChange={(e)=>this.setState({nombre: e.target.value})}
                                                    
                                                    />
                                                    <label >Nombre del cliente</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="number"
                                                    //value = {this.state.edad} onChange={(e)=>this.setState({edad: e.target.value})}
                                                    onChange={(e)=>this.validarEdad(e.target.value)}
                                                    />
                                                    <label >Edad del cliente</label>
                                                    {this.state.edadMessage && <p className="text-danger">{this.state.edadMessage}</p>}
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="number"
                                                    //value = {this.state.dni} onChange={(e)=>this.setState({dni: e.target.value})}
                                                    onChange={(e)=>this.validarDNI(e.target.value)}
                                                    />
                                                    <label >DNI del cliente</label>
                                                    {this.state.dniMessage && <p className="text-primary">{this.state.dniMessage}</p>}
                                                </div>
                                                <div style={{ justifyContent:'center',textAlign:'center', alignItems:'center', display:'flex'}}>
                                            
                                                    {(!this.state.dniMessage && !this.state.edadMessage) && (<input type="submit" className="btn btn-primary" value="Agregar Cliente"/>)}
                                                    {(this.state.dniMessage || this.state.edadMessage) && (<input type="submit" disabled={true} className="btn btn-primary" value="Agregar Cliente"/>)}
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center py-3">
                                            <div className="small">
                                                <a href="/">Regresar</a>
                                            </div>
                                        </div>
                                    </div>)}

                                    { this.state.tipo === "editar" && (<div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Editando cliente</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={this.editarCliente} >
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="text"
                                                    value = {this.state.nombre} onChange={(e)=>this.setState({nombre: e.target.value})}
                                                    
                                                    />
                                                    <label >Nombre del cliente</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="number"
                                                    value = {this.state.edad}
                                                    onChange={(e)=>this.validarEdad(e.target.value)}
                                                    />
                                                    <label >Edad del cliente</label>
                                                    {this.state.edadMessage && <p className="text-danger">{this.state.edadMessage}</p>}
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                    type="number"
                                                    value = {this.state.dni} 
                                                    onChange={(e)=>this.validarDNI(e.target.value)}
                                                    readOnly
                                                    />
                                                    <label >DNI del cliente</label>
                                                    {this.state.dniMessage && <p className="text-primary">{this.state.dniMessage}</p>}
                                                </div>
                                                <div style={{ justifyContent:'center',textAlign:'center', alignItems:'center', display:'flex'}}>
                                                    {(this.state.edadMessage || this.state.dniMessage) && (<input type="submit" disabled={true} className="btn btn-primary" value="Editar Cliente"/>)}
                                                    {(!this.state.edadMessage && !this.state.dniMessage) && (<input type="submit" className="btn btn-primary" value="Editar Cliente"/>)}
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center py-3">
                                            <div className="small">
                                                <a href="/">Regresar</a>
                                            </div>
                                        </div>
                                    </div>) }
                                    
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
export default AgregarCliente;