import express from "express";
import helmet from "helmet";

import { router } from "./routes";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(helmet());

server.use(router);

server.listen(8080, () => console.log(`Server runner in http://localhost:8080`));