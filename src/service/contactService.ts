import { readFile } from "fs/promises";

class ContactService {
    private _filename: string;
       
    constructor(filename: string) {
        this._filename = filename;
    }
    
    async readAll() {
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
}

export default new ContactService("./contacts.txt");