import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "../../Layouts/Loader/Loader";
import Axios from "axios";
import Swal from "sweetalert2";
import md5 from "md5";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { url } from "../../../global";
import UserTable from "./UserTable";
import UserModalForm from "./UserModalForm";

const initialForm = {
  id: "",
  User: "",
  Names: "",
  LastNames: "",
  Password: "",
  ConfirmPassword: "",
  Campus: "",
  Status: true,
  Role: ""
};

export default function Users() {
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [reloadInicio, setReloadInicio] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [sedes, setSedes] = useState([]);
  const [data, setData] = useState([]);
  const [modalType, setModelType] = useState("create");

  useEffect(
    (reloadInicio) => {
      setLoading(true);
      if (
        localStorage.getItem("token") === null ||
        localStorage.getItem("token") === undefined
      ) {
        window.location.href = "/";
        return;
      }

      getUsers();
      getSedes();

      if (modalShow) {
        setModalShow(false);
      }

      setModalShow(false);

      if (reloadInicio) {
        setReloadInicio(false);
        getUsers();
      }

      setReloadInicio(false);

      setLoading(false);
    },
    [reloadInicio]
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      let data = { ...form };
      data.Role = data.Role === '0' ? false : true;
      data.Password = md5(form.Password);
      if (modalType === "edit") {
        await editFrom(data);
      } else if (modalType === "create") {
        setForm({ ...form, id: "" });
        await postForm(data);
      } else if (modalType === "reset") {
        await resetPasswordForm(data);
      }
    }
  };

  async function resetPasswordForm(data) {
    await Axios.put(url + "/users/resetPass", data, {
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
        }).finally(() => {
          setForm({...form, initialForm});
          setReloadInicio(true);
        });
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }

  async function editFrom(data) {
    await Axios.put(url + "/users", data, {
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
        }).finally(() => {
          setForm({...form, initialForm});
          setReloadInicio(true);
        });
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }

  async function postForm(data) {
    try {
      await Axios.post(url + "/users", data, {
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
          }).finally(() => {
            setForm(initialForm);

            setReloadInicio(true);
          });
        })
        .catch((err) => {
          console.log("error:", err);
        });
    } catch (err) {
      console.log("error:", err);
    }
  }

  const resetPassword = (id) => {
    setModelType("reset");
    setForm({...form, initialForm});
    setForm({ ...form, 
      Password: "", 
      ConfirmPassword: "",
      id: id._id 
    });
    if (modalShow) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  };

  const validateForm = () => {
    if (form.Password === form.ConfirmPassword) {
      if (modalType === "reset") {
        return true;
      } else {
        if (
          form.Campus === "" &&
          form.User === "" &&
          form.Names === "" &&
          form.LastNames === "" &&
          form.Role === ""
        ) {
          return Swal.fire({
            title: "Datos incompletos",
            icon: "error",
            text: "Debe diligenciar todos los campos.",
            showConfirmButton: false,
            timer: 5000,
          });
        } else {
          return true;
        }
      }
    } else {
      return Swal.fire({
        title: "Error",
        icon: "error",
        text: "Las contraseñas no coinciden",
        showConfirmButton: false,
        timer: 5000,
      });
    }
  };

  const changeModalShow = () => {
    setModelType("create");
    if (modalShow) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  };

  const getSedes = async () => {
    try {
      await Axios.get(url + "/campus", {
        headers: { "access-token": localStorage.getItem("token") },
      })
        .then((res) => {
          if (res.status === 403) {
            Swal.fire(res.data.message, {
              showConfirmButton: false,
              timer: 2500,
            }).finally(() => {
              window.location.href = "/";
            });
          } else {
            setSedes(res.data);
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

  const getUsers = async () => {
    try {
      await Axios.get(url + "/users", {
        headers: { "access-token": localStorage.getItem("token") },
      })
        .then((res) => {
          if (res.status === 403) {
            Swal.fire(res.data.message, {
              showConfirmButton: false,
              timer: 2500,
            }).finally(() => {
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

  const editUser = (id) => {
    setModelType("edit");
    setForm({...form, initialForm});
    setForm({
      ...form,
      User: id.User,
      Names: id.Names,
      LastNames: id.LastNames,
      id: id._id,
      Role: id.Rol === false ? 0 : 1,
      Campus: id._idSede[0]._id,
    });
    if (modalShow) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  };

  const removeUser = async (data) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro de eliminar el usuario?",
      text: `${data.Names} ${data.LastNames}`,
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          let id = data._id;
            await Axios.delete(url + "/users", {
            data: { id },
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
              getUsers();
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
    <>
      <Container fluid>
        <Card>
          <Button onClick={changeModalShow}>Agregar Usuario</Button>
          <Card.Header>
            <h1>Zona ususario</h1>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col sm={12}>
                {data && (
                  <UserTable
                    data={data}
                    editUser={editUser}
                    removeUser={removeUser}
                    resetPassword={resetPassword}
                  />
                )}
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
      </Container>
      {modalShow && (
        <UserModalForm
          form={form}
          sedes={sedes}
          modalShow={modalShow}
          modalType={modalType}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      {loading && <Loader />}
    </>
  );
}
