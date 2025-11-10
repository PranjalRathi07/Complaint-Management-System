/** @format */

import { useEffect, useState } from "react";
import AdminCard from "./adminComplaintCards";
import ComplaintTable from "./complaint-table";
import BlurText from "../animetion/BlurText";
import RegisterStudent from "./registerStudent";
import TextType from "../animetion/TextType";

const AdminPage = () => {
  const [Admin, setAdmin] = useState(null);
  const [Activepg, setActivepg] = useState("Admin Dashboard");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    if (page) setActivepg(page);

    const email = localStorage.getItem("AdminEmail");
    if (!email) return;

    fetch(`http://localhost:5000/api/Admin/email/${encodeURIComponent(email)}`)
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data);
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
    <div>
      <nav
        className="navbar navbar-expand-md navbar-dark fixed-top "
        style={{ backgroundColor: "#14213D" }}
      >
        {" "}
        <div
          className="container-fluid"
          style={{
            color: "white",
            fontSize: "30px",
            fontWeight: "bold",
            marginLeft: "10px",
            padding: "10px",
          }}
        >
          {" "}
          <BlurText text={`Hello, ${Admin ? Admin.Name : "Loading..."}`}>
            {" "}
          </BlurText>
          <strong style={{ color: "#fca311" }}>
            <TextType text="Online Complaint Management System."></TextType>
          </strong>
        </div>{" "}
      </nav>
      <div
        className="d-flex flex-column flex-shrink-0 "
        style={{
          width: "240px",
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
              href="?page=Admin Dashboard"
              onClick={(e) => {
                e.preventDefault();
                handleNav("Admin Dashboard");
              }}
              className={`nav-link ${
                Activepg === "Admin Dashboard" ? "active" : ""
              }`}
              aria-current="page"
              style={{ color: "white" }}
            >
              {" "}
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#home"></use>
              </svg>
              Admin Dashboard
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
              href="?page=Complaint Table"
              onClick={(e) => {
                e.preventDefault();
                handleNav("Complaint Table");
              }}
              className={`nav-link ${
                Activepg === "Complaint Table" ? "active" : ""
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
              Complaint Table
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
              href="?page=Register Student"
              onClick={(e) => {
                e.preventDefault();
                handleNav("Register Student");
              }}
              className={`nav-link ${
                Activepg === "Register Student" ? "active" : ""
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
              Register Student
            </a>{" "}
          </li>{" "}
          <li style={{ position: "absolute", bottom: "20px" }}>
            {" "}
            <button
              className="nav-link link-body"
              style={{ color: "white" }}
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem("AdminEmail");
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
      {Activepg === "Admin Dashboard" && <AdminCard />}
      {Activepg === "Complaint Table" && <ComplaintTable />}
      {Activepg === "Register Student" && <RegisterStudent />}
    </div>
  );
};
export default AdminPage;
