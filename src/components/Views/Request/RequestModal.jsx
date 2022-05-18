import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

export default function CreateRequest({ 
  departamentos, 
  municipios,
  clientes, 
  handleChange, 
  handleSubmit, 
  tiposCargos,
  form, 
  modalShow
}) {
  const [show, setShow] = useState(modalShow);
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Crear Nueva Solicitud</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Cliente</Form.Label>
                <Form.Control
                  className="mb-3 "
                  name="cliente"
                  as="select"
                  onChange={handleChange}
                  value={form.cliente}
                  required
                  autoFocus
                >
                  <option value="">Seleccione un cliente</option>
                  {clientes.length > 0
                    ? clientes.map((cliente) => (
                        <option key={cliente._id} value={cliente._id}>
                          {cliente.Nombre}
                        </option>
                      ))
                    : ""}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Tipo de Cargo</Form.Label>
                <Form.Control
                  className="mb-3"
                  name="tipoCargo"
                  as="select"
                  onChange={handleChange}
                  value={form.tipoCargo}
                  required
                >
                  <option value="">Seleccione un tipo cargo</option>
                  {tiposCargos.map((tipoCargo) => (
                    <option key={tipoCargo._id} value={tipoCargo._id}>
                      {tipoCargo.TipoCargo}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Cargo</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  name="cargo"
                  onChange={handleChange}
                  value={form.cargo}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Linea</Form.Label>
                <Form.Control
                  className="mb-3"
                  as="select"
                  name="linea"
                  onChange={handleChange}
                  value={form.linea}
                  required
                >
                  <option value="">Linea</option>
                  <option value="Temporal">Temporal</option>
                  <option value="BPO">BPO</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="number"
                  name="cantidad"
                  maxLength="3"
                  min="1"
                  onChange={handleChange}
                  value={form.cantidad}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>ANS</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="number"
                  name="ans"
                  onChange={handleChange}
                  value={form.ans}
                  disabled={true}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Departamento</Form.Label>
                <Form.Control
                  className="mb-3"
                  as="select"
                  name="departamento"
                  onChange={handleChange}
                  value={form.departamento}
                  required
                >
                  <option value="">Seleccione un Departamento</option>
                  {departamentos.map((departamento) => (
                    <option key={departamento._id} value={departamento._id}>
                      {departamento.Nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Municipio</Form.Label>
                <Form.Control
                  className="mb-3"
                  as="select"
                  name="municipio"
                  onChange={handleChange}
                  value={form.municipio}
                  required
                >
                  <option value="">Seleccione un Municipio</option>
                  {municipios.map((municipio) => (
                    <option key={municipio._id} value={municipio._id}>
                      {municipio.Nombre}
                    </option>
                  ))}
                </Form.Control>
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
                Crear Solicitud
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
