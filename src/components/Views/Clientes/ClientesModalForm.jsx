import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

export default function ClienteModalForm({
  handleChange,
  handleSubmit,
  form,
  modalShow,
}) {
  const [show, setShow] = useState(modalShow);
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Crear Nuevo Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Nombre Cliente</Form.Label>
                <Form.Control
                  className="mb-3 "
                  name="Nombre"
                  type="text"
                  onChange={handleChange}
                  value={form.Nombre}
                  required
                  autoFocus
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                size="lg"
                variant="outline-primary btn-block"
                type="submit"
                block
              >
                Crear Cliente
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
