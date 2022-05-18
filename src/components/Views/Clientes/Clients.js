import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "../../Layouts/Loader/Loader";
import Axios from "axios";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { url } from "../../../global";
import ClientesTable from "./ClientesTable";
import ClientesModalForm from "./ClientesModalForm";
import ClientesAnsModal from "./ClientesAnsModal";

const initialForm = {
  id: "",
  Nombre: "",
  Status: true,
};

export default function Clientes() {
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [reloadInicio, setReloadInicio] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [data, setData] = useState([]);
  const [modalType, setModalType] = useState("create");
  const [modalAnsShow, setModalAnsShow] = useState(false);
  const [ansList, setAnsList] = useState([]);
  const [selectAnsList, setSelectAnsList] = useState([]);
  const [selectAnsId,setSelectAnsId]=useState("");

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

      getClientes();

      if (modalShow) {
        setModalShow(false);
      }

      setModalShow(false);

      if (reloadInicio) {
        setReloadInicio(false);
        getClientes();
      }

      setReloadInicio(false);

      setLoading(false);
    },
    [reloadInicio]
  );
  useEffect(async ()=>{
    await Axios.get(url + "/ans", {
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
          let ansList=[];
          
          res.data.forEach((ans)=>{
            ansList.push({
              value: ans._id,
              label: ans.TipoCargo,
            }); 
          })
          setAnsList(ansList);
        }
      })
      .catch((err) => {
        console.log("1",err)
        Swal.fire({
          title: "Ocurrió un error",
          text: "error",
          icon: "error",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  },[])

  const saveAns=async (el)=>{
    console.log("save")
    await Axios.put(url + `/clientes/ans`, {ansList:selectAnsList,id:selectAnsId}, {
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
  }

  const handleSelectAnsChange=(el)=>{
    setSelectAnsList(el)
  }
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (modalType == "edit") {
        putForm();
      } else {
        postForm();
      }
    }
  };

  const validateForm = () => {
    if (form.Nombre === "") {
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
  };

  async function putForm(){
    await Axios.put(url + `/clientes`, form, {
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
  }
  async function postForm() {
    try {
      await Axios.post(url + `/clientes`, form, {
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

  const getClientes = async () => {
    try {
      await Axios.get(url + "/clientes", {
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

  async function changeModalShow() {
    setModalType("create");
    setForm({ ...form, id: "" });
    if (modalShow) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  }

  async function setAns(el) {
    await Axios.get(url + "/clientes/ansOptions", {
      headers: { "access-token": localStorage.getItem("token") },
      params: {
        id: el._id,
      },
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
          setSelectAnsList([...res.data]);
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Ocurrió un error",
          text: "error",
          icon: "error",
          showConfirmButton: false,
          timer: 2500,
        });
      });
      setSelectAnsId(el._id)
    setModalAnsShow(true);
  }

  async function editCliente(id) {
    setModalType("edit");
    setForm({ ...form, id: id._id, Nombre: id.Nombre });
    if (modalShow) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  }
  const handleAnsModalClose = () => {
    setModalAnsShow(false);
  };

  async function removeCliente(data) {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro de eliminar el cliente?",
      text: `${data.Nombre}`,
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          Axios.delete(url + "/clientes", {
            data: { id: data._id },
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
              setReloadInicio(true);
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
  }

  return (
    <div>
      <h1>Zona clientes</h1>
      <Button onClick={changeModalShow}>Agregar Cliente</Button>
      {data && (
        <ClientesTable
          data={data}
          setAns={setAns}
          editCliente={editCliente}
          removeCliente={removeCliente}
        />
      )}
      {modalShow && (
        <ClientesModalForm
          form={form}
          modalShow={modalShow}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      <ClientesAnsModal
        show={modalAnsShow}
        close={handleAnsModalClose}
        ansList={ansList}
        selectAnsList={selectAnsList}
        handleChange={handleSelectAnsChange}
        save={saveAns}
      />
      {loading && <Loader />}
    </div>
  );
}
