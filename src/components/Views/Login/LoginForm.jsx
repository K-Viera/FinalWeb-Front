import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Card, Container } from "react-bootstrap";

const initialFrom = {
  user: "",
  password: ""
};

export default function LoginsForm({
  getValidationUser
}) {
  const [form, setForm] = useState(initialFrom);

  useEffect(() => {
    setForm(initialFrom);
  }, [initialFrom]);

  const handleChange = async (e) => {
    await setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getValidationUser(form);
  };

  return (
    <div>
      <Container>
        <Card>
          <Card.Body>
            <div>
              <Card.Title className="text-center">
                <h3>Ingreso</h3>
              </Card.Title>
            </div>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    name="user"
                    placeholder="Usuario"
                    onChange={handleChange}
                    value={form.user}
                    min="0"
                    required
                    autoFocus
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    className="mb-3"
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                    value={form.password}
                    required
                  />
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
                    Ingresar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}