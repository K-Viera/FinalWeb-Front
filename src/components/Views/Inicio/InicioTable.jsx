import React from "react";
import InicioTableRow from "./InicioTableRow";
import {Container, Table} from 'react-bootstrap'

export default function InicioTable({data,handleShow, viewRequest, editRequest, removeRequest, tokenRol, close}) {
    return (
        <div>
            <Container fluid>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Tipo Cargo</th>
                            <th>Cargo</th>
                            <th>Fecha</th>
                            <th>Linea</th>
                            <th>Cantidad</th>
                            <th>ANS</th>
                            <th>Fecha Limite</th>
                            <th>Municipio</th>
                            <th>Departamento</th>
                            {tokenRol && (
                                <>
                                    <th>Estado</th>
                                    <th>Responsable</th>
                                </>
                            )}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody striped>
                        {data.length === 0 ? (
                            <tr><td colSpan="10">Sin Datos para mostrar</td></tr>
                        ):(
                            data.map(el => 
                                <InicioTableRow 
                                    key={el._id} el={el} 
                                    handleShow={handleShow}
                                    viewRequest = {viewRequest}
                                    editRequest = {editRequest}
                                    removeRequest = {removeRequest}
                                    tokenRol = {tokenRol}
                                    close={close}
                                />
                            )
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}