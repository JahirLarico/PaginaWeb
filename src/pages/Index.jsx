import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Verificacion from '../jwt/Verificacion';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';

import urls from '../urls/urls';

class App extends React.Component {

  state = {
    data: [],
    loading: true,
    discoteca: '',
    total : 0,
    url : urls.getApiUrl()
  }

  peticionGet=()=>{
    axios.get(this.state.url+"/discoteca/"+this.state.discoteca+"/clientes")
    .then(res => {
      this.setState({data:res.data});
    })
    console.log("algo")
  }

  eliminarCliente= async(dni)=>{
    alert("Se eliminara el cliente con id: "+dni);
    await axios.delete(this.state.url+"/discoteca/"+this.state.discoteca+"/clientes/"+dni)
    .then(res => {
      this.peticionGet();
    })
  }
  
  agregarCliente=()=>{
    localStorage.setItem('tipo','agregar');
    window.location.href = "/agregarCliente";
  }

  editarCliente=(dni)=>{
    localStorage.setItem('tipo','editar');
    localStorage.setItem('dnicliente',dni);
    window.location.href = "/agregarCliente";
  }

  clientesActivos= async ()=>{
    await axios.get(this.state.url+"/discoteca/"+this.state.discoteca+"/clientesActivos")
    .then(res => {
      if (res.data.length>1){
        alert("Hay "+res.data.length+" clientes activos");
      }
      else if (res.data.length===1){
        alert("Hay 1 cliente activo");
      }
      else{
        alert("No hay clientes activos");
      }
    })
  }

  logout(){
    Verificacion.destroyToken();
    window.location.reload();
  }  

  irHistorial(){
    window.location.href = "/historial";
  }

  activar = async (dni) => {
    await axios.post(this.state.url+"/discoteca/"+this.state.discoteca+"/clientes/"+dni+"/historial")
    await axios.get(this.state.url+"/discoteca/"+this.state.discoteca+"/clientes/"+dni)
    .then(data => {
      const cambio = {
        nombre: data.data.nombre,
        dni: data.data.dni,
        edad : data.data.edad,
        estado : true
      }
      axios.put(this.state.url+"/discoteca/"+this.state.discoteca+"/clientes/"+dni,cambio)
      .then( res=> {
        this.peticionGet();
      })
    })
  }

  desactivar = async(dni) => {
    let fecha = new Date();
    let hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    let fechaActual = fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate();
    const data = {
      fechaSalida : fechaActual,
      horaSalida : hora
    }
    await axios.put(this.state.url+"/discoteca/"+this.state.discoteca +"/clientes/"+dni+"/historial/ultimo",data)
    await axios.get(this.state.url+"/discoteca/"+this.state.discoteca+"/clientes/"+dni)
    .then(data => {
      const desactivar ={
        nombre: data.data.nombre,
        dni: data.data.dni,
        edad : data.data.edad,
        estado : false
      }
      axios.put(this.state.url+"/discoteca/"+this.state.discoteca+"/clientes/"+dni,desactivar)
      .then (res => {
        this.peticionGet();
      })
    })
  }

  componentDidMount(){
    const token = Verificacion.getToken()
    if (!token) {
      window.location.href = "/login"
    }
    this.setState({discoteca: localStorage.getItem('discoteca')})
    setInterval(this.peticionGet, 3000);
  }
  
  render(){
    return (
      <div>
        {!this.state.loading && (<div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignContent:'center', flexDirection: 'column' }}>
          <div style={{textAlign: 'center'}}>
            <img src="/loading.svg" alt='Imagen de carga' style={{margin : "auto"}}></img>
            <h1>Cargando...</h1>
          </div>
        </div>)  }
          {
            this.state.loading && (
            <div className="table-responsive">
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                  <Navbar.Brand href="/">Proyecto web</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                      <Nav.Link onClick={this.agregarCliente}>Agrega Cliente</Nav.Link>
                      <Nav.Link onClick={this.irHistorial}>Ver historiales</Nav.Link>
                      <Nav.Link onClick={this.clientesActivos}>Ver Clientes activos en este momento</Nav.Link>
                    </Nav>
                    <Nav>
                      <Nav.Link onClick={this.logout}>Cerrar Sesion</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            <Table striped>
              <thead>
                <tr>
                  <th>Imagen del cliente</th>
                  <th>Nombre del cliente</th>
                  <th>DNI del cliente</th>
                  <th>Edad del cliente</th>
                  <th>Acciones</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
              {this.state.data.map((cliente)=>(
                    <tr key={cliente.id}>
                        <td style={{display: 'flex', justifyContent: 'center' }}><img src={this.state.url+cliente.userFoto} alt="Imagen del cliente" style={{width: '50px', height: '50px'}}></img></td>
                        <td>{cliente.nombre}</td>
                        <td>{cliente.dni}</td>
                        <td>{cliente.edad}</td>
                        <td>
                          <Button variant="primary"onClick={()=>{this.editarCliente(cliente.dni)}} >Editar</Button>
                          <Button variant="danger"  onClick={()=>{this.eliminarCliente(cliente.dni)}}>Eliminar</Button>
                          { cliente.estado === true && (
                          <Button variant="warning " onClick={()=>{this.desactivar(cliente.dni)}}>Desactivar</Button>)}
                          { cliente.estado === false && (
                          <Button variant="success" onClick={()=>{this.activar(cliente.dni)}}>Activar</Button>) }
                        </td>
                        { cliente.estado === true && (<td>Activo</td>)}
                        { cliente.estado === false && (<td>Inactivo</td>)}
                        
                      </tr>
                  ))}
              </tbody>
            </Table>
          </div>)
          }
          
      </div>
    )
  }
}

export default App;