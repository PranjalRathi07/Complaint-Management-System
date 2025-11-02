/** @format */
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate("/stlog");
  };

  const handleAdminLogin = () => {
    navigate("/adminlogin");
  };

  return (
    <center>
      <div
        style={{
          paddingTop: "100px",
          backgroundColor: "#E5E5E5",
          height: "100vh",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 0.9 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.6, bounce: 0.4 },
          }}
        >
          WELCOME TO LOGIN PAGE
        </motion.h1>

        <div className="col-lg-6 col-xxl-4 my-5 mx-auto">
          {" "}
          <motion.div
            className="d-grid gap-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            {" "}
            <button
              className="btn  rounded-pill px-3 btn btn-outline-secondary"
              type="button"
              onClick={handleStudentLogin}
            >
              Student login
            </button>{" "}
            <button
              className="btn btn-warning rounded-pill px-3 btn "
              type="button"
              onClick={handleAdminLogin}
            >
              Admin login
            </button>{" "}
            <br />
            <p>
              "Welcome to our complaint portal. Weather you are a student with
              concerns or a teacher ready to adderss them. Please choose your
              role below to login."
            </p>
            <p>For Student Login.Click "Student login"</p>
            <p>For Admin Login.Click "Admin login"</p>
          </motion.div>{" "}
        </div>
      </div>
    </center>
  );
};

export default Login;
