/** @format */
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextType from "../animetion/TextType";

const Adminlogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData1, setFormData1] = useState({
    Name: "",
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

    if (isLogin) {
      try {
        const res = await fetch("http://localhost:5000/api/Admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData1.email, password: formData1.password }),
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
    } else {
      try {
        const res = await fetch("http://localhost:5000/api/Admin/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData1),
        });
        const data = await res.json();
        if (data.success) {
          alert(data.message);
          setIsLogin(true); // Switch back to login after successful register
        } else {
          alert(data.message || data.error || "Registration failed");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="st-container">
      <TextType
        style={{
          margin: "50px",
          fontSize: "80px",
          fontWeight: "900",
          color: "#FFA500",
          whiteSpace: "pre-line",
        }}
        text={"Online\nComplaint\nManagement\nSystem."}
      ></TextType>
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
        style={{ width: "490px" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1 style={{ margin: 0 }}>{isLogin ? "Admin Login." : "Admin Signup."}</h1>
          <button 
            type="button" 
            className="btn btn-sm btn-outline-warning" 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>

        {!isLogin && (
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="Name"
              name="Name"
              value={formData1.Name}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingName">Name</label>
          </div>
        )}

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            value={formData1.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={formData1.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button
          type="submit"
          className="btn btn-outline-warning rounded-pill"
          style={{
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
            fontWeight: "900",
          }}
        >
          {isLogin ? "Submit" : "Register"}
        </button>
      </motion.form>
    </div>
  );
};

export default Adminlogin;
