import { Modal } from "react-bootstrap";
import React from "react";
export default function ContratadosModal({
  showContratado,
  handleClose,
  inputList,
}) {
  return (
    <Modal show={showContratado} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Contratados</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {inputList.map((input) => (
          <div>nombre:{input.nombre} cedula:{input.cedula}</div>
        ))}
      </Modal.Body>
    </Modal>
  );
}
