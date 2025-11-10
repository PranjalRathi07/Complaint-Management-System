/** @format */

import { useState } from "react";

const RegisterComplaint = () => {
  const [FormData2, setFormData2] = useState({
    name: "",
    classSec: "",
    Subject: "",
    complaint: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData2((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem("StudentEmail");

    const payload = {
      ...FormData2,
      email: userEmail,
    };

    try {
      const response = await fetch("http://localhost:5000/api/Complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        alert("Complaint registered successfully!");
        setFormData2({
          name: "",
          classSec: "",
          Subject: "",
          complaint: "",
        });
      } else {
        alert("Failed to register complaint: " + result.message);
      }
    } catch (error) {
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
        top: "150px",
        left: "370px",
      }}
      onSubmit={handleSubmit}
    >
      <div className="col-md-6">
        <label htmlFor="namel4" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name14"
          name="name"
          value={FormData2.name}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputClass" className="form-label">
          Class & Sec
        </label>
        <input
          type="text"
          className="form-control"
          id="inputClass"
          name="classSec"
          value={FormData2.classSec}
          onChange={handleChange}
        />
      </div>
      <div className="col-12">
        <label htmlFor="complaintsubject" className="form-label">
          Complaint Subject
        </label>
        <select
          id="complaintsubject"
          className="form-select"
          name="Subject"
          value={FormData2.Subject}
          onChange={handleChange}
        >
          <option defaultValue>Choose...</option>
          <option>Acadmic Issues</option>
          <option>Library Services</option>
          <option>IT & Technical Issues</option>
          <option>Infrastructure & Facilities</option>
          <option>Administrative Issues</option>
          <option>Disciplinary/Harassment</option>
          <option>Extracurricular & Events</option>
          <option>Other/Grenal Complaints</option>
        </select>
      </div>
      <div className="col-12">
        <label htmlFor="complaint" className="form-label">
          Complaint
        </label>
        <textarea
          type="text"
          className="form-control"
          id="complaint"
          placeholder="Complaint"
          rows={5}
          name="complaint"
          value={FormData2.complaint}
          onChange={handleChange}
        ></textarea>
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

export default RegisterComplaint;
