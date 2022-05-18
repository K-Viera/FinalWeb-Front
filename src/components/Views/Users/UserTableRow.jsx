import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap'
import {BsBootstrapReboot, BsTrashFill, BsPenFill} from "react-icons/bs";

export default function UsersTableRow ({el, removeUser, editUser, resetPassword}) {
    return(
        <tr>
            <td>{el.User}</td>
            <td>{el.Names + " " + el.LastNames}</td>
            <td>{el._idSede[0].Name}</td>
            <td>{el.Rol ? 'Administrador' : 'Analista'}</td>
            <td>{el.Status ? 'Activo' : 'Inactivo'}</td>
            <td>
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button variant="warning" onClick={() => editUser(el)}>
                        <BsPenFill />
                    </Button>
                    <Button variant="danger" onClick={() => removeUser(el)}>
                        <BsTrashFill />
                    </Button>
                    <Button variant="info" onClick={() => resetPassword(el)}>
                        <BsBootstrapReboot />
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}