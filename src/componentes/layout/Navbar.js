import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { PropTypes } from "prop-types";

class Navbar extends Component {
  state = {
    usuarioAutenticado: false
  };

  // recibe los props automaticamente
  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { usuarioAutenticado: true };
    } else {
      return { usuarioAutenticado: false };
    }
  }

  // cerrar la sesión
  cerrarSesion = () => {
    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { usuarioAutenticado } = this.state;
    // extraer datos de autenticación
    const { auth } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
        <nav className="navbar navbar-light">
          <span className="navbar-brand mb-0 h1">
            Administrador de Biblioteca
          </span>
        </nav>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          {usuarioAutenticado ? (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/suscriptores"} className="nav-link">
                  Suscriptores
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Libros
                </Link>
              </li>
            </ul>
          ) : null}

          {usuarioAutenticado ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="#!" className="nav-link">
                  {auth.email}
                </a>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.cerrarSesion}
                >
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          ) : null}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar);
