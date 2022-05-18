import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { FcNext, FcPrevious } from "react-icons/fc";
import ObservacionesModal from "./ObservacionModal";

export default function Observaciones({
  ShowObservation,
  addObservaciones,
  seguimientos,
  form,
  handleClose,
  handleChange,
  observaciones,
}) {
  const [observacionesAll, setObservacionesAll] = React.useState([]);
	const [count, setCount] = React.useState(0);
	const [total, setTotal] = React.useState(0);

  useEffect(() => {
    if (observaciones != "") {
      let observacionTemp = observaciones[0].List;
			setTotal(observacionTemp.length);

      setObservacionesAll(observacionTemp[count].Observacion);
    }
  }, [seguimientos, observaciones, count]);

  return (
		<>
			<div className="row">
				<h3 className="col-md-12 text-center">
					Observaciones {total > 0 ? count + 1 : 0} / {total}
				</h3>
			</div>
				{observacionesAll &&
					(
						observacionesAll.length === 0 ? (
							<div className="row">
								<h3 className="col-md-12 text-center">
									Sin Observaciones
								</h3>
							</div>
						) : (
							<div className="row">
								<div className="col-md-2" text>
									<Button
										variant="outline-primary"
										onClick={() => setCount(count > 0 ? count - 1 : 0)}
									>
										<FcPrevious />
									</Button>
								</div>
								<div className="col-md-8">
									{observacionesAll}
								</div>
								<div className="col-md-2 justify-content-end">
									<Button
										className="float-right"
										variant="outline-primary"
										onClick={() => setCount(count + 1 < total ? count + 1 : total - 1)}
									>
										<FcNext />
									</Button>
								</div>
							</div>
						)
					)}
				<ObservacionesModal
					ShowObservation={ShowObservation}
					addObservaciones={addObservaciones}
					form={form}
					handleClose={handleClose}
					handleChange={handleChange} 
				/>
			</>
  );
}
