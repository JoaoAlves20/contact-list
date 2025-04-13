import { readFile, writeFile } from "fs/promises";

interface Contact {
    name: string,
    email: string,
    phoneNumber: string
}

class ContactService {
    private _filename: string;
       
    constructor(filename: string) {
        this._filename = filename;
    }
    
    async read() {
        try {
            const data = await readFile(this._filename, "utf-8");
            const lines = data.split("\n").filter(line => line.trim() !== "");

            const contacts = lines.map(line => {
                const [ id, name, email, phoneNumber ] = line.split(",").map(item => item.trim());
                return { id, name, email, phoneNumber };
            })

            return contacts;
        } catch (err) {
            console.error("Error", err);
        }
    }

    async write({ name, email, phoneNumber }: Contact) {
        try {
            const contacts = await this.read();

            const lastId = contacts?.[contacts.length - 1]?.id ?? 1;

            if (lastId === 1) {
                const newContact = { id: lastId, name, email, phoneNumber };

                const text = `${newContact.id}, ${newContact.name}, ${newContact.email}, ${newContact.phoneNumber}`
                
                await writeFile(this._filename, text, "utf-8");
                return newContact;
            } else {
                const newContact = { id: lastId, name, email, phoneNumber };
                contacts?.push(newContact);

                const text = contacts?.map(contact => (
                    `${contact.id}, ${contact.name}, ${contact.email}, ${contact.phoneNumber}`
                )).join("\n");

                await writeFile(this._filename, text ?? "", "utf-8");
                return newContact;
            }
        } catch (err) {
            console.error("Error", err);
        }
    }
}

export default new ContactService("./contacts.txt");