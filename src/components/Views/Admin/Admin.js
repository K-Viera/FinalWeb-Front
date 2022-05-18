import React from "react";
import { Button } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";

export default function Admin() {
  return (
    <div>
      <h1>Zona administrativa</h1>
      <Container>
        <Row>
          <div className="col-md-12">
            <Button
              size="lg"
              variant="outline-primary m-2"
              type="submit"
              block
              onClick={() => {
                window.location.href = "/Users";
              }}
            >
              Administrar Usuarios
            </Button>
            <Button
              size="lg"
              variant="outline-primary m-2"
              type="submit"
              block
              onClick={() => {
                window.location.href = "/Clientes";
              }}
            >
              Administrar Clientes
            </Button>
            <Button
              size="lg"
              variant="outline-primary m-2"
              type="submit"
              block
              onClick={() => {
                window.location.href = "/Ans";
              }}
            >
              Administrar ANS
            </Button>
          </div>
        </Row>
      </Container>
    </div>
  );
}
