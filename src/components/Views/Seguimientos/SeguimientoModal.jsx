import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import SeguimientoInputModal from "./SeguimientoInputModal";
import moment from "moment";
import React, { useState, useEffect } from "react";

export default function SeguimientoModal({
  seguimientoModal,
  handleClose,
  handleChange,
  addSeguimiento,
  seguimientoType,
  inputList,
  changeInput,
  form,
  cantidadPrev
}) {
  let [asistentes, setAsistentes] = useState(0);
  let [noAsistentes, setNoAsistentes] = useState(0);
  let [seleccionados, setSeleccionados] = useState(0);
  let [rechazados, setRechazados] = useState(0);
  let [rechazadosEU, setRechazadosEU] = useState(0);
  let [seleccionadosEU, setSeleccionadosEU] = useState(0);
  let [noAdicional, setNoAdicional] = useState(0);
  let [noExamenes, setNoExamenes] = useState(0);
  let [desistenV, setDesistenV] = useState(0);
  let [contratar, setContratar] = useState(0);
  let [canceladosEU, setCanceladosEU] = useState(0);
  let[desistenC, setDesistenC] = useState(0);


  let seleccionadosChange = (e) => {
    if(e.name === "asistentes"){
      setAsistentes(e.value);
      setSeleccionados(e.value);
      setNoAsistentes(cantidadPrev - e.value);
      setRechazadosEU(0);
      setRechazados(0);
    }
    if(e.name === "seleccionadosEU"){
      setSeleccionados(e.value);
      setRechazadosEU(0);
    }
    if(e.name === "rechazadosEU"){
      setRechazadosEU(e.value);
      setSeleccionados(asistentes - rechazados - e.value);
    }
  }

  let vincularChange = (e) => {
      if(e.name === "noAdicional"){
        if(parseInt(noExamenes) + parseInt(desistenV) + parseInt(e.value) <= cantidadPrev){
          setNoAdicional(e.value);
        }
      } else if(e.name === "noExamenes"){
        if(parseInt(noAdicional) + parseInt(desistenV) + parseInt(e.value) <= cantidadPrev){
          setNoExamenes(e.value);
        }
      } else if(e.name === "desistenV"){
        if(parseInt(noExamenes) + parseInt(noAdicional) + parseInt(e.value) <= cantidadPrev){
          setDesistenV(e.value);
        }
      }
      if (noAdicional + noExamenes + desistenV < cantidadPrev && seleccionadosEU === 0) {
        setSeleccionadosEU(seleccionadosEU + e.value);
      }
  }

  let contratarChange = (e) => {
    if(e.name === "canceladosEU"){
      if(parseInt(desistenC) + parseInt(e.value) <= cantidadPrev){
        setCanceladosEU(e.value);
      }
    } else if(e.name === "desistenC"){
      if(parseInt(canceladosEU) + parseInt(e.value) <= cantidadPrev){
        setDesistenC(e.value);
      }
    }
  }

  useEffect(() => {
    setContratar(cantidadPrev - canceladosEU - desistenC);
  }, [canceladosEU, desistenC]);

  useEffect(() => { 
    setRechazados(asistentes - seleccionados - rechazadosEU);
  }, [seleccionados, rechazadosEU]);

  useEffect(() => {
    setSeleccionadosEU(cantidadPrev - noAdicional - noExamenes - desistenV);
  }, [noAdicional, noExamenes, desistenV]);

  useEffect(() => {
    setAsistentes(cantidadPrev);
    setSeleccionados(cantidadPrev);
    setNoAsistentes(0);
    setRechazados(0);
    setSeleccionadosEU(cantidadPrev);
    setNoAdicional(0);
    setNoExamenes(0);
    setDesistenV(0);
    setContratar(cantidadPrev);
    setCanceladosEU(0);
    setDesistenC(0);
    setRechazadosEU(0);
  }, [seguimientoModal]);

  return (
    <Modal show={seguimientoModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{seguimientoType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addSeguimiento}>
          {seguimientoType === "Candidatos enviados" && (
            <>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Cantidad Enviados:</Form.Label>
                    <Form.Control
                      type="number"
                      name="cantidad"
                      min="0"
                      max="200"
                      onChange={handleChange}
                      value={form.cantidad}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Fecha:</Form.Label>
                    <Form.Control
                      type="date"
                      name="fecha"
                      value={moment(form.fecha).format("YYYY-MM-DD")}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
          {seguimientoType === "Candidatos asistieron" && (
            <>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Cantidad Asistentes:</Form.Label>
                    <Form.Control
                      type="number"
                      name="asistentes"
                      min="0"
                      max={cantidadPrev}
                      onChange={(e) => seleccionadosChange(e.target)}
                      value={asistentes}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Fecha:</Form.Label>
                    <Form.Control
                      type="date"
                      name="fecha"
                      value={moment(form.fecha).format("YYYY-MM-DD")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Seleccionados:</Form.Label>
                    <Form.Control
                      type="number"
                      name="seleccionadosEU"
                      min="0"
                      max={cantidadPrev - noAsistentes}
                      onChange={(e) => seleccionadosChange(e.target)}
                      value={seleccionados}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Rechazados:</Form.Label>
                    <Form.Control
                      type="number"
                      name="rechazados"
                      disabled
                      value={rechazados}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>No Asisten:</Form.Label>
                    <Form.Control
                      type="number"
                      name="noAsistentes"
                      disabled
                      value={noAsistentes}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Rechazados EU:</Form.Label>
                    <Form.Control
                      type="number"
                      name="rechazadosEU"
                      min="0"
                      max={asistentes - rechazados}
                      onChange={(e) => seleccionadosChange(e.target)}
                      value={rechazadosEU}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
          {seguimientoType === "Candidatos vinculados" && (
            <>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Cantidad Seleccionados:</Form.Label>
                    <Form.Control
                      type="number"
                      name="seleccionadosEU"
                      min="0"
                      max={cantidadPrev}
                      disabled
                      value={seleccionadosEU}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Fecha:</Form.Label>
                    <Form.Control
                      type="date"
                      name="fecha"
                      value={moment(form.fecha).format("YYYY-MM-DD")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>No x Adicional:</Form.Label>
                    <Form.Control
                      type="number"
                      name="noAdicional"
                      min="0"
                      max={cantidadPrev}
                      onChange={(e) => vincularChange(e.target)}
                      value={noAdicional}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>No x Examenes:</Form.Label>
                    <Form.Control
                      type="number"
                      name="noExamenes"
                      min="0"
                      max={cantidadPrev}
                      onChange={(e) => vincularChange(e.target)}
                      value={noExamenes}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Desisten:</Form.Label>
                    <Form.Control
                      type="number"
                      name="desistenV"
                      min="0"
                      max={cantidadPrev}
                      onChange={(e) => vincularChange(e.target)}
                      value={desistenV}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
          {seguimientoType === "Candidatos contratados" && (
            <>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Cantidad a Contratar:</Form.Label>
                    <Form.Control
                      type="number"
                      name="contratar"
                      min="0"
                      max={cantidadPrev}
                      disabled
                      value={contratar}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Fecha:</Form.Label>
                    <Form.Control
                      type="date"
                      name="fecha"
                      value={moment(form.fecha).format("YYYY-MM-DD")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Cancelados EU:</Form.Label>
                    <Form.Control
                      type="number"
                      name="canceladosEU"
                      min="0"
                      max={cantidadPrev}
                      onChange={(e) => contratarChange(e.target)}
                      value={canceladosEU}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Desisten Contrato:</Form.Label>
                    <Form.Control
                      type="number"
                      name="desistenC"
                      min="0"
                      max={cantidadPrev}
                      onChange={(e) => contratarChange(e.target)}
                      value={desistenC}
                    />
                  </Form.Group>
                </Col>
              </Row>
              Personas:
              {inputList.slice(0, contratar).map((input) => (
                <Row>
                  <SeguimientoInputModal
                    changeInput={changeInput}
                    input={input}
                  />
                </Row>
              ))}
            </>
          )}
          <Row>
            <Col>
              <Button
                size="lg"
                variant="outline-primary btn-block"
                type="submit"
                block
              >
                Guardar
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
