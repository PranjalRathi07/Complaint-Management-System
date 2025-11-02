/** @format */
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Adminlogin = () => {
  const [formData1, setFormData1] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData1((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/Admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData1),
      });
      const data = await res.json();
      if (data.success) {
        // Save email so other pages can use it
        localStorage.setItem("AdminEmail", data.email);
        navigate("/admin-page");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="st-container">
      <motion.form
        onSubmit={handleSubmit}
        className="st-form"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.9,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <h1>Admin Login.</h1>
        <input
          type="text"
          placeholder="Emial ID"
          name="email"
          value={formData1.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData1.password}
          onChange={handleChange}
        />
        <button
          className="badge text-bg-warning rounded-pill"
          style={{
            border: "0px",
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer",
            width: "87%",
          }}
        >
          Submit
        </button>
      </motion.form>
    </div>
  );
};

export default Adminlogin;
