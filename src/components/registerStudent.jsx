/** @format */

import { useState } from "react";

const StudentRegistration = () => {
  const [FormData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
  });

  const [Message, setMessage] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/Student/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setMessage("Registration successful!");
        alert("Registration successful!");
        setFormData({
          Name: "",
          email: "",
          password: "",
        });
      } else {
        setMessage("Registration failed: " + result.message);
        alert("Failed to register: " + result.message);
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
      console.error("Error:", error);
    }
  };

  return (
    <form
      className="row g-3"
      style={{
        maxWidth: "850px",
        position: "absolute",
        paddingBottom: "10px",
        top: "120px",
        left: "330px",
      }}
      onSubmit={handleSubmit}
    >
      <div className="col-md-6">
        <label htmlFor="inputName" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="inputName"
          name="Name"
          value={FormData.Name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          value={FormData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-12">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          name="password"
          value={FormData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-12">
        <button
          type="submit"
          class="btn btn-outline-warning rounded-pill"
          style={{
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
            fontWeight: "900",
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default StudentRegistration;
