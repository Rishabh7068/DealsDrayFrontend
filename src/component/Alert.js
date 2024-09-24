import React, { useContext } from "react";
import alertContext from "../context/alert/alertContext";



export const Alert = (props) => {
  const context = useContext(alertContext);
  const {alert} = context;


  return (
    <>
      <div style={{height: '50px'}}>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
           <strong>{alert.msg} </strong>
        </div>}
        </div>
    </>
  );
};
