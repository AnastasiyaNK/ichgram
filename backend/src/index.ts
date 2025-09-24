import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; 
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Home Page");
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running at http://localhost:${PORT}`);
});

