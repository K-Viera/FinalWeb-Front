import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../img/Logo.png";
import "./Menu.css";
import Loader from "../Layouts/Loader/Loader";
// import Swal from "sweetalert2";

export default function Menu() {

  //validate jwt token
  const token = localStorage.getItem("token") !== null || undefined; 
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
      // try {
      //   Swal.fire({
      //     title: "¿Estás seguro?",
      //     text: "¡Se cerrará la sesión!",
      //     icon: "warning",
      //     showCancelButton: true,
      //     confirmButtonColor: "#3085d6",
      //     cancelButtonColor: "#d33",
      //     confirmButtonText: "¡Sí, cerrar sesión!",
      //   }).then((result) => {
      //     if (result.value) {
      //       localStorage.removeItem("token");
      //       window.location.reload();
      //     }
      //   });
      // } catch (error) {
      //   Swal.fire({
      //     title: "Ocurrió un error",
      //     text: error,
      //     icon: "error",
      //     showConfirmButton: false,
      //     timer: 2500,
      //   }).finally(() => {
      //     localStorage.removeItem("token");
      //     localStorage.removeItem("user");
      //     window.location.href = "/";
      //   });
      // };
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    setLoading(false);
  }

  return (
    <>
    <Navbar>
      <Container>
        {loading && <Loader />}
        <Navbar.Brand>
          <NavLink to={token ? "/Inicio" : "/"}>
            <img
              src={logo}
              width="auto"
              height="60"
              className="d-inline-block align-top"
              alt="Mision"
            />
          </NavLink>
        </Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link>
                <NavLink to="/Admin" className="link">
                  Administrar
                </NavLink>
              </Nav.Link>
            </Nav.Item>
            <NavDropdown title="Solicitudes" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Nav.Link>
                  <NavLink to="/Inicio" className="link">
                    Abiertas
                  </NavLink>
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link>
                  <NavLink to="/InicioClose" className="link">
                    Cerradas
                  </NavLink>
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Item>
            <Nav.Link>
              <NavLink to="/" onClick={logout} className="link">
                Cerrar Sesión
              </NavLink>
            </Nav.Link>
          </Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}
