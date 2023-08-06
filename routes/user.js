import express from "express";
import { User } from "../models/user.js";
import {  getMyProfile, login, logout, register } from "../controlers/user.js";
import { isAuthenticated } from "../middleware/isauthenticated.js";


const router = express.Router();

router.post("/new", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);


export default router;
