/** @format */

import express from "express";
import { mongoose } from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Students_db");

// Create a User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  Name: String,
});

const Student = mongoose.model("Student", userSchema, "Student");
const Teacher = mongoose.model("Teacher", userSchema, "Teacher");

// Create a Complaint Schema
const complaintSchema = new mongoose.Schema({
  email: String,
  name: String,
  classSec: String,
  Subject: String,
  complaint: String,
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema, "Complaints");

// Student Login Route
app.post("/api/Student/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Student.findOne({ email });

  if (!user) return res.json({ success: false, message: "User not found" });

  // Compare password
  const isMatch = user.password === password;
  if (!isMatch)
    return res.json({ success: false, message: "Invalid credentials" });

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });

  res.json({
    success: true,
    message: "Login successful",
    email: user.email,
    Name: user.Name,
    token,
  });
});

// Get  students
app.get("/api/Student/email/:email", async (req, res) => {
  try {
    const user = await Student.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Login Route
app.post("/api/Admin/login", async (req, res) => {
  const { email, password } = req.body;

  const user1 = await Teacher.findOne({ email });

  if (!user1) return res.json({ success: false, message: "User not found" });

  // Compare password
  const isMatch = user1.password === password;
  if (!isMatch)
    return res.json({ success: false, message: "Invalid credentials" });

  // Generate JWT token
  const token = jwt.sign({ id: user1._id }, "secretkey", { expiresIn: "1h" });

  res.json({
    success: true,
    message: "Login successful",
    email: user1.email,
    Name: user1.Name,
    token,
  });
});

// Get teachers
app.get("/api/Admin/email/:email", async (req, res) => {
  try {
    const user1 = await Teacher.findOne({ email: req.params.email });
    if (!user1) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(user1);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Complaints post
app.post("/api/Complaints", async (req, res) => {
  try {
    // get data from res body
    const { name, classSec, Subject, complaint, email } = req.body;

    // new complaint document
    const newComplaint = new Complaint({
      email,
      name,
      classSec,
      Subject,
      complaint,
    });
    // save to database
    await newComplaint.save();

    // respones
    res.json({ success: true, message: "Complaint registered successfully!" });
  } catch (error) {
    console.error("Error saving complaint:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// GET all complaints
app.get("/api/Complaints", async (req, res) => {
  try {
    // Find all documents in the Complaint collection
    const complaints = await Complaint.find({});

    // Send the array of complaints back as JSON
    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// GET complaints by user email
app.get("/api/Complaints/user/:email", async (req, res) => {
  try {
    const userComplaints = await Complaint.find({ email: req.params.email });
    res.json(userComplaints);
  } catch (error) {
    console.error("Error fetching user complaints:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// PATCH update complaint status by ID
app.patch("/api/Complaints/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if the new status is valid
    if (!["Pending", "Resolved", "Rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!updatedComplaint) {
      return res
        .status(404)
        .json({ success: false, message: "Complaint not found" });
    }

    res.json({ success: true, data: updatedComplaint });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
