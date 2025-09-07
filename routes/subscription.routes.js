import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { createsubscription , getsingleSubscription} from "../controllers/subscription.controller.js";
const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send({ title: "get all subscriptions" }));

subscriptionRouter.get("/:id", authorize, getsingleSubscription);

subscriptionRouter.post("/",authorize, createsubscription);


subscriptionRouter.put("/:id", (req, res) => res.send({ title: "update subscription" }));


subscriptionRouter.delete("/:id", (req, res) => res.send({ title: "delete  subscription" }));

subscriptionRouter.get("/user/:id", (req, res) => res.send({ title: "get all user subscriptions" }));

subscriptionRouter.put("/:id/cancel", (req, res) => res.send({ title: "cancel all user subscriptions" }));

subscriptionRouter.get("/upcoming-renewals", (req, res) => res.send({ title: "get upcoming renewals" }));

export default subscriptionRouter;