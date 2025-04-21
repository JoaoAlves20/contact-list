import { readFile, writeFile } from "fs/promises";

const dataSource: string = "./contacts.txt";

class ContactService {
    async getContacts() {
        let list: string[] = [];
            
        try {
            const data = await readFile(dataSource, "utf-8");
            list = data.split("\n");
        } catch (err) {}

        return list;
    }

    async createContact(name: string) {
        let list = await this.getContacts();

        list.push(name);
        return await writeFile(dataSource, list.join("\n"));
    }

    async deleteContact(name: string) {
        let list = await this.getContacts();

        list = list.filter((item) => item.toLowerCase() !== name.toLowerCase());
        return await writeFile(dataSource, list.join("\n"));
    }
}

export default new ContactService();