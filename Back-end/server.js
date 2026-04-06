/** @format */

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("MongoDB connected successfully"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Nodemailer setup
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

// Test route
app.get("/", (req, res) => {
	res.send("Backend is running");
});

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

// Student Register
app.post("/api/Student/register", async (req, res) => {
	try {
		const { Name, email, password } = req.body;

		const existingStudent = await Student.findOne({ email });
		if (existingStudent) {
			return res.json({ success: false, message: "Email already in use." });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newStudent = new Student({
			Name,
			email,
			password: hashedPassword,
		});

		await newStudent.save();

		res.json({ success: true, message: "Student registered successfully!" });
	} catch (error) {
		console.error("Error registering student:", error);
		res.status(500).json({ success: false, message: "Server error." });
	}
});
// admin register
app.post("/api/Admin/register", async (req, res) => {
	try {
		const { Name, email, password } = req.body;

		const existingAdmin = await Teacher.findOne({ email });
		if (existingAdmin) {
			return res.json({ success: false, message: "Email already in use." });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newTeacher = new Teacher({
			Name,
			email,
			password: hashedPassword,
		});

		await newTeacher.save();

		res.json({ success: true, message: "Admin registered successfully!" });
	} catch (err) {
		console.error("Error registering admin:", err);
		res.status(500).json({ success: false, message: "Server error." });
	}
});

// Student Login
app.post("/api/Student/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await Student.findOne({ email });
		if (!user) {
			return res.json({ success: false, message: "User not found" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.json({ success: false, message: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ id: user._id },
			process.env.JWT_SECRET || "secretkey",
			{ expiresIn: "1h" },
		);

		res.json({
			success: true,
			message: "Login successful",
			email: user.email,
			Name: user.Name,
			token,
		});
	} catch (error) {
		console.error("Student login error:", error);
		res.status(500).json({ success: false, message: "Server error." });
	}
});

// Get student by email
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

// Admin Login
app.post("/api/Admin/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user1 = await Teacher.findOne({ email });
		if (!user1) {
			return res.json({ success: false, message: "User not found" });
		}

		const isMatch = await bcrypt.compare(password, user1.password);
		if (!isMatch) {
			return res.json({ success: false, message: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ id: user1._id },
			process.env.JWT_SECRET || "secretkey",
			{ expiresIn: "1h" },
		);

		res.json({
			success: true,
			message: "Login successful",
			email: user1.email,
			Name: user1.Name,
			token,
		});
	} catch (error) {
		console.error("Admin login error:", error);
		res.status(500).json({ success: false, message: "Server error." });
	}
});

// Get teacher by email
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

// Post complaint
app.post("/api/Complaints", async (req, res) => {
	try {
		const { name, classSec, Subject, complaint, email } = req.body;

		const newComplaint = new Complaint({
			email,
			name,
			classSec,
			Subject,
			complaint,
		});

		await newComplaint.save();

		res.json({ success: true, message: "Complaint registered successfully!" });
	} catch (error) {
		console.error("Error saving complaint:", error);
		res.status(500).json({ success: false, message: "Server error." });
	}
});

// Get all complaints
app.get("/api/Complaints", async (req, res) => {
	try {
		const complaints = await Complaint.find({});
		res.json(complaints);
	} catch (error) {
		console.error("Error fetching complaints:", error);
		res.status(500).json({ success: false, message: "Server error." });
	}
});

// Get complaints by user email
app.get("/api/Complaints/user/:email", async (req, res) => {
	try {
		const userComplaints = await Complaint.find({ email: req.params.email });
		res.json(userComplaints);
	} catch (error) {
		console.error("Error fetching user complaints:", error);
		res.status(500).json({ success: false, message: "Server error." });
	}
});

// Update complaint status
app.patch("/api/Complaints/:id/status", async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		if (!["Pending", "Resolved", "Rejected"].includes(status)) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid status" });
		}

		const updatedComplaint = await Complaint.findByIdAndUpdate(
			id,
			{ status },
			{ new: true },
		);

		if (!updatedComplaint) {
			return res
				.status(404)
				.json({ success: false, message: "Complaint not found" });
		}

		try {
			const userEmail = updatedComplaint.email;
			const userName = updatedComplaint.name;
			const newStatus = updatedComplaint.status;

			await transporter.sendMail({
				from: process.env.EMAIL_USER,
				to: userEmail,
				subject: `Your Complaint Status has been Updated: ${newStatus}`,
				html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Complaint Status Update</h2>
            <p>Hello ${userName},</p>
            <p>This is an automated notification to let you know that the status of your complaint has been updated.</p>
            <hr>
            <p><strong>Subject:</strong> ${updatedComplaint.Subject}</p>
            <p><strong>New Status:</strong> <strong style="font-size: 1.2em;">${newStatus}</strong></p>
            <hr>
            <p>Thank you for your feedback.</p>
          </div>
        `,
			});

			console.log("Status email sent successfully");
		} catch (emailError) {
			console.error("Error sending status email:", emailError.message);
		}

		res.json({ success: true, data: updatedComplaint });
	} catch (error) {
		console.error("Error updating status:", error);
		res.status(500).json({ success: false, message: "Server error." });
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
