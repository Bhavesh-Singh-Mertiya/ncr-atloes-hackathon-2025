require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Feedback = require("./models/Feedback");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Feedback POST API
app.post("/api/admin/feedback", async (req, res) => {
  try {
    const { name, email, description, rating } = req.body;
    if (!name || !email || !description || !rating) {
      return res.status(400).json({ message: "All fields are required." });
    }
    console.log("Received feedback:", req.body);
    const feedback = new Feedback({ name, email, description, rating });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// Feedback GET API with pagination and search
// Feedback GET API with pagination and search
app.get("/api/admin/feedback", async (req, res) => {
  console.log("redddddddd");
  try {
    let { page = 1, limit = 10, search = "" } = req.query;

    // Convert query strings to integers
    page = parseInt(page);
    limit = parseInt(limit);

    const searchFilter = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };
    console.log("heeelo");
    const totalResults = await Feedback.countDocuments(searchFilter);
    const totalPages = Math.ceil(totalResults / limit);
    const data = await Feedback.find(searchFilter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // Optional: newest first

    res.json({
      data,
      limit,
      page,
      totalPages,
      totalResults,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// Feedback GET API for listing

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
