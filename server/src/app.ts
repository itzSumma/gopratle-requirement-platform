import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { requirementRoutes } from "./modules/requirement/requirement.route.js";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Serverless DB Connection Middleware
app.use(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Application routes
app.use("/api/requirements", requirementRoutes);

// Root test route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "GoPratle Server is running",
  });
});

export default app;