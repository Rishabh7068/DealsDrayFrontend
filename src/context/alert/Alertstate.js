import {React , useState}from 'react'
import AlertContext from './alertContext';

const Alertstate = (props) => {
    const [alert , setAlert] = useState(null);
    
    const showAlert = (message, type)=>{
        setAlert({
          msg : message,
          type : type
        })
        setTimeout(() =>{
          setAlert(null);
        },1500);
      }

  return (
    <AlertContext.Provider
    value={{ showAlert , alert}}
  >
    {props.children}
  </AlertContext.Provider>
  )
}



export default Alertstate;
