import React, { useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Axios from "axios";
import Swal from "sweetalert2";
import "../../App.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Visitors from "../Views/Visitors/Visitors";

export default function AreasMenu({
  downloadType,
  url,
  modalShow,
  changeModalShow,
}) {
  const [beginDate, setBeginDate] = useState(Date.now());
  const [finishDate, setFinishDate] = useState(Date.now());
  const download = async () => {
    await Axios({
      url: url,
      method: "post",
      responseType: "blob",
      data: { beginDate, finishDate },
    }).then((response) => {
      var headers = response.headers;
      var blob = new Blob([response.data], { type: headers["content-type"] });
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = downloadType;
      link.click();
    });
  };
  return (
    <div>
      <Modal show={modalShow} onHide={changeModalShow}>
        <Modal.Header closeButton>
          <Modal.Title>Descargue {downloadType} </Modal.Title>
        </Modal.Header>
        <Modal.Body className="textCenter">
          <Container className="flex">
            <p>Desde:</p>
            <DatePicker
              selected={beginDate}
              onChange={(date) => setBeginDate(date)}
            />
          </Container>
          <Container className="flex">
            <p>Hasta:</p>
            <DatePicker
              selected={finishDate}
              onChange={(date) => setFinishDate(date)}
            />
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={changeModalShow}>
            Close
          </Button>
          <Button variant="primary" onClick={download}>
            Descargar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
