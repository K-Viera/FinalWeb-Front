import React, { useState, useEffect } from "react";
import moment from "moment";
import Swal from 'sweetalert2'
import Axios from "axios";
import { url } from "../../../global";

const actualYear = parseInt(moment(Date.now()).format("YYYY"));
const actualMonth = parseInt(moment(Date.now()).format("MM")) - 1;
const monthName = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "	Diciembre",
];

export default function DateView() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(actualYear);
  const [selectedMonth, setSelectedMonth] = useState(actualMonth);
  const [days, setDays] = useState([]);
  useEffect(() => {
    setYears([
      actualYear,
      actualYear - 1,
      actualYear - 2,
      actualYear - 3,
      actualYear - 4,
    ]);
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      window.location.href = "/";
      return;
    }
  }, []);
  useEffect(() => {
    getDays(selectedYear,selectedMonth)
  }, [selectedYear, selectedMonth]);


  const getDays= async (year, month)=>{
    await Axios.get(url + "/fechas", {
      headers: { "access-token": localStorage.getItem("token") },
      params: {
        year,month
      },
    })
    .then((res) => {
      setDays(res.data)
    })
    .catch((err) => {
      Swal.fire({
        title: "Ocurrió un error",
        icon: "error",
        showConfirmButton: false,
        timer: 5000,
      });
    });
  }

  const getDaysArray = function (year, monthIndex) {
    var names = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];
    var date = new Date(year, monthIndex, 1);
    var result = [];
    while (date.getMonth() == monthIndex) {
      result.push({ number: date.getDate(), date: names[date.getDay()] });
      date.setDate(date.getDate() + 1);
    }
    return result;
  };

  const verifyActualState=(number,activo)=>{
    let listTemp=[...days]
    let actualDay=listTemp.find(el=>el.number==number)
    if(actualDay!=null){
      console.log("2",actualDay)
      actualDay.activo=activo
      console.log("3",actualDay)
      setDays([...listTemp])
    }else return;
  }

  const changeSelectedYear = (e) => {
    setSelectedYear(e.target.value);
  };
  const changeSelectedMonth = (e) => {
    setSelectedMonth(e.target.value);
  };
  const changeDayState =async (e) => {
    let day=e.target.getAttribute("index")
    let fecha = moment(actualYear+"-"+(actualMonth+1)+"-"+day, "YYYY-MM-DD").toDate();
    let headersForm = {
      headers: { "access-token": localStorage.getItem("token") },
    };
    await Axios.put(url + `/fechas`, {fecha}, headersForm)
      .then((res) => {
        console.log("respuesta",res.data);
        verifyActualState(res.data.number,res.data.activo)
      })
      .catch((err) => {
        Swal.fire({
          title: "Ocurrió un error",
          icon: "error",
          showConfirmButton: false,
          timer: 5000,
        });
      });
  };
  return (
    <>
      <select value={selectedYear} onChange={changeSelectedYear}>
        {years.map((year) => (
          <option value={year}>{year}</option>
        ))}
      </select>
      <select value={selectedMonth} onChange={changeSelectedMonth}>
        {[...Array(12)].map((x, i) => (
          <option value={i}>{monthName[i]}</option>
        ))}
      </select>
      {days.map((day) => (
        <>
          <button index={day.number} onClick={changeDayState}>
            {day.number + "-" + day.date+"-"+day.activo}
          </button>
        </>
      ))}
    </>
  );
}
