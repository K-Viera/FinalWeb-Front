import { Button, Modal, Form, Row, Col } from "react-bootstrap";

export default function ObservacionModal({
  handleChange,
  addObservaciones,
  form,
  ShowObservation,
  handleClose
}) {
  return (
    <Modal show={ShowObservation} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Crear Nueva Observación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addObservaciones}>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Observación</Form.Label>
                <Form.Control
                  className="mb-3 "
                  name="observacion"
                  as="textarea"
                  rows={3}
                  onChange={handleChange}
                  value={form.observacion}
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
                Crear Observación
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
