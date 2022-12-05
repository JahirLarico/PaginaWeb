import React from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
class Historial extends React.Component{

    state = {
        data : '',
        dniBuscado : '',
        nombreDisco : localStorage.getItem('discoteca'),
        errorMessage : ''
    }
    buscar = () => {
        axios.get("http://jahirlarico.enarequipa.org:8000/discoteca/"+this.state.nombreDisco+"/clientes/"+this.state.dniBuscado+"/historial")
        .then(res => {
            this.setState({data:res.data});
            this.setState({ dniBuscado : ''});
        })
        .catch(error => {
            this.setState({ errorMessage : 'No se encontro el DNI ingresado dentro de esta discoteca'});
            this.setState({ data : ''});
        }
        )
    }
    render(){
        return(
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container fluid>
                        <Navbar.Brand href="/">Proyecto Web</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                            >
                        </Nav>
                        <div style={{display:'flex'}}>
                        <Form.Control
                                    placeholder="Ingrese un DNI"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    value={this.state.dniBuscado}
                                    onChange={e => this.setState({dniBuscado : e.target.value})}
                                    />
                            <Button variant="outline-success" onClick={this.buscar}>Buscar!!</Button>
                       
                        </div>
                        
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                { this.state.errorMessage && <p>{this.state.errorMessage}</p>}
                {this.state.data && (<div className="table-responsive">
                
                <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha de entrada</th>
                        <th>Hora de entrad</th>
                        <th>Fecha de salida</th>
                        <th>Hora de salida</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.data.map((cliente)=>(
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.fechaEntrada}</td>
                            <td>{cliente.horaEntrada}</td>
                            <td>{cliente.fechaSalida}</td>
                            <td>{cliente.horaSalida}</td>
                        </tr>
                    ))
                    }
                </tbody>
                </Table>
            </div>)} 
            </div>
                
        )
    }
}

export default Historial;