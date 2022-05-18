import React, {useState} from "react";
import Swal from "sweetalert2";
import InicioTable from "./InicioTable";

export default function LoginsForm({
  data, 
  viewRequest, 
  editRequest, 
  removeRequest
}) {

  return (
    <div>
        <InicioTable 
          data={data}
          viewRequest = {viewRequest}
          editRequest = {editRequest}
          removeRequest = {removeRequest} 
        />
    </div>
  );
}