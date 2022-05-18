import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "../../Layouts/Loader/Loader";
import Axios from "axios";
import Swal from "sweetalert2";
import Request from "../Request/Request";
import { Button, Card, Container } from "react-bootstrap";
import { url } from "../../../global";
import InicioTable from "./InicioTable";
import ContratadosModal from "../Request/ContratadosModal";

export default function Inicio() {
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowContratados, setModalShowContratados] = useState(false);
  const [contratadosList, setContratadosList] = useState([]);
  const [reloadInicio, setReloadInicio] = useState(false);
  const [data, setData] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const tokenRol = localStorage.getItem("rol") !== null || undefined;

  useEffect(() => {
    setLoading(true);
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      window.location.href = "/";
    }

    getRequest();
    getDepartamentos();
    getClientes();

    if (modalShow) {
      setModalShow(false);
    }

    setModalShow(false);

    if (reloadInicio) {
      setReloadInicio(false);
      getRequest();
    }

    setReloadInicio(false);

    setLoading(false);
  }, [url]);

  const changeModalShow = () => {
    if (modalShow) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  };

  const changeReloadInicio = () => {
    setModalShow(false);
    getRequest();
  };

  const getRequest = async () => {
    try {
      await Axios.get(url + "/inicio/getRequest", {
        headers: { "access-token": localStorage.getItem("token") },
      })
        .then((res) => {
          if (res.status === 403) {
            Swal.fire({
              title: "Ocurrió un error",
              text: "No tienes permisos para acceder a esta página",
              icon: "error",
              showConfirmButton: false,
              timer: 2500,
            }).finally(() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            });
          } else {
            setData(res.data);
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Ocurrió un error",
            text: error,
            icon: "error",
            showConfirmButton: false,
            timer: 2500,
          }).finally(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
          });
        });
    } catch (err) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: err,
      }).finally(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
      });
    }
  };

  const getDepartamentos = async () => {
    try {
      await Axios.get(url + "/departamentos/getDepartamentos", {
        headers: { "access-token": localStorage.getItem("token") },
      })
        .then((res) => {
          setDepartamentos(res.data);
        })
        .catch((err) => {
          console.log("sin departamentos: ", err);
        });
    } catch (err) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: err,
      });
    }
  };

  const getClientes = async () => {
    try {
      await Axios.get(url + "/clientes", {
        headers: { "access-token": localStorage.getItem("token") },
      })
        .then((res) => {
          setClientes(res.data);
        })
        .catch((err) => {
          console.log("sin clientes: ", err);
        });
    } catch (err) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: err,
      });
    }
  };

  const handleShowContratados = async (el) => {
    await Axios.get(url + "/request/contratados", {
      headers: { "access-token": localStorage.getItem("token") },
      params: {
        id: el._id,
      },
    })
      .then((res) => {
        setContratadosList([...res.data]);
      })
      .catch((err) => {
        Swal.fire({
          title: "Ocurrió un error",
          text: "Error",
          icon: "error",
          showConfirmButton: false,
          timer: 2500,
        });
      });
    setModalShowContratados(true);
  };

  const handleCloseContratados = () => {
    setModalShowContratados(false);
  };

  const viewRequest = (request) => {
    window.location.href = "/request/details/" + request._id;
  };

  const editRequest = (request) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro de editar la solicitud?",
      text: `${request.Cargo}`,
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          let id = request._id;

          Axios.put(url + "/request/", {
            id: { id },
            headers: { "access-token": localStorage.getItem("token") },
          })
            .then((res) => {
              let { title, icon, text } = res.data;
              Swal.fire({
                title,
                icon,
                text,
                showConfirmButton: false,
                timer: 5000,
              });
              getRequest();
            })
            .catch((error) => {
              console.log("error:", error);
            });
        } catch (error) {
          console.log("error:", error);
        }
      } else if (result.isDenied) {
        return;
      }
    });
  };

  const removeRequest = (request) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro de eliminar la solicitud?",
      text: `${request.Cargo}`,
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          let { id } = request._id;
          Axios.delete(url + "/request/", {
            request: { id },
            headers: { "access-token": localStorage.getItem("token") },
          })
            .then((res) => {
              let { title, icon, text } = res.data;
              Swal.fire({
                title,
                icon,
                text,
                showConfirmButton: false,
                timer: 5000,
              });
              getRequest();
            })
            .catch((error) => {
              console.log("error:", error);
            });
        } catch (error) {
          console.log("error:", error);
        }
      } else if (result.isDenied) {
        return;
      }
    });
  };

  return (
    <Container fluid>
      <Card>
        <Button onClick={changeModalShow}>Agregar Solicitud</Button>
        <Card.Header>
          <h1 className="text-center">Lista de Solicitudes</h1>
        </Card.Header>
        <Card.Body>
          {data && (
            <InicioTable
              data={data}
              handleShow={handleShowContratados}
              viewRequest={viewRequest}
              editRequest={editRequest}
              removeRequest={removeRequest}
              tokenRol={tokenRol}
              close={false}
            />
          )}
        </Card.Body>
      </Card>
      {modalShow && (
        <Request
          departamentos={departamentos}
          clientes={clientes}
          modalShow={modalShow}
          changeReloadInicio={changeReloadInicio}
        />
      )}
      <ContratadosModal
        inputList={contratadosList}
        showContratado={modalShowContratados}
        handleClose={handleCloseContratados}
      />
      {loading && <Loader />}
    </Container>
  );
}
