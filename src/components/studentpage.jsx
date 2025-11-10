/** @format */

import { useEffect, useState } from "react";
import Stcards from "./studentComplaintCards";
import RegisterComplaint from "./register-complaint";
import Mycomplaintpage from "./complaintpage";
import GraphView from "./graphview";
import BlurText from "../animetion/BlurText";
import TextType from "../animetion/TextType";

const StudentPage = () => {
  const [Student, setStudent] = useState(null);
  const [Activepg, setActivepg] = useState("dashboard");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    if (page) setActivepg(page);

    const email = localStorage.getItem("StudentEmail");
    if (!email) return;

    fetch(
      `http://localhost:5000/api/Student/email/${encodeURIComponent(email)}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleNav = (page) => {
    setActivepg(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  };

  return (
    <div style={{ backgroundColor: "#E5E5E5", height: "100%" }}>
      <nav
        className="navbar navbar-expand-md navbar-dark fixed-top "
        style={{ backgroundColor: "#14213D" }}
      >
        {" "}
        <div
          className="container-fluid"
          style={{
            marginTop: "0px",
            color: "white",
            fontSize: "30px",
            fontWeight: "bold",
            padding: "10px",
          }}
        >
          <BlurText text={`Hello, ${Student ? Student.Name : "Loading..."}`}>
            {" "}
          </BlurText>
          <strong style={{ color: "#fca311" }}>
            <TextType text="Online Complaint Management System."></TextType>
          </strong>
        </div>
      </nav>
      <div
        className="d-flex flex-column flex-shrink-0 "
        style={{
          width: "290px",
          minHeight: "100vh",
          position: "fixed",
          paddingTop: "100px",
          background: "#14213D",
        }}
      >
        {" "}
        <ul className="nav nav-pills flex-column mb-auto">
          {" "}
          <li
            className="nav-item"
            style={{
              marginTop: "10px",
              marginLeft: "5px",
              marginBottom: "10px",
            }}
          >
            {" "}
            <a
              href="?page=dashboard"
              onClick={(e) => {
                e.preventDefault();
                handleNav("dashboard");
              }}
              className={`nav-link ${Activepg === "dashboard" ? "active" : ""}`}
              aria-current="page"
              style={{ color: "white" }}
            >
              {" "}
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              ></svg>
              Dashboard
            </a>{" "}
          </li>{" "}
          <li
            style={{
              marginLeft: "5px",
              marginBottom: "10px",
            }}
          >
            {" "}
            <a
              href="?page=register-complaint"
              onClick={(e) => {
                e.preventDefault();
                handleNav("register-complaint");
              }}
              className={`nav-link ${
                Activepg === "register-complaint" ? "active" : ""
              }`}
              style={{ color: "white" }}
            >
              {" "}
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Register Complaint
            </a>{" "}
          </li>{" "}
          <li
            style={{
              marginLeft: "5px",
              marginBottom: "10px",
            }}
          >
            {" "}
            <a
              href="?page=my-complaint"
              onClick={(e) => {
                e.preventDefault();
                handleNav("my-complaint");
              }}
              className={`nav-link ${
                Activepg === "my-complaint" ? "active" : ""
              }`}
              style={{ color: "white" }}
            >
              {" "}
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#table"></use>
              </svg>
              My Complaint
            </a>{" "}
          </li>{" "}
          <li
            style={{
              marginLeft: "5px",
              marginBottom: "10px",
            }}
          >
            {" "}
            <a
              href="?page=graph-view"
              onClick={(e) => {
                e.preventDefault();
                handleNav("graph-view");
              }}
              className={`nav-link ${
                Activepg === "graph-view" ? "active" : ""
              }`}
              style={{ color: "white" }}
            >
              {" "}
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#table"></use>
              </svg>
              Graph View
            </a>{" "}
          </li>{" "}
          <li style={{ position: "absolute", bottom: "20px" }}>
            {" "}
            <button
              className="nav-link link-body"
              style={{ color: "white" }}
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem("StudentEmail");
                window.location.href = "/";
              }}
            >
              {" "}
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#grid"></use>
              </svg>
              LogOut
            </button>{" "}
          </li>{" "}
        </ul>{" "}
      </div>
      {Activepg === "dashboard" && <Stcards />}
      {Activepg === "register-complaint" && <RegisterComplaint />}
      {Activepg === "my-complaint" && <Mycomplaintpage />}
      {Activepg === "graph-view" && <GraphView />}
    </div>
  );
};
export default StudentPage;
