import React from "react";
import moment from "moment";
import { Button, ButtonGroup } from "react-bootstrap";
import { BsInboxesFill, BsTrashFill, BsPenFill } from "react-icons/bs";

export default function RequestsTableRow({
  el,
  removeRequest,
  handleShow,
  editRequest,
  viewRequest,
  tokenRol,
  close,
}) {
  return (
    <tr>
      <td>{el._idCliente.Nombre}</td>
      <td>{el._idAns.TipoCargo}</td>
      <td>{el.Cargo}</td>
      <td>{moment(el.Fecha).format("DD/MM/YYYY")}</td>
      <td>{el.Linea}</td>
      <td>{el.Cantidad}</td>
      <td>{el._idAns.Dias}</td>
      <td>
        {moment(el.Fecha)
          .add(el._idAns != null ? el._idAns.Dias : 0, "d")
          .format("DD/MM/YYYY")}
      </td>
      <td>{el._idMunicipio[0].Nombre}</td>
      <td>{el._idMunicipio[0]._idDepartamento[0].Nombre}</td>
      {tokenRol && (
        <>
          <td>{el.Estado}</td>
          <td>
            {el._idUsuario[0].Names} {el._idUsuario[0].LastNames}
          </td>
        </>
      )}
      <td>
        <ButtonGroup className="me-2" aria-label="First group">
          <Button variant="success" onClick={() => viewRequest(el)}>
            <BsInboxesFill />
          </Button>
          <Button variant="success" onClick={() => handleShow(el)}>
            <BsPenFill />
          </Button>
          {!close && (
            <>
              <Button variant="warning" onClick={() => editRequest(el)}>
                <BsPenFill />
              </Button>
              <Button variant="danger" onClick={() => removeRequest(el)}>
                <BsTrashFill />
              </Button>
            </>
          )}
        </ButtonGroup>
      </td>
    </tr>
  );
}
