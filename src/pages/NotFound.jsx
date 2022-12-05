import React from "react";

class NotFound extends React.Component {
  render() {
    return (
        <>
            <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <div class="text-center mt-4">
                                <img class="mb-4 img-error" alt="Imagen" src="https://cdn-icons-png.flaticon.com/512/1548/1548682.png" />
                                <p class="lead">Lo siento no se encontro la pagina </p>
                                <a href="/login">
                                    <p>Regresar al Inicio</p>
                                </a>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
  }
}
export default NotFound;