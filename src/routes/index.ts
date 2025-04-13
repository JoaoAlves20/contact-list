import { Router } from "express";

import ContactController from "../controller/contactController";

export const router = Router();

router.get("/", ContactController.findAll);
router.get("/find", ContactController.findByEmail);
router.get("/find/:id", ContactController.findById);
router.post("/", ContactController.createContact);