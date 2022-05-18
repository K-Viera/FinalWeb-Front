import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layouts/Layout";
import Login from "./components/Views/Login/Login";
import Inicio from "./components/Views/Inicio/Inicio";
import InicioClose from "./components/Views/Inicio/InicioClose";
import Admin from "./components/Views/Admin/Admin";
import Clientes from "./components/Views/Clientes/Clients";
import Users from "./components/Views/Users/Users";
import Ans from "./components/Views/Ans/Ans";
import Campus from "./components/Views/Campus/Campus";
import RequestDetails from "./components/Views/Request/RequestDetails";
import Date from "./components/Views/Dates/DateView";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Inicio" element={<Inicio />} />
          <Route exact path="/InicioClose" element={<InicioClose />} />
          <Route exact path="/Admin" element={<Admin />} />
          <Route exact path="/Clientes" element={<Clientes />} />
          <Route exact path="/Users" element={<Users />} />
          <Route exact path="/Ans" element={<Ans />} />
          <Route exact path="/Campus" element={<Campus />} />
          <Route exact path="/Fecha" element={<Date/>}/>
          <Route path="request/details/:slug" element={<RequestDetails/>}>
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
