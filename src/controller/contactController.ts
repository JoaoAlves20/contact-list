import { Request, Response } from "express";
import ContactService from "../service/contactService";

class ContactController {
    async findAll(_: Request, response: Response) {
        const contacts = await ContactService.read();

        if (!contacts) {
            response.status(404).json({ error: "Contacts not found" })
        }
        
        response.status(200).json(contacts);
    }

    async findByEmail(request: Request, response: Response) {
        const { email } = request.query;
        
        const contacts = await ContactService.read();

        if (!contacts) {
            response.status(404).json({ error: "Contacts not found" })
        }

        const contact = contacts?.find(item => item.email === email);

        if (!contact) {
            response.status(404).json({ error: "Contact not found" });
        }

        response.status(200).json(contact);
    }

    async findById(request: Request, response: Response) {
        const { id } = request.params;

        const contacts = await ContactService.read();

        if (!contacts) {
            response.status(404).json({ error: "Contacts not found" });
        }

        const contact = contacts?.find(item => item.id === id.toString());

        if (!contact) {
            response.status(404).json({ error: "Contact not found" });
        }

        response.status(200).json(contact);
    }

    async createContact(request: Request, response: Response) {
        const { name, email, phoneNumber } = request.body;

        if (!email) {
            response.status(400).json({ error: "Email is required" });
        }

        const newContact = await ContactService.write({ name, email, phoneNumber });

        if (!newContact) {
            response.status(400).json({ error: "Contact not created" });
        }

        response.status(201).json(newContact);
    }
}

export default new ContactController();