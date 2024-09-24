import { React, useContext, useEffect, useRef ,useState } from "react";
import noteContext from "../context/notes/EmployeContext";
import alertContext from "../context/alert/alertContext";
import './cssfile/fetchlist.css'; // Create and use this for styling
import { Link, useNavigate } from "react-router-dom";
import EmployeeEdit from "./EmployeeEdit";

export const Fetchemp = () => {
  const context = useContext(noteContext);
  const [searchTerm, setSearchTerm] = useState("");

  const { employees, addEmploye, deleteEmploye, editEmploye, getEmploye } = context;
  const ref = useRef(null);
  const Navigate = useNavigate();
  const alertcontext = useContext(alertContext);
  const { showAlert } = alertcontext;
  const [editEmployee, setEditEmployee] = useState(null);
  


  useEffect(() => {
    if(localStorage.getItem('token') !== null){
      getEmploye();
    }else{
      showAlert("Login first","danger");
      Navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    await deleteEmploye(id);
    showAlert("Employee Deleted Successfully", "success");
  };
  const handleEdit = (employee) => {
    setEditEmployee(employee); // Store the full employee object in state
  };




  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="employee-list-container">
      <div className="header">
        <h2>Employee List</h2>
        <div>Total Count: {employees.length}</div>
        <Link
                to="/createemp"
              >
                Create Employe
              </Link>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Search Keyword"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee,idx) => (
            <tr key={employee._id}>
              <td>{idx+1}</td>
              <td><img src={employee.image} alt="Profile" /></td> {/* Placeholder for image */}
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobileNo}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course}</td>
              <td>{employee.createDate}</td>
              <td>
                  <button onClick={() => handleEdit(employee)}>Edit</button> - 
                  <button onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    {editEmployee && (
        <EmployeeEdit 
          employee={editEmployee} // Pass the full employee object to EmployeeEdit
          onCancel={() => setEditEmployee(null)} // Allow canceling the edit
        />
      )}
    </>
  );
};
