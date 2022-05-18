import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap'
import {BsInboxesFill, BsTrashFill, BsPenFill} from "react-icons/bs";

export default function ClientesTableRow ({el, removeCliente, editCliente, setAns}) {
    return(
        <tr>
            <td>{el.Nombre}</td>
            <td>{el.Status ? 'Activo' : 'Inactivo'}</td>
            <td>
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button variant="success" onClick={() => setAns(el)}>
                        <BsInboxesFill />
                    </Button>
                    <Button variant="warning" onClick={() => editCliente(el)}>
                        <BsPenFill />
                    </Button>
                    <Button variant="danger" onClick={() => removeCliente(el)}>
                        <BsTrashFill />
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}