import express from "express";
import morgan from "morgan";
import authRoutes from "../routes/auth.routes.js";
import paymentRoutes from "../routes/payment.routes.js";

const app = express();


app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/payments", paymentRoutes);

app.get("/health", (_req, res) => {
	res.status(200).json({ message: "Server is healthy" });
});



export default app;