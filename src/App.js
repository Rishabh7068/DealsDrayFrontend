import "./App.css";
import { React} from "react";
import Navbar from "./component/Navbar";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import EmployeeState from './context/notes/EmployeeState';
import { Home } from "./component/Home";
import { Alert } from "./component/Alert";
import Alertstate from "./context/alert/Alertstate";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { Fetchemp } from "./component/Fetchemp";
import EmployeeForm from "./component/EmployeeForm";

function App() {
  return (
    <>
  <Alertstate>
    <EmployeeState>
    <BrowserRouter>
      <Navbar/>
      <Alert/>
        <Routes>
              <Route exact path="/"  element={<><Login/></>}/>
              <Route exact path="/signup"  element={<><Signup/></>}/>
             <Route exact path="/home"  element={<><Home/></>}/>
             <Route exact path="/emp"  element={<><Fetchemp/></>}/>
             <Route exact path="/createemp"  element={<><EmployeeForm/></>}/>             
        </Routes>
    </BrowserRouter>
    </EmployeeState>
    </Alertstate>
    </>
  );
}

export default App;
