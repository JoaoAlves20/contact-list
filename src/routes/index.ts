import { Router } from "express";

import ContactController from "../controllers/contactController";

export const router = Router();

router.post("/contact", ContactController.create);
router.get("/contacts", ContactController.findAll);
router.delete("/contact", ContactController.removeContact);