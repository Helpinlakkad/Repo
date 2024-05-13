import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddStudent = () => {
    axios
      .post("http://localhost:5000/students", {
        name: name,
        rollNumber: rollNumber,
        department: department,
      })
      .then((res) => {
        setStudents([...students, res.data]);
        setName("");
        setRollNumber("");
        setDepartment("");
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteStudent = (id) => {
    axios
      .delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        setStudents(students.filter((student) => student._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateStudent = () => {
    axios
      .put(`http://localhost:5000/students/${editId}`, {
        name: name,
        rollNumber: rollNumber,
        department: department,
      })
      .then((res) => {
        setStudents(
          students.map((student) =>
            student._id === editId
              ? { ...student, name, rollNumber, department }
              : student
          )
        );
        setName("");
        setRollNumber("");
        setDepartment("");
        setEditMode(false);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id, name, rollNumber, department) => {
    setEditId(id);
    setName(name);
    setRollNumber(rollNumber);
    setDepartment(department);
    setEditMode(true);
  };

  return (
    <div>
      <h1>B.Tech IT Subject Details</h1>
      {editMode ? (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <button onClick={handleUpdateStudent}>Update</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <button onClick={handleAddStudent}>Add Student</button>
        </div>
      )}
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.rollNumber} - {student.department}
            <button onClick={() => handleDeleteStudent(student._id)}>
              Delete
            </button>
            <button
              onClick={() =>
                handleEdit(
                  student._id,
                  student.name,
                  student.rollNumber,
                  student.department
                )
              }
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
