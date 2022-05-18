import React, { useState } from 'react';
import Axios from 'axios'
import Swal from 'sweetalert2'
import { useEffect } from 'react';
import RequestModal from './RequestModal';
import Loader from '../../Layouts/Loader/Loader';
import { url } from '../../../global';

const initialFrom = {
    cliente: {},
    tipoCargo: {},
    cargo: "",
    linea: {},
    cantidad: 1,
    departamento: {},
    municipio: {},
    ans: 0,
    ansId: "",
    estado: "",
  };
  
export default function Request({departamentos, clientes, modalShow, changeReloadInicio}){
    const [requestToEdit, setRequestToEdit] = useState(null)
    const [loading, setLoading] = useState(false)
    const [municipios, setMunicipios] = useState([]);
    const [tiposCargos, setTiposCargos] = useState([]);
    const [form, setForm] = useState(initialFrom);
    const [show, setShow] = useState(modalShow);

    useEffect((form) => {
        setLoading(true);
        
            if(form){
                setForm(form);
            }

    },[setShow])

    const handleChange = (e) => {
        if (e.target.name === "departamento" && e.target.value !== "0") {
          getMunicipios(e.target.value);
        } else if (e.target.name === "departamento" && e.target.value === "0") {
          setMunicipios([]);
        }
        if (e.target.name === "cliente" && e.target.value !== "0") {
          getTiposCargos(e.target.value);
        } else if (e.target.name === "cliente" && e.target.value === "0") {
          setTiposCargos([]);
          form.ansId = "";
          form.ans = 0;
        }
        if (e.target.name === "tipoCargo" && e.target.value !== "0") {
          form.ansId = getDias(e.target.value)._id;
          form.ans = getDias(e.target.value).Dias;
        } else if (e.target.name === "tipoCargo" && e.target.value === "0") {
          form.ansId = "";
          form.ans = 0;
        }
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
      };
    
      function getDias(id) {
        return tiposCargos.find((tCargo) => tCargo._id === id);
      }
    
      async function getTiposCargos(id) {
        try {
          await Axios.get(url + `/clientes/getTiposCargos/${id}`, {
            headers: { "access-token": localStorage.getItem("token") },
          })
            .then((res) => {
              setTiposCargos(res.data);
            })
            .catch((err) => {
              console.log("sin tipo cargo:", err);
            });
        } catch (err) {
          console.log("error tipo cargo:", err);
        }
      }
    
      async function getMunicipios(id) {
        try {
          await Axios.get(url + `/municipios/getMunicipios/${id}`, {
            headers: { "access-token": localStorage.getItem("token") },
          })
            .then((res) => {
              setMunicipios(res.data);
            })
            .catch((err) => {
              console.log("sin municipios:", err);
            });
        } catch (err) {
          console.log("error municipios:", err);
        }
      }
    
      async function postForm() {
        try {
          await Axios.post(url + `/request/postNewRequest`, form, {
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
              })
              .finally(() => {
                changeReloadInicio(true);
              });
            })
            .catch((err) => {
              console.log("error:", err);
            });
        } catch (err) {
          console.log("error:", err);
        }
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            form.estado = "Abierto";
            postForm();
        } else {
          Swal.fire({
            title: "Datos incompletos",
            icon: "error",
            text: "Debe diligenciar todos los campos.",
            showConfirmButton: false,
            timer: 5000,
          });
        }
      };
    
      const validateForm = () => {
        return (
          form.cliente !== {} &&
          form.tipoCargo !== {} &&
          form.linea !== {} &&
          form.departamento !== {} &&
          form.municipio !== {} &&
          form.ans > 0 &&
          form.cantidad > 0 &&
          form.cargo !== ""
        );
      };

    return (
        <div>
            <RequestModal
                form = {form}
                modalShow = {show}
                departamentos = {departamentos}
                municipios = {municipios}
                clientes = {clientes}
                tiposCargos = {tiposCargos}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            {loading && <Loader />}
        </div>
    )
}
