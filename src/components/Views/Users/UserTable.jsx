import React from "react";
import UserTableRow from "./UserTableRow";
import { Container, Table } from "react-bootstrap";

export default function UserTable({ data, editUser, removeUser, resetPassword }) {
  return (
    <div>
      <Container fluid>
        <h3 className="text-center">Usuarios</h3>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Sede</th>
              <th>Rol</th>
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
                <UserTableRow
                  key={el._id}
                  el={el}
                  editUser={editUser}
                  removeUser={removeUser}
                  resetPassword={resetPassword}
                />
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
