import { Request, Response } from "express";

import ContactService from "../services/contactService";

class ContactController {
    async create(request: Request, response: Response) {
        const { name } = request.body;
    
        if (!name || name.length < 2) {
            response.status(400).json({ error: "The name must be 2 characters long!" });
            return;
        }
    
        await ContactService.createContact(name);
    
        response.status(201).json({ contact: name });
    }

    async findAll(_: Request, response: Response) {
        let list = await ContactService.getContacts();
    
        response.status(200).json({ contacts: list });
    }

    async removeContact(request: Request, response: Response) {
        const { name } = request.query;

        if (!name) {
            response.status(400).json({ error: "Name is required" });
            return;
        }

        await ContactService.deleteContact(name as string);

        response.status(200).json({ contactDeleted: name });
    }
}

export default new ContactController();