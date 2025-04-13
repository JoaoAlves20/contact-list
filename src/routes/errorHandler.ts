import { ErrorRequestHandler, RequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, request, response, next) => {
    console.error({ error: err.message });
    response.status(500).json({ error: "Internal server error" });
}

export const notFoundRequest: RequestHandler = (_, response) => {
    response.status(404).json({ error: "Not found request" });
}