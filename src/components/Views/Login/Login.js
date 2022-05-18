import React, { useState } from "react";
import { useEffect } from "react";
import LoginForm from "./LoginForm";
import Loader from "../../Layouts/Loader/Loader";
import Axios from "axios";
import Swal from "sweetalert2";
import md5 from "md5";
import { url } from "../../../global";

export default function Logins() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("token") !== null ||  undefined) {
      window.location.href = "/Inicio";
    }
    setLoading(false);
  }, [url]);

  const getValidationUser = async (data) => {
    data.password = md5(data.password);

    await Axios.post(url+"/login", data)
    .then(res => {
      if(res.data.response === 200){
        Swal.fire({
            title: 'Ingreso Exitoso',
            icon: 'success',
            text:'Bienvenid@ ' +
              res.data.names + ' ' + res.data.lastNames,
              showConfirmButton: false,
              timer: 2500
        }).finally(() => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", res.data.user);
          localStorage.setItem("rol", res.data.rol);
          window.location.href = "/inicio";
        });
      }else{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("rol");
        Swal.fire(res.data.message);
      }
    })
    .catch(err => {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: err
      });
    });
  };

  return (
    <div>
      <h1 className="text-center">CONTROL DE SOLICITUDES</h1>
      
      <LoginForm
        getValidationUser={getValidationUser}
      />
      {loading && <Loader />}
    </div>
  );
}
