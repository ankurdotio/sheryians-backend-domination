/**
 * Express application factory.
 */
import express, { type Express } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { registerAuthRoutes } from "../routes/auth.routes.js";
import { registerSongsRoutes } from "../routes/songs.routes.js";
import { errorMiddleware } from "../middlewares/error.middleware.js";

/**
 * Creates and configures the Express application.
 */
export function createApp(): Express {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(cookieParser());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", registerAuthRoutes());
  app.use("/api/songs", registerSongsRoutes());
  app.use(errorMiddleware);

  return app;
}
