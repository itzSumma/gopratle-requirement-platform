import express, { Application, Request, Response } from "express";
import cors from "cors";
import { requirementRoutes } from "./modules/requirement/requirement.route.js";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use("/api/requirements", requirementRoutes);

// Root test route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
     message: "GoPratle Server is running" });
});

export default app;
