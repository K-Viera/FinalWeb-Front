import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

export default function AnsModalForm({
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
        <Modal.Title>Crear Nuevo Ans</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Nombre Cargo</Form.Label>
                <Form.Control
                  className="mb-3 "
                  name="TipoCargo"
                  type="text"
                  onChange={handleChange}
                  value={form.TipoCargo}
                  required
                  autoFocus
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Días</Form.Label>
                <Form.Control
                  className="mb-3 "
                  name="Dias"
                  type="text"
                  onChange={handleChange}
                  value={form.Dias}
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
                Crear Ans
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
