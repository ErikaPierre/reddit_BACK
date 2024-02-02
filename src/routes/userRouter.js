import { Router } from "express";
import { connexion, inscription } from "../controllers/userController";

const userRouter = Router();

// userRouter.get("/connexion", (req, res) => res.render("Connexion"));
// userRouter.get("/inscription", (req, res) => res.render("Inscription"));

userRouter.post("/inscription", inscription);
userRouter.post("/connexion", connexion);

export default userRouter;
