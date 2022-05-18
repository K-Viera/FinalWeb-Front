import React from "react";
import { Form, Col } from "react-bootstrap";

export default function ObservacionesModal({ input, changeInput }) {
  return (
    <>
      <Col>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            type="text"
            name="nombre"
            placeholder="nombre"
            data-key={input.key}
            onChange={changeInput}
            value={input.nombre}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            type="text"
            name="cedula"
            placeholder="cedula"
            data-key={input.key}
            onChange={changeInput}
            value={input.cedula}
          />
        </Form.Group>
      </Col>
    </>
  );
}
