import React from "react";
import { Container, Table } from "react-bootstrap";
import SeguimientosTableRow from "./SeguimientosTableRow";
export default function SeguimientosTable({ seguimientos ,handleShow}) {
  return (
    <div>
      <Container fluid>
        <h3 className="text-center">Detalle del seguimiento</h3>
        <Table responsive size="sm">
          <tbody striped>
            {seguimientos.length === 0 ? (
              <tr>
                <td colSpan="8">Sin Datos para mostrar</td>
              </tr>
            ) : (
              seguimientos.map(seguimiento => 
                  <SeguimientosTableRow 
                  handleShow={handleShow} 
                  seguimiento={seguimiento}/>
              )
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
