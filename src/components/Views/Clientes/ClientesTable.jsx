import React from "react";
import ClientesTableRow from "./ClientesTableRow";
import { Container, Table } from "react-bootstrap";

export default function ClientesTable({ data, setAns, editCliente, removeCliente }) {
  return (
    <div>
      <Container fluid>
        <h3 className="text-center">Clientes</h3>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody striped>
            {data.length === 0 ? (
              <tr>
                <td colSpan="8">Sin Datos para mostrar</td>
              </tr>
            ) : (
              data.map((el) => (
                <ClientesTableRow
                  key={el._id}
                  el={el}
                  setAns={setAns}
                  editCliente={editCliente}
                  removeCliente={removeCliente}
                />
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
