import { useContext, useState, useEffect } from "react";
import EmployeContext from "./EmployeContext";
import alertContext from "../alert/alertContext";

const EmployeeState = (props) => {
  const host = process.env.REACT_APP_server;
  const employeesInitial = [];
  const [employees, setEmployees] = useState(employeesInitial);
  const { showAlert } = useContext(alertContext);

  // Fetch All Employees
  const getEmploye = async () => {
    try {
      const response = await fetch(`${host}/api/Employee/fetchallEmployee`, {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = await response.json();
      console.log(json);
      setEmployees(json);
    } catch (error) {
      console.log(error);
    }
  };
// Add Employee with Image Upload (Using FormData)
const addEmploye = async (name, email, mobileNo, image, gender, designation, course) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('mobileNo', mobileNo);
  formData.append('image', image); // Assuming image is a File object
  formData.append('gender', gender);
  formData.append('designation', designation);
  formData.append('course', course);

  try {
    const response = await fetch(`${host}/api/Employee/addEmployee`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token')
      },
      body: formData // Use FormData for file upload
    });

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json(); // Get the error details
      console.log(errorData);
      console.log(errorData.keyValue);
      if(errorData.keyValue){
        showAlert(`Employee Already Register`, "danger");
      }else{
        showAlert(errorData.message, "danger");
      }
      
      return;
    }
    const json = await response.json();
    setEmployees(employees.concat(json));
    showAlert("Employee Added", "success");
  } catch (error) {
    showAlert(error, "danger"); // Handle network or server errors
    console.log(error);
  }
};


  // Delete an Employee
  const deleteEmploye = async (id) => {
    try {
      await fetch(`${host}/api/Employee/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const newEmployees = employees.filter((emp) => emp._id !== id);
      setEmployees(newEmployees);
      showAlert("Employee Deleted", "success");
    } catch (error) {
      console.log(error + "in Delete Employee");
    }
  };

  // Edit Employee
  const editEmploye = async (_id, name, email, mobileNo, image, gender, designation, course) => {
   
    const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('mobileNo', mobileNo);
  formData.append('image', image); // Assuming image is a File object
  formData.append('gender', gender);
  formData.append('designation', designation);
  formData.append('course', course);
    
  
    try {
      const response = await fetch(`${host}/api/Employee/updateemp/${_id}`, {
        method: 'PUT',
        headers: {
          'auth-token': localStorage.getItem('token') // No need for 'Content-Type' header here
        },
        body: formData // Send FormData with file and other fields
      });
  
      const updatedEmployee = await response.json();
  
      const updatedEmployees = employees.map(emp =>
        emp._id === _id ? updatedEmployee : emp
      );
      setEmployees(updatedEmployees);
      showAlert("Employee Edited", "success");
    } catch (error) {
      console.log(error);
      showAlert(error.message, "danger");
    }
  };
  

  // Fetch employees on component mount (Optional)
  useEffect(() => {
    getEmploye();
  }, []);

  return (
    <EmployeContext.Provider value={{ employees, addEmploye, deleteEmploye, editEmploye, getEmploye }}>
      {props.children}
    </EmployeContext.Provider>
  );
};

export default EmployeeState;
