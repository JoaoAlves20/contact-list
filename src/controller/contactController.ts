import { Request, Response } from "express";
import ContactService from "../service/contactService";

class ContactController {
    async findAll(_: Request, response: Response) {
        const contacts = await ContactService.readAll();
        response.status(200).json(contacts);
    }

    async findByEmail(request: Request, response: Response) {
        const { email } = request.query;
        
        const contacts = await ContactService.readAll();

        const contact = contacts?.find(item => item.email === email);

        if (!contact) {
            response.status(404).json({ error: "Contact not found" });
        }

        response.status(200).json(contact);
    }
}

export default new ContactController();