import React, { useContext ,useState  } from "react";
import './cssfile/EmployeeForm.css'; // Import the CSS file
import noteContext from "../context/notes/EmployeContext";

const EmployeeForm = () => {
  const context = useContext(noteContext);
  const { addEmploye } = context;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "HR",
    gender: "Male",
    course: [],
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        course: [...formData.course, value],
      });
    } else {
      setFormData({
        ...formData,
        course: formData.course.filter((course) => course !== value),
      });
    }
  };

  const handleImageUpload = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmploye(formData.name , formData.email , formData.mobileNo , formData.image , formData.gender , formData.designation ,formData.course);
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Designation:</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleInputChange}
            />
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleInputChange}
            />
            Female
          </div>
        </div>
        <div className="form-group">
          <label>Course:</label>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="course"
              value="MCA"
              onChange={handleCourseChange}
            />{" "}
            MCA
            <input
              type="checkbox"
              name="course"
              value="BCA"
              onChange={handleCourseChange}
            />{" "}
            BCA
            <input
              type="checkbox"
              name="course"
              value="BSC"
              onChange={handleCourseChange}
            />{" "}
            BSC
          </div>
        </div>
        <div className="form-group">
          <label>Image Upload:</label>
          <input type="file" onChange={handleImageUpload} />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
