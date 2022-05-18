import moment from "moment";
import React, { useState, useEffect } from "react";
import { Card, Button, CardGroup } from "react-bootstrap";

export default function SeguimientosTableRow({ seguimiento, handleShow }) {
  const [enviados, SetEnviados] = useState("");
  const [asistieron, SetAsistieron] = useState("");
  const [vinculados, SetVinculados] = useState("");
  const [contratados, SetContratados] = useState("");

  useEffect(() => {
    let enviadosTemp = seguimiento.List.find((el) => el.tipo === "enviados");
    SetEnviados(enviadosTemp);

    let asistieronTemp = seguimiento.List.find((el) => el.tipo === "asistieron");
    SetAsistieron(asistieronTemp);

    let vinculadosTemp = seguimiento.List.find((el) => el.tipo === "vinculados");
    SetVinculados(vinculadosTemp);

    let contratadosTemp = seguimiento.List.find((el) => el.tipo === "contratados");
    SetContratados(contratadosTemp);
  }, [seguimiento]);
  
  return (
    <CardGroup>
      {enviados !== undefined && (
        <Card className="text-center" border="primary" style={{ width: '18rem' }}>
          <Card.Header>
            Enviados el { moment(enviados.fecha).format("DD/MM/YYYY")}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Cantidad Enviada: {enviados.cantidad}
            </Card.Title>
            <Card.Text className="text-left">
            </Card.Text>
          </Card.Body>
          {asistieron === undefined && (
            <Button data-type="Candidatos asistieron" data-id={seguimiento._id} onClick={(e) => {handleShow(e, enviados.cantidad)}}>
              Agregar a Asistieron
            </Button>
          )}
        </Card>
      )}
      {asistieron !== undefined && (
        <Card className="text-center" border="primary" style={{ width: '18rem' }}>
          <Card.Header>
            Asistieron el {moment(asistieron.fecha).format("DD/MM/YYYY")}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Cantidad pre Seleccionados: {asistieron.cantidad}
            </Card.Title>
            <Card.Text className="text-left">
              Cantidad Asistieron: {asistieron.asistentes}
            <br />
              Cantidad No Asisten: {asistieron.noAsistentes}
            <br />
              Cantidad Rechazados: {asistieron.rechazados}
            <br />
              Cantidad Rechazados EU: {asistieron.rechazadosEU}
            </Card.Text>
          </Card.Body>
          {vinculados === undefined && asistieron.cantidad > 0 && (
            <Button data-type="Candidatos vinculados" data-id={seguimiento._id} onClick={(e) => {handleShow(e, asistieron.cantidad)}}>
              Agregar a Vinculados
            </Button>
          )}
        </Card>
      )}
      {vinculados !== undefined && (
        <Card className="text-center" border="primary" style={{ width: '18rem' }}>
          <Card.Header>
            Vinculados el {moment(vinculados.fecha).format("DD/MM/YYYY")}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Cantidad a Vincular: {vinculados.cantidad}
            </Card.Title>
            <Card.Text className="text-left">
              Cantidad Desisten: {vinculados.desistenV}
            <br />
              Cantidad Adicional: {vinculados.adicional}
            <br />
              Cantidad Examenes: {vinculados.examenes}
              <br />
              Cantidad Backup: {vinculados.backup}
            </Card.Text>
          </Card.Body>
          {contratados === undefined && vinculados.cantidad > 0 && (
            <Button data-type="Candidatos contratados" data-id={seguimiento._id} onClick={(e) => {handleShow(e, vinculados.cantidad)}}>
              Agregar a Contratados
            </Button>
          )}
        </Card>
      )}
      {contratados !== undefined && (
        <Card className="text-center" border="primary" style={{ width: '18rem' }}>
          <Card.Header>
            Contratados el {moment(contratados.fecha).format("DD/MM/YYYY")}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Cantidad Contratados: {contratados.cantidad}
            </Card.Title>
            <Card.Text className="text-left">
              Cantidad Desisten: {contratados.desistenC}
            <br />
              Cantidad Cancelados EU: {contratados.canceladosEU}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </CardGroup>
  );
}
