import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "../../Layouts/Loader/Loader";
import Axios from "axios";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { url } from "../../../global";
import AnsTable from "./AnsTable";
import AnsModalForm from "./AnsModalForm";

const initialForm = {
  id:"",
  TipoCargo: "",
  Dias: 0,
  _idCliente: "",
  Estado: true
};

export default function Ans() {
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [reloadInicio, setReloadInicio] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [data, setData] = useState([]);
  const [modalType,setModalType]=useState("create")

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

      getAns();

      if (modalShow) {
        setModalShow(false);
      }

      setModalShow(false);

      if (reloadInicio) {
        setReloadInicio(false);
        getAns();
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if(modalType=="edit"){
        putForm();
      }else{
        postForm();
      }
      
    }
  };

  const validateForm = () => {
    if (form.TipoCargo === "" &&
        form.Dias === 0 || form.Dias === "" &&
        form._idCliente === "") {
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
    await Axios.put(url + `/ans`, form, {
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
      await Axios.post(url + `/ans`, form, {
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

  const getAns = async () => {
    try {
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
    setForm({...form,id:""});
    if (modalShow) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  }

  async function editAns(el) {
    setModalType("edit");
    setForm({...form,id:el._id,Dias:el.Dias,TipoCargo:el.TipoCargo});
    if (modalShow) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  }

  async function removeAns(data) {
    Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro de eliminar el ans?',
        text: `${data.TipoCargo} del cliente ${data._idCliente[0].Nombre}`,
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: 'No'
      })
      .then((result) => {
        if (result.isConfirmed) {
          setLoading(true);
          try {
            Axios.delete(url + "/ans",{data: { id:data._id }, 
              headers: { "access-token": localStorage.getItem("token") 
            }})
            .then((res) => {
              let { title, icon, text } = res.data;
              console.log("respuesta",res.data)
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
      })
  }

  return (
    <div>
      <h1>Zona ans</h1>
      <Button onClick={changeModalShow}>Agregar Ans</Button>
      {data && (
        <AnsTable
          data={data}
          editAns={editAns}
          removeAns={removeAns}
        />
      )}
      {modalShow && (
        <AnsModalForm
          form={form}
          modalShow={modalShow}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      {loading && <Loader />}
    </div>
  );
}
