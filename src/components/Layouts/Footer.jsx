import React from "react";
import "./Footer.css";
import moment from "moment";

const Footer=()=>(
    <div className="footer">
        <p className="textCenter">Copyright © {moment(Date.now()).format("YYYY")} - Misión Software. Todos los derechos reservados</p>
    </div>
);

export default Footer