import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Axios from "axios";

export default function UserModalForm({
  handleChange,
  handleSubmit,
  sedes,
  form,
  modalShow,
  modalType
}) {
  const [show, setShow] = useState(modalShow);
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{modalType === "edit" ? 'Editar Usuario' : modalType === "create" ? 'Crear Nuevo Usuario' : 'Resetear Contraseña'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {modalType === "create" || modalType === "edit" ? (
            <Row>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    className="mb-3 "
                    name="User"
                    type="text"
                    onChange={handleChange}
                    value={form.User}
                    required
                    autoFocus
                  />
                </Form.Group>
              </Col>
            </Row>
          ) : null}
          {modalType === "create" || modalType === "reset" ? (
            <Row>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="mb-3 "
                    name="Password"
                    type="text"
                    minLength="6"
                    onChange={handleChange}
                    value={form.Password}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          ) : null}
          {modalType === "create" || modalType === "reset" ? (
            <Row>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Confirmar Password</Form.Label>
                  <Form.Control
                    className="mb-3 "
                    name="ConfirmPassword"
                    type="text"
                    minLength="6"
                    onChange={handleChange}
                    value={form.ConfirmPassword}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          ) : null}
          {modalType === "create" || modalType === "edit" ? (
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  className="mb-3"
                  name="Names"
                  type="text"
                  onChange={handleChange}
                  value={form.Names}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          ) : null}
          {modalType === "create" || modalType === "edit" ? (
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  name="LastNames"
                  onChange={handleChange}
                  value={form.LastNames}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          ) : null}
          {modalType === "create" || modalType === "edit" ? (
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Sede</Form.Label>
                <Form.Control
                  className="mb-3"
                  as="select"
                  name="Campus"
                  onChange={handleChange}
                  value={form.Campus}
                  required
                >
                  <option value="">Seleccione una Sede</option>
                  {sedes.map((sede) => (
                    <option key={sede._id} value={sede._id}>
                      {sede.Name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          ) : null}
          {modalType === "create" || modalType === "edit" ? (
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  className="mb-3"
                  as="select"
                  name="Role"
                  onChange={handleChange}
                  value={form.Role}
                  required
                >
                  <option value="">Seleccione un Rol</option>
                  <option value="0">Analista</option>
                  <option value="1">Administrador</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          ) : null}
          <Row>
            <Col>
              <Button
                size="lg"
                variant={modalType === "edit" ? "outline-warning btn-block" : modalType === "create" ? "outline-primary btn-block" : "outline-danger btn-block"}
                type="submit"
                block
              >
                {modalType === "edit" ? 'Editar Usuario' : modalType === "create" ? 'Crear Usuario' : 'Resetear Contraseña'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
