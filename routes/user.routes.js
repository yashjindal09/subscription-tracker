import { Router } from "express";
import { getuser, getusers } from "../controllers/user.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getusers);

userRouter.get("/:id",authorize, getuser);

userRouter.post("/", (req, res) => res.send({ title: "create new user" }));

userRouter.put("/", (req, res) => res.send({ title: "update all users" }));

userRouter.put("/:id", (req, res) => res.send({ title: "update user" }));

userRouter.delete("/", (req, res) => res.send({ title: "delete all users" }));

userRouter.delete("/:id", (req, res) => res.send({ title: "delete  user" }));

export default userRouter;