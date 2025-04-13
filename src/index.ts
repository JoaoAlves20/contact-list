import express from "express";
import helmet from "helmet";

import config from "./config/processEnvConfig";
import { router } from "./routes";
import { errorHandler, notFoundRequest } from "./routes/errorHandler";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(helmet());

server.use("/contacts", router);
server.use(notFoundRequest);
server.use(errorHandler);

const port = config.port ?? 3000;
server.listen(port, () => console.log(`Server runner in http://localhost:${port}`));