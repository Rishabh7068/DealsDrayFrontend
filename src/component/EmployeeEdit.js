import React, { useState , useContext} from 'react';
import noteContext from "../context/notes/EmployeContext";

const EmployeeEdit = ({ employee, onCancel }) => {
  const context = useContext(noteContext);
  const {  editEmploye } = context;
  const [formData, setFormData] = useState(employee);

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

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Updated Employee Data:', formData);
    editEmploye(formData._id , formData.name ,formData.email , formData.mobileNo , formData.image , formData.gender , formData.designation , formData.course);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '600px' }}>
      <h2 style={{ backgroundColor: 'yellow', textAlign: 'center', padding: '10px' }}>Employee Edit</h2>
      <form>
        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Designation:</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Gender:</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleInputChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleInputChange}
              />
              Female
            </label>
          </div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Course:</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            <label>
              <input
                type="checkbox"
                name="course"
                value="MCA"
                onChange={handleCourseChange}
              /> 
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                name="course"
                value="BCA"
                onChange={handleCourseChange}
              /> 
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                name="course"
                value="BSC"
                onChange={handleCourseChange}
              /> 
              BSC
            </label>
          </div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Image Upload:</label>
          <input
            type="file"
            onChange={handleImageUpload}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div>
          <button type="button"  style={{
              backgroundColor: 'lightgreen',
              marginLeft :"25%",
              marginTop: "2px",
              color: 'black',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '50%',
            }}
            onClick={handleSave}>Save</button>
         <button type="button" style={{
          marginTop: "2px",
          marginLeft :"25%",
              backgroundColor: 'lightgreen',
              color: 'black',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '50%',
            }}
          onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEdit;
