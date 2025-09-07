import express from "express";
import { PORT} from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connecttoDatabase from "./database/mongodb.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware.js";
import arjectmiddleware from "./middleware/arcjet.middleware.js";
import workflowrouter from "./routes/workflow.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(arjectmiddleware);

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/subscriptions",subscriptionRouter);
app.use("/api/v1/workflows",workflowrouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorMiddleware);
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connecttoDatabase();
});

export default app;