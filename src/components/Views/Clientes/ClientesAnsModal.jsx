import { Modal, Button } from "react-bootstrap";
import React, { useEffect } from "react";
import Select from "react-select";
export default function ClientesAnsModal({
  show,
  close,
  ansList,
  selectAnsList,
  handleChange,
  save,
}) {
  useEffect(async () => {
    console.log("todas", ansList);
    console.log("seleccionado", selectAnsList);
  }, []);
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header>
        <Modal.Title>Seleccione ANS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select
          isMulti
          options={ansList}
          onChange={handleChange}
          value={selectAnsList}
        />
        <br />
        <br />
        <Button
          size="lg"
          variant="outline-primary btn-block"
          type="submit"
          block
          onClick={save}
        >
          Guardar Ans
        </Button>
      </Modal.Body>
    </Modal>
  );
}
